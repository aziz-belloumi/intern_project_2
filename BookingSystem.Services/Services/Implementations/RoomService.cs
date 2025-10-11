using BookingSystem.Data.Data;
using BookingSystem.Data.Models;
using BookingSystem.Services.Helpers;
using BookingSystem.Services.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;


namespace BookingSystem.Services.Services.Implementations
{
    public class RoomService: IRoomService
    {

        private readonly ApplicationDbContext _context;
        private readonly RoomWebSocketHandler _wsHandler;


        public RoomService(ApplicationDbContext context, RoomWebSocketHandler wsHandler)
        {
            _context = context;
            _wsHandler = wsHandler;
        }


        public async Task<bool> CreateRoomAsync(Room newRoom)
        {
            try
            {
                await _context.Rooms.AddAsync(newRoom);
                await _context.SaveChangesAsync();
                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new { action = "roomCreated" }));

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<Room>?> GetRoomsAsync() 
        {
            try
            {
                return await _context.Rooms.ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }
        public async Task<Room?> GetRoomAsync(int roomId)
        {
            try
            {
                return await _context.Rooms.FindAsync(roomId);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<Room>?> GetUserRoomsAsync(int userId)
        {
            try
            {
                return await _context.Rooms
                    .Where(r => r.UserId == userId)
                    .ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> EditRoomAsync(int roomId , Room updatedRoom)
        {
            try
            {
                var existingRoom = await _context.Rooms.FindAsync(roomId);

                if (existingRoom == null)
                    return false;

                existingRoom.Capacity = updatedRoom.Capacity;
                existingRoom.RoomType = updatedRoom.RoomType;
                existingRoom.HasProjector = updatedRoom.HasProjector;
                existingRoom.HasWhiteboard = updatedRoom.HasWhiteboard;
                existingRoom.Description = updatedRoom.Description;
                existingRoom.PricePerMinute = updatedRoom.PricePerMinute;
                await _context.SaveChangesAsync();
                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new { action = "roomUpdated" }));
                return true;
            }
            catch (Exception)
            {
                return false ;
            }
        }
        public async Task<bool> DeleteRoomAsync(int roomId)
        {
            try
            {
                var room = await _context.Rooms.FindAsync(roomId);
                if (room == null)
                    return false;

                _context.Rooms.Remove(room);
                await _context.SaveChangesAsync();
                await _wsHandler.BroadcastAsync(JsonSerializer.Serialize(new { action = "roomDeleted" }));
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<Room>> SearchRoomsAsync(
            string? searchTerm,
            int? minCapacity,
            int? maxCapacity,
            string? roomType,
            decimal? minPrice,
            decimal? maxPrice,
            bool? hasProjector,
            bool? hasWhiteboard)
        {
            var query = _context.Rooms.AsQueryable();

            // Search term - searches in description and room type
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                var term = searchTerm.ToLower();
                query = query.Where(r =>
                    r.Description.ToLower().Contains(term) ||
                    r.RoomType.ToLower().Contains(term));
            }

            // Capacity filters
            if (minCapacity.HasValue)
            {
                query = query.Where(r => r.Capacity >= minCapacity.Value);
            }

            if (maxCapacity.HasValue)
            {
                query = query.Where(r => r.Capacity <= maxCapacity.Value);
            }

            // Room type filter
            if (!string.IsNullOrWhiteSpace(roomType))
            {
                query = query.Where(r => r.RoomType.ToLower() == roomType.ToLower());
            }

            // Price filters
            if (minPrice.HasValue)
            {
                query = query.Where(r => r.PricePerMinute >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(r => r.PricePerMinute <= maxPrice.Value);
            }

            // Equipment filters
            if (hasProjector.HasValue && hasProjector.Value)
            {
                query = query.Where(r => r.HasProjector);
            }

            if (hasWhiteboard.HasValue && hasWhiteboard.Value)
            {
                query = query.Where(r => r.HasWhiteboard);
            }

            return await query.ToListAsync();
        }

    }
}
