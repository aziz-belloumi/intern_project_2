using BookingSystem.Data.Data;
using BookingSystem.Data.Models;
using BookingSystem.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace BookingSystem.Services
{
    public class EquipmentService : IEquipmentService
    {
        private readonly ApplicationDbContext _context;
        private readonly RoomWebSocketHandler _wsHandler;

        public EquipmentService(ApplicationDbContext context, RoomWebSocketHandler wsHandler)
        {
            _context = context;
            _wsHandler = wsHandler;
        }

        public async Task<List<Equipment>> GetAllEquipmentAsync()
        {
            return await _context.Equipments.ToListAsync();
        }

        public async Task<List<Equipment>> GetUserEquipmentAsync(int userId)
        {
            return await _context.Equipments
                .Where(e => e.UserId == userId)
                .ToListAsync();
        }

        public async Task<Equipment?> GetEquipmentByIdAsync(int id)
        {
            return await _context.Equipments.FindAsync(id);
        }

        public async Task<bool> CreateEquipmentAsync(Equipment equipment)
        {
            try
            {
                equipment.CreatedAt = DateTime.UtcNow;
                equipment.UpdatedAt = DateTime.UtcNow;
                _context.Equipments.Add(equipment);
                await _context.SaveChangesAsync();
                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new { action = "equipmentCreated" }));
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating equipment: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> UpdateEquipmentAsync(Equipment equipment)
        {
            try
            {
                var existingEquipment = await _context.Equipments.FindAsync(equipment.Id);
                if (existingEquipment == null)
                    return false;

                existingEquipment.Name = equipment.Name;
                existingEquipment.Type = equipment.Type;
                existingEquipment.Description = equipment.Description;
                existingEquipment.Price = equipment.Price;
                existingEquipment.SerialNumber = equipment.SerialNumber;
                existingEquipment.HasWarranty = equipment.HasWarranty;
                existingEquipment.IsPortable = equipment.IsPortable;
                existingEquipment.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new { action = "equipmentUpdated" }));
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating equipment: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> DeleteEquipmentAsync(int id)
        {
            try
            {
                var equipment = await _context.Equipments.FindAsync(id);
                if (equipment == null)
                    return false;

                _context.Equipments.Remove(equipment);
                await _context.SaveChangesAsync();
                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new { action = "equipmentDeleted" }));
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting equipment: {ex.Message}");
                throw;
            }
        }

        public async Task<List<Equipment>> SearchEquipmentAsync(
            string? searchTerm,
            string? type,
            bool? hasWarranty,
            bool? isPortable,
            int? userId)
        {
            var query = _context.Equipments.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                var term = searchTerm.ToLower();
                query = query.Where(e =>
                    e.Name.ToLower().Contains(term) ||
                    e.Description.ToLower().Contains(term) ||
                    e.Type.ToLower().Contains(term));
            }

            if (!string.IsNullOrWhiteSpace(type))
            {
                query = query.Where(e => e.Type.ToLower() == type.ToLower());
            }

            if (hasWarranty.HasValue)
            {
                query = query.Where(e => e.HasWarranty == hasWarranty.Value);
            }

            if (isPortable.HasValue)
            {
                query = query.Where(e => e.IsPortable == isPortable.Value);
            }

            if (userId.HasValue)
            {
                query = query.Where(e => e.UserId == userId.Value);
            }

            return await query.ToListAsync();
        }
    }
}