using BookingSystem.Data.Models;

namespace BookingSystem.Services.Services.Interfaces
{
    public interface IBookingService
    {
        Task<List<object>?> GetUserBookingsChunkAsync(int userId , int? lastBookingId , int chunksize = 10);
        Task<Booking?> GetBookingByIdAsync(int id);
        Task<bool> CreateBookingAsync(Booking booking);
        //Task<bool> UpdateBookingAsync(int id, Booking booking);
        //Task<bool> DeleteBookingAsync(int id);
        Task<List<decimal>?> GetUserStatisticsAsync(int userId);
        Task<List<object>?> GetRecentBookingsAsync(int userId);
        Task<string> CheckRoomAvailabilityAsync(int roomId, DateTime startTime, DateTime endTime);
        Task<Dictionary<int,string>> CheckAllRoomsAvailabilityAsync(DateTime startTime, DateTime endTime);
    }

}
