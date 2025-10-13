using BookingSystem.Data.Data;
using BookingSystem.Data.Models;
using BookingSystem.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

namespace BookingSystem.Services
{
    public class EquipmentBookingService : IEquipmentBookingService
    {
        private readonly ApplicationDbContext _context;
        private readonly RoomWebSocketHandler _wsHandler;
        private readonly IServiceScopeFactory _scopeFactory;

        public EquipmentBookingService(ApplicationDbContext context, RoomWebSocketHandler wsHandler, IServiceScopeFactory scopeFactory)
        {
            _context = context;
            _wsHandler = wsHandler;
            _scopeFactory = scopeFactory;

        }

        public async Task<List<EquipmentBooking>> GetAllBookingsAsync()
        {
            return await _context.EquipmentBookings
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<EquipmentBooking>> GetUserBookingsAsync(int userId)
        {
            return await _context.EquipmentBookings
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<EquipmentBooking>> GetEquipmentBookingsAsync(int equipmentId)
        {
            return await _context.EquipmentBookings
                .Where(b => b.EquipmentId == equipmentId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<EquipmentBooking>> GetPendingBookingsAsync(int userId)
        {
            return await _context.EquipmentBookings
                .Where(b => b.UserId == userId && b.Status == EquipmentBooking.EquipmentStatus.Pending)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<EquipmentBooking?> GetBookingByIdAsync(int id)
        {
            return await _context.EquipmentBookings.FindAsync(id);
        }

        public async Task<bool> CreateBookingAsync(EquipmentBooking booking)
        {
            try
            {
                booking.Status = EquipmentBooking.EquipmentStatus.Pending;
                booking.CreatedAt = DateTime.UtcNow;
                booking.UpdatedAt = DateTime.UtcNow;

                // Calculate duration if not provided
                if (booking.DurationMinutes == 0)
                {
                    var duration = booking.EndTime - booking.StartTime;
                    booking.DurationMinutes = (int)duration.TotalMinutes;
                }

                // Validate that equipment exists
                var equipment = await _context.Equipments.FindAsync(booking.EquipmentId);
                if (equipment == null) return false;

                // Validate that user exists
                var user = await _context.Users.FindAsync(booking.UserId);
                if (user == null) return false;

                // Check overlapping bookings
                var hasOverlap = await _context.EquipmentBookings
                    .AnyAsync(b =>
                        b.EquipmentId == booking.EquipmentId &&
                        b.Status != EquipmentBooking.EquipmentStatus.Cancelled &&
                        b.Status != EquipmentBooking.EquipmentStatus.Completed &&
                        ((booking.StartTime >= b.StartTime && booking.StartTime < b.EndTime) ||
                         (booking.EndTime > b.StartTime && booking.EndTime <= b.EndTime) ||
                         (booking.StartTime <= b.StartTime && booking.EndTime >= b.EndTime)));

                if (hasOverlap) return false;

                _context.EquipmentBookings.Add(booking);
                await _context.SaveChangesAsync();
                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new
                {
                    action = "equipmentBookingCreated",
                    bookingId = booking.Id,
                    status = booking.Status
                }));

                // ✅ Auto-cancel pending booking after 2 minutes
                _ = Task.Run(async () =>
                {
                    await Task.Delay(TimeSpan.FromMinutes(2));

                    using var scope = _scopeFactory.CreateScope();
                    var scopedContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                    var pendingBooking = await scopedContext.EquipmentBookings.FindAsync(booking.Id);
                    if (pendingBooking != null && pendingBooking.Status == EquipmentBooking.EquipmentStatus.Pending)
                    {
                        pendingBooking.Status = EquipmentBooking.EquipmentStatus.Cancelled;
                        pendingBooking.UpdatedAt = DateTime.UtcNow;
                        await scopedContext.SaveChangesAsync();

                        await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new
                        {
                            action = "equipmentBookingCancelled",
                            bookingId = booking.Id,
                            status = booking.Status
                        }));
                    }
                });

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating equipment booking: {ex.Message}");
                return false;
            }
        }


        public async Task<EquipmentBooking?> UpdateBookingStatusAsync(int bookingId, EquipmentBooking.EquipmentStatus status)
        {
            try
            {
                var booking = await _context.EquipmentBookings.FindAsync(bookingId);
                if (booking == null)
                    return null;

                booking.Status = status;
                booking.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                return booking;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating booking status: {ex.Message}");
                throw;
            }
        }

        public async Task<EquipmentBooking?> ConfirmBookingAsync(int bookingId)
        {
            var booking = await _context.EquipmentBookings.FindAsync(bookingId);
            if (booking == null || booking.Status != EquipmentBooking.EquipmentStatus.Pending)
                return null;

            booking.Status = EquipmentBooking.EquipmentStatus.Confirmed;
            booking.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new
            {
                action = "equipmentBookingConfirmed",
                bookingId = booking.Id,
                status = booking.Status
            }));

            return booking;
        }


        public async Task<EquipmentBooking?> CancelBookingAsync(int bookingId)
        {
            return await UpdateBookingStatusAsync(bookingId, EquipmentBooking.EquipmentStatus.Cancelled);
        }

        public async Task<bool> DeleteBookingAsync(int id)
        {
            try
            {
                var booking = await _context.EquipmentBookings.FindAsync(id);
                if (booking == null)
                    return false;

                _context.EquipmentBookings.Remove(booking);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting booking: {ex.Message}");
                throw;
            }
        }

        public async Task<List<EquipmentBooking>> SearchBookingsAsync(
            int? userId,
            int? equipmentId,
            EquipmentBooking.EquipmentStatus? status,
            DateTime? startDate,
            DateTime? endDate)
        {
            var query = _context.EquipmentBookings.AsQueryable();

            if (userId.HasValue)
            {
                query = query.Where(b => b.UserId == userId.Value);
            }

            if (equipmentId.HasValue)
            {
                query = query.Where(b => b.EquipmentId == equipmentId.Value);
            }

            if (status.HasValue)
            {
                query = query.Where(b => b.Status == status.Value);
            }

            if (startDate.HasValue)
            {
                query = query.Where(b => b.StartTime >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(b => b.EndTime <= endDate.Value);
            }

            return await query.OrderByDescending(b => b.CreatedAt).ToListAsync();
        }
    }
}