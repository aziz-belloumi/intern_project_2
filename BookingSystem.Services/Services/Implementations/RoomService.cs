using BookingSystem.Data.Data;
using BookingSystem.Data.Models;
using BookingSystem.Services.Services.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace BookingSystem.Services.Services.Implementations
{
    public class RoomService: IRoomService
    {

        private readonly ApplicationDbContext _context;


        public RoomService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<bool> CreateRoomAsync(Room newRoom)
        {
            try
            {
                await _context.Rooms.AddAsync(newRoom);
                await _context.SaveChangesAsync();
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
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }
}
