using BookingSystem.Data.Models;
using BookingSystem.Services.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookingSystem.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet("get-all-bookings-of-user")]
        public async Task<IActionResult> GetAllBookings([FromQuery] int userId)
        {
            try
            {
                var bookings = await _bookingService.GetAllBookingsAsync(userId);
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

        /*[HttpPost("create-booking")]
        public async Task<IActionResult> Create(Booking booking)
        {
            var created = await _bookingService.CreateBookingAsync(booking);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("update-booking/{id}")]
        public async Task<IActionResult> Update(int id, Booking booking)
        {
            var updated = await _bookingService.UpdateBookingAsync(id, booking);
            if (!updated) return NotFound();
            return NoContent();
        }*/
    }

}
