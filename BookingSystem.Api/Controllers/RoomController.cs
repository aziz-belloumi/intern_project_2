using BookingSystem.Data.Models;
using BookingSystem.Services.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookingSystem.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : Controller
    {
        private readonly IRoomService _roomService;
        
        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }


        [HttpPost("create-room")]
        public async Task<IActionResult> CreateRoom(Room newRoom)
        {
            try
            {
                var result = await _roomService.CreateRoomAsync(newRoom);

                if (result)
                {
                    return Ok(result);
                }
                return BadRequest(new { message = "There is a problem in Room Creation" });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }


        [HttpGet("get-all-rooms")]
        public async Task<IActionResult> GetRooms()
        {
            try
            {
                var result = await _roomService.GetRoomsAsync();
                if (result == null) 
                {
                    return BadRequest(new { message = "There is a problem in All Rooms Fetching" });
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("get-room")]
        public async Task<IActionResult> GetRoom(int roomId)
        {
            try
            {
                var result = await _roomService.GetRoomAsync(roomId);
                if (result == null)
                {
                    return BadRequest(new { message = "There is a problem in Room Fetching" });
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("get-user-rooms")]
        public async Task<IActionResult> GetUserRooms(int userId)
        {
            try
            {
                var result = await _roomService.GetUserRoomsAsync(userId);
                if (result == null)
                {
                    return BadRequest(new { message = "There is a problem in fetching user rooms" });
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }


        [HttpPut("edit-room")]
        public async Task<IActionResult> EditRoom(int roomId , Room updatedRoom)
        {
            try
            {
                var result = await _roomService.EditRoomAsync(roomId,updatedRoom);
                if (result)
                {
                    return Ok(result);
                }
                return BadRequest(new { message = "There is a problem in Room Updating" });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpDelete("delete-room")]
        public async Task<IActionResult> DeleteRoom(int roomId)
        {
            try
            {
                var result = await _roomService.DeleteRoomAsync(roomId);
                if (result)
                {
                    return Ok(result);
                }
                return BadRequest(new { message = "There is a problem in Room Fetching" });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("search-rooms")]
        public async Task<IActionResult> SearchRooms([FromQuery] string? searchTerm,[FromQuery] int? minCapacity,[FromQuery] int? maxCapacity,[FromQuery] string? roomType,[FromQuery] decimal? minPrice,[FromQuery] decimal? maxPrice,[FromQuery] bool? hasProjector,[FromQuery] bool? hasWhiteboard)
        {
            try
            {
                var rooms = await _roomService.SearchRoomsAsync(
                    searchTerm, minCapacity, maxCapacity, roomType,
                    minPrice, maxPrice, hasProjector, hasWhiteboard);
                return Ok(rooms);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

    }
}
