using BookingSystem.Data.Data;
using BookingSystem.Data.Models;
using BookingSystem.Services.Helpers;
using BookingSystem.Services.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;


namespace BookingSystem.Services.Services.Implementations
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;
        private readonly RoomWebSocketHandler _wsHandler;

        public BookingService(ApplicationDbContext context, RoomWebSocketHandler wsHandler)
        {
            _context = context;
            _wsHandler = wsHandler;
        }

        public async Task<List<Object>?> GetUserBookingsChunkAsync(int userId, int? lastBookingId, int chunkSize = 10)
        {
            try
            {
                IQueryable<Booking> query = _context.Bookings
                    .Where(b => b.UserId == userId);

                // Determine the timestamp to continue from
                if (lastBookingId.HasValue && lastBookingId.Value > 0)
                {
                    var lastBooking = await _context.Bookings
                        .Where(b => b.Id == lastBookingId.Value)
                        .FirstOrDefaultAsync();

                    if (lastBooking != null)
                    {
                        var lastDate = lastBooking.UpdatedAt ?? lastBooking.CreatedAt;
                        query = query.Where(b => (b.UpdatedAt ?? b.CreatedAt) < lastDate);
                    }
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

                if (bookings == null || !bookings.Any())
                    return null;

                return bookings;
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
                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();
                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new { action = "bookingCreated" }));
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateBookingAsync(int id, Booking booking)
        {
            var existingBooking = await _context.Bookings.FindAsync(id);
            if (existingBooking == null) return false;

            // Update fields as needed, example:
            existingBooking.Status = booking.Status;
            existingBooking.Purpose = booking.Purpose;
            existingBooking.StartTime = booking.StartTime;
            existingBooking.EndTime = booking.EndTime;
            existingBooking.UpdatedAt = DateTime.UtcNow;
            // add others fields you want to update...

            await _context.SaveChangesAsync();
            return true;
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

                return new List<decimal>{totalBookings, completedReservations, mostUsedRoomId,totalSpent,avgCapacityUtilization};
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
            var now = DateTime.Now;

            var actualStartTime = startTime ?? now;
            var actualEndTime = endTime ?? actualStartTime.AddHours(24);

            if (actualEndTime <= actualStartTime)
                throw new ArgumentException("End time must be later than start time.");

            var result = new List<object>();

            var rooms = await _context.Rooms.ToListAsync();

            var overlappingBookings = await _context.Bookings
                .Where(b => actualStartTime < b.EndTime && actualEndTime > b.StartTime)
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
                        Capacity = room.Capacity,
                        Status = "Available",
                        Message = "This room is available for you"
                    });
                    continue;
                }

                var roomBookings = bookingsByRoom[room.Id];

                var confirmedBooking = roomBookings.FirstOrDefault(b => b.Status == BookingStatus.Confirmed);
                if (confirmedBooking != null)
                {
                    result.Add(new
                    {
                        RoomId = room.Id,
                        Capacity = room.Capacity,
                        Status = "Not Available",
                        Message = $"Reserved from {confirmedBooking.StartTime:G} to {confirmedBooking.EndTime:G}",
                        StartTime = confirmedBooking.StartTime,
                        EndTime = confirmedBooking.EndTime
                    });
                }
                else if (roomBookings.Any(b => b.Status == BookingStatus.Pending))
                {
                    var pendingBooking = roomBookings.First(b => b.Status == BookingStatus.Pending);
                    result.Add(new
                    {
                        RoomId = room.Id,
                        Capacity = room.Capacity,
                        Status = "Pending",
                        Message = "Still waiting for confirmation",
                        StartTime = pendingBooking.StartTime,
                        EndTime = pendingBooking.EndTime
                    });
                }
                else
                {
                    result.Add(new
                    {
                        RoomId = room.Id,
                        Capacity = room.Capacity,
                        Status = "Available",
                        Message = "This room is available for you"
                    });
                }
            }

            return new { Rooms = result };
        }




    }

}
