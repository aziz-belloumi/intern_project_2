using BookingSystem.Data.Models;

namespace BookingSystem.Services
{
    public interface IEquipmentService
    {
        Task<List<Equipment>> GetAllEquipmentAsync();
        Task<List<Equipment>> GetUserEquipmentAsync(int userId);
        Task<Equipment?> GetEquipmentByIdAsync(int id);
        Task<bool> CreateEquipmentAsync(Equipment equipment);
        Task<bool> UpdateEquipmentAsync(Equipment equipment);
        Task<bool> DeleteEquipmentAsync(int id);
        Task<List<Equipment>> SearchEquipmentAsync(
            string? searchTerm,
            string? type,
            bool? hasWarranty,
            bool? isPortable,
            int? userId);
    }
}