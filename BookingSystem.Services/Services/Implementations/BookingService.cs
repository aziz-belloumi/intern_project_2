using BookingSystem.Data.Data;
using BookingSystem.Data.Models;
using BookingSystem.Services.Services.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace BookingSystem.Services.Services.Implementations
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Booking>?> GetAllBookingsAsync(int userId)
        {
            try
            {
                return await _context.Bookings
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.UpdatedAt ?? b.CreatedAt)
                .ToListAsync();
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
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /*public async Task<bool> UpdateBookingAsync(int id, Booking booking)
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
        }*/
    }

}
