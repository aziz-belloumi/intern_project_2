using BookingSystem.Data.Models;
using BookingSystem.Services.Services.Implementations;
using BookingSystem.Services.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookingSystem.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet("get-all-bookings-of-user-by-chunks")]
        public async Task<IActionResult> GetAllBookings([FromQuery] int userId , [FromQuery] int lastBookingId)
        {
            try
            {
                var bookings = await _bookingService.GetUserBookingsChunkAsync(userId, lastBookingId);
                if (bookings != null && bookings.Any())
                {
                    return Ok(bookings);
                }
                return BadRequest(new { message = "There is a problem in all bookings fetching" });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("get-booking/{id}")]
        public async Task<IActionResult> GetBookingById(int id)
        {
            try
            {
                var booking = await _bookingService.GetBookingByIdAsync(id);
                if (booking == null)
                {
                    return BadRequest(new { message = "There is a problem in one booking fetching" });
                }
                return Ok(booking);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("create-booking")]
        public async Task<IActionResult> Create([FromBody] Booking booking)
        {
            if (!ModelState.IsValid)
            {
                // This will return detailed validation errors
                return BadRequest(ModelState);
            }

            var created = await _bookingService.CreateBookingAsync(booking);

            if (!created)
                return BadRequest(new { message = "Booking could not be created." });

            return Ok(booking); // return the created booking object
        }


        /*[HttpPut("update-booking/{id}")]
        public async Task<IActionResult> Update(int id, Booking booking)
        {
            var updated = await _bookingService.UpdateBookingAsync(id, booking);
            if (!updated) return NotFound();
            return NoContent();
        }*/

        [HttpGet("get-user-statistics")]
        public async Task<IActionResult> GetUserStatistics([FromQuery] int userId)
        {
            try
            {
                var statistics = await _bookingService.GetUserStatisticsAsync(userId);
                if (statistics == null || !statistics.Any())
                {
                    return BadRequest(new { message = "There is a problem in user statistics fetching" });
                }
                return Ok(statistics);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("get-recent-bookings")]
        public async Task<IActionResult> GetRecentBookings([FromQuery] int userId)
        {
            var bookings = await _bookingService.GetRecentBookingsAsync(userId);
            if (bookings == null) return NotFound();
            return Ok(bookings);
        }

        [HttpGet("get-room-availability")]
        public async Task<IActionResult> CheckRoomAvailability([FromQuery] int roomId)
        {
            try
            {
                

                var status = await _bookingService.CheckRoomAvailabilityAsync(roomId);
                return Ok(new { Status = status });
            }
            catch(Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }



        [HttpGet("get-all-rooms-availability")]
        public async Task<IActionResult> CheckAllRoomsAvailability([FromQuery] DateTime? startTime ,[FromQuery] DateTime? endTime)
        {
            var availability = await _bookingService.CheckAllRoomsAvailabilityAsync(startTime,endTime);
            return Ok(availability);
        }

    }

}
