using BookingSystem.Data.Models;

namespace BookingSystem.Services.Services.Interfaces
{
    public interface IRoomService
    {
        Task<bool> CreateRoomAsync(Room newRoom);
        Task<List<Room>?> GetRoomsAsync();
        Task<Room?> GetRoomAsync(int roomId);
        Task<bool> EditRoomAsync(int roomId , Room updatedRoom);
        Task<bool> DeleteRoomAsync(int roomId);
        
    }
}
