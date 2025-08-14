using BookingSystem.Data.Models;

namespace BookingSystem.Services.Services.Interfaces
{
    public interface IBookingService
    {
        Task<List<object>?> GetUserBookingsChunkAsync(int userId , int? lastBookingId , int chunksize = 1);
        Task<Booking?> GetBookingByIdAsync(int id);
        Task<bool> CreateBookingAsync(Booking booking);
        //Task<bool> UpdateBookingAsync(int id, Booking booking);
        //Task<bool> DeleteBookingAsync(int id);
        Task<List<decimal>?> GetUserStatisticsAsync(int userId);
        Task<List<object>?> GetRecentBookingsAsync(int userId);
    }

}
