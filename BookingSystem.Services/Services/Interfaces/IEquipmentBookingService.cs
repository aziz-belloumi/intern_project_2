using BookingSystem.Data.Models;

namespace BookingSystem.Services
{
    public interface IEquipmentBookingService
    {
        Task<List<EquipmentBooking>> GetAllBookingsAsync();
        Task<List<EquipmentBooking>> GetUserBookingsAsync(int userId);
        Task<List<EquipmentBooking>> GetEquipmentBookingsAsync(int equipmentId);
        Task<List<EquipmentBooking>> GetPendingBookingsAsync(int userId);
        Task<EquipmentBooking?> GetBookingByIdAsync(int id);
        Task<bool> CreateBookingAsync(EquipmentBooking booking);
        Task<EquipmentBooking?> UpdateBookingStatusAsync(int bookingId, EquipmentBooking.EquipmentStatus status);
        Task<EquipmentBooking?> ConfirmBookingAsync(int bookingId);
        Task<EquipmentBooking?> CancelBookingAsync(int bookingId);
        Task<bool> DeleteBookingAsync(int id);
        Task<List<EquipmentBooking>> SearchBookingsAsync(
            int? userId,
            int? equipmentId,
            EquipmentBooking.EquipmentStatus? status,
            DateTime? startDate,
            DateTime? endDate);
    }
}