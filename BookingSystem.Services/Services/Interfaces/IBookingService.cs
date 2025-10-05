using BookingSystem.Data.Models;

namespace BookingSystem.Services.Services.Interfaces
{
    public interface IBookingService
    {
        Task<List<object>?> GetUserBookingsChunkAsync(int userId , int? lastBookingId , int chunksize = 10); // profile
        Task<Booking?> GetBookingByIdAsync(int id);
        Task<bool> CreateBookingAsync(Booking booking); // dashboard : reserve icon
        Task<bool> ConfirmBookingPaymentAsync(int bookingId); //confirm payment : just simulation
        Task<List<object>?> GetPendingBookingsAsync(int userId); // fetch pendings 
        Task<List<decimal>?> GetUserStatisticsAsync(int userId); // profile
        Task<List<object>?> GetRecentBookingsAsync(int userId); // profile
        Task<string> CheckRoomAvailabilityAsync(int roomId); // dashboard : the cards in recource 
        Task<object> CheckAllRoomsAvailabilityAsync(DateTime? startTime = null ,DateTime ? endTime = null); // dashboard : the room table
    }

}
