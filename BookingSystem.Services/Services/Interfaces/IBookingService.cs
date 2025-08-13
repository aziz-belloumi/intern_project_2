using BookingSystem.Data.Models;

namespace BookingSystem.Services.Services.Interfaces
{
    public interface IBookingService
    {
        Task<List<Booking>?> GetAllBookingsAsync(int userId);
        Task<Booking?> GetBookingByIdAsync(int id);
        Task<bool> CreateBookingAsync(Booking booking);
        //Task<bool> UpdateBookingAsync(int id, Booking booking);
        //Task<bool> DeleteBookingAsync(int id);
    }

}
