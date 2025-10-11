using BookingSystem.Data.Data;
using BookingSystem.Data.Models;
using BookingSystem.Services.Helpers;
using BookingSystem.Services.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;


namespace BookingSystem.Services.Services.Implementations
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;
        private readonly RoomWebSocketHandler _wsHandler;
        private readonly IServiceScopeFactory _scopeFactory;

        public BookingService(ApplicationDbContext context, RoomWebSocketHandler wsHandler, IServiceScopeFactory scopeFactory)
        {
            _context = context;
            _wsHandler = wsHandler;
            _scopeFactory = scopeFactory;
        }

        public async Task<List<Object>?> GetUserBookingsChunkAsync(int userId, int? lastBookingId, int chunkSize = 10)
        {
            try
            {
                IQueryable<Booking> query = _context.Bookings.Where(b => b.UserId == userId);
                if (lastBookingId.HasValue && lastBookingId.Value > 0)
                {
                    var lastBooking = await _context.Bookings.FindAsync(lastBookingId.Value);
                    if (lastBooking != null)
                        query = query.Where(b => (b.UpdatedAt ?? b.CreatedAt) < (lastBooking.UpdatedAt ?? lastBooking.CreatedAt));
                }

                var bookings = await query
                    .OrderByDescending(b => b.UpdatedAt ?? b.CreatedAt)
                    .Take(chunkSize)
                    .Select(b => new
                    {
                        b.Id,
                        b.UserId,
                        b.RoomId,
                        b.Purpose,
                        b.StartTime,
                        b.EndTime,
                        b.DurationMinutes,
                        b.Attendees,
                        b.IsPreferredRoom,
                        b.IsPurposeCompatible,
                        b.CapacityUtilization,
                        b.TotalPrice,
                        b.Status,
                        b.CreatedAt,
                        b.UpdatedAt
                    })
                    .ToListAsync<object>();

                return bookings.Any() ? bookings : null;
            }
            catch (Exception)
            {
                return null;
            }

        }

        public async Task<Booking?> GetBookingByIdAsync(int id)
        {
            try
            {
                return await _context.Bookings.FindAsync(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> CreateBookingAsync(Booking booking)
        {
            try
            {
                booking.Status = BookingStatus.Pending;
                booking.CreatedAt = DateTime.UtcNow;

                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();

                // Broadcast booking creation
                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new
                {
                    action = "bookingCreated",
                    bookingId = booking.Id,
                    status = booking.Status
                }));

                // ✅ Launch timer in background
                _ = Task.Run(async () =>
                {
                    await Task.Delay(TimeSpan.FromMinutes(4));

                    using (var scope = _scopeFactory.CreateScope())
                    {
                        var scopedContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                        var pendingBooking = await scopedContext.Bookings.FindAsync(booking.Id);
                        if (pendingBooking != null && pendingBooking.Status == BookingStatus.Pending)
                        {
                            pendingBooking.Status = BookingStatus.Cancelled;
                            pendingBooking.UpdatedAt = DateTime.UtcNow;
                            await scopedContext.SaveChangesAsync();

                            await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new
                            {
                                action = "bookingCancelled",
                                bookingId = pendingBooking.Id,
                                status = pendingBooking.Status
                            }));
                        }
                    }
                });

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error creating booking: {ex.Message}");
                Console.WriteLine($"Inner exception: {ex.InnerException?.Message}");
                return false;
            }
        }


        public async Task<bool> ConfirmBookingPaymentAsync(int bookingId)
        {
            try
            {
                var booking = await _context.Bookings.FindAsync(bookingId);
                if (booking == null || booking.Status != BookingStatus.Pending)
                    return false;

                booking.Status = BookingStatus.Confirmed;
                booking.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new
                {
                    action = "bookingConfirmed",
                    bookingId = booking.Id,
                    status = booking.Status
                }));

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<object>?> GetPendingBookingsAsync(int userId)
        {
            try
            {
                var twoMinutesAgo = DateTime.UtcNow.AddMinutes(-2);

                var pendingBookings = await _context.Bookings
                    .Where(b => b.UserId == userId &&
                                b.Status == BookingStatus.Pending &&
                                b.CreatedAt >= twoMinutesAgo)
                    .OrderByDescending(b => b.CreatedAt)
                    .Select(b => new
                    {
                        b.Id,
                        b.UserId,
                        b.RoomId,
                        b.Purpose,
                        b.StartTime,
                        b.EndTime,
                        b.DurationMinutes,
                        b.Attendees,
                        b.IsPreferredRoom,
                        b.IsPurposeCompatible,
                        b.CapacityUtilization,
                        b.TotalPrice,
                        b.Status,
                        b.CreatedAt,
                        b.UpdatedAt
                    })
                    .ToListAsync<object>();

                return pendingBookings.Any() ? pendingBookings : null;
            }
            catch
            {
                return null;
            }
        }






        public async Task<List<decimal>?> GetUserStatisticsAsync(int userId)
        {
            try
            {
                var bookings = await _context.Bookings
                    .Where(b => b.UserId == userId && (b.Status == BookingStatus.Completed || b.Status == BookingStatus.Cancelled))
                    .ToListAsync();

                if (!bookings.Any())
                    return null;

                var totalBookings = bookings.Count;

                // Most used room (only among completed bookings)
                var completedBookings = bookings.Where(b => b.Status == BookingStatus.Completed).ToList();
                int mostUsedRoomId = 0;
                decimal totalSpent = 0;
                decimal avgCapacityUtilization = 0;
                int completedReservations = completedBookings.Count;

                if (completedBookings.Any())
                {
                    mostUsedRoomId = completedBookings
                        .GroupBy(b => b.RoomId)
                        .OrderByDescending(g => g.Count())
                        .Select(g => g.Key)
                        .FirstOrDefault();

                    totalSpent = completedBookings.Sum(b => b.TotalPrice);
                    avgCapacityUtilization = (decimal)completedBookings.Average(b => b.CapacityUtilization);
                }

                return new List<decimal> { totalBookings, completedReservations, mostUsedRoomId, totalSpent, avgCapacityUtilization };
            }
            catch
            {
                return null;
            }



        }

        public async Task<List<object>?> GetRecentBookingsAsync(int userId)
        {
            try
            {
                var bookings = await _context.Bookings
                    .Where(b => b.UserId == userId)
                    .OrderByDescending(b => b.UpdatedAt ?? b.CreatedAt)
                    .Take(5)
                    .Select(b => new
                    {
                        b.Id,
                        b.UserId,
                        b.RoomId,
                        b.Purpose,
                        b.StartTime,
                        b.EndTime,
                        b.DurationMinutes,
                        b.Attendees,
                        b.IsPreferredRoom,
                        b.IsPurposeCompatible,
                        b.CapacityUtilization,
                        b.TotalPrice,
                        b.Status,
                        b.CreatedAt,
                        b.UpdatedAt
                    })
                .ToListAsync<object>();

                if (bookings == null || !bookings.Any())
                    return null;

                return bookings;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public async Task<string> CheckRoomAvailabilityAsync(int roomId)
        {
            try
            {
                var now = DateTime.Now;

                var overlappingBooking = await _context.Bookings
                    .Where(b => b.RoomId == roomId &&
                                b.StartTime <= now && b.EndTime >= now)
                    .OrderByDescending(b => b.CreatedAt)
                    .FirstOrDefaultAsync();

                if (overlappingBooking == null)
                {
                    return "Available";
                }

                if (overlappingBooking.Status == BookingStatus.Pending)
                {
                    return "Still Waiting for Confirmation";
                }

                if (overlappingBooking.Status == BookingStatus.Confirmed)
                {
                    return "Not Available";
                }

                return "Not Available";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }
        public async Task<object> CheckAllRoomsAvailabilityAsync(DateTime? startTime = null, DateTime? endTime = null)
        {
            // ✅ Use UTC consistently
            var now = DateTime.UtcNow;

            var actualStartTime = startTime ?? now;
            var actualEndTime = endTime ?? actualStartTime.AddHours(24);

            if (actualEndTime <= actualStartTime)
                throw new ArgumentException("End time must be later than start time.");

            var result = new List<object>();

            var rooms = await _context.Rooms.ToListAsync();

            // ✅ Only get bookings that actually overlap AND aren't cancelled/completed
            var overlappingBookings = await _context.Bookings
                .Where(b => actualStartTime < b.EndTime
                         && actualEndTime > b.StartTime
                         && (b.Status == BookingStatus.Pending || b.Status == BookingStatus.Confirmed))
                .ToListAsync();

            var bookingsByRoom = overlappingBookings
                .GroupBy(b => b.RoomId)
                .ToDictionary(g => g.Key, g => g.ToList());

            foreach (var room in rooms)
            {
                if (!bookingsByRoom.ContainsKey(room.Id))
                {
                    result.Add(new
                    {
                        RoomId = room.Id,
                        PricePerMinute = room.PricePerMinute,
                        Capacity = room.Capacity,
                        Status = "Available",
                        Message = "This room is available for you"
                    });
                    continue;
                }

                var roomBookings = bookingsByRoom[room.Id];

                // ✅ Check confirmed bookings first
                var confirmedBooking = roomBookings.FirstOrDefault(b => b.Status == BookingStatus.Confirmed);
                if (confirmedBooking != null)
                {
                    result.Add(new
                    {
                        RoomId = room.Id,
                        PricePerMinute = room.PricePerMinute,
                        Capacity = room.Capacity,
                        Status = "Not Available",
                        Message = $"Reserved from {confirmedBooking.StartTime:G} to {confirmedBooking.EndTime:G}"
                    });
                    continue;
                }

                // ✅ Check pending bookings within 4-minute window (matches auto-cancel logic)
                var pendingBooking = roomBookings
                    .Where(b => b.Status == BookingStatus.Pending
                             && (now - b.CreatedAt).TotalMinutes < 4)
                    .OrderByDescending(b => b.CreatedAt)
                    .FirstOrDefault();

                if (pendingBooking != null)
                {
                    result.Add(new
                    {
                        RoomId = room.Id,
                        PricePerMinute = room.PricePerMinute,
                        Capacity = room.Capacity,
                        Status = "Pending",
                        Message = $"Still waiting for confirmation, it will be booked from {pendingBooking.StartTime:G} to {pendingBooking.EndTime:G}"
                    });
                    continue;
                }

                // ✅ Otherwise, room is available
                result.Add(new
                {
                    RoomId = room.Id,
                    PricePerMinute = room.PricePerMinute,
                    Capacity = room.Capacity,
                    Status = "Available",
                    Message = "This room is available for you"
                });
            }

            return new { Rooms = result };
        }


    }
}
