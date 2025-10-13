using BookingSystem.Data.Models;
using BookingSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentBookingController : ControllerBase
    {
        private readonly IEquipmentBookingService _equipmentBookingService;

        public EquipmentBookingController(IEquipmentBookingService equipmentBookingService)
        {
            _equipmentBookingService = equipmentBookingService;
        }

        [HttpGet("get-all-bookings")]
        public async Task<IActionResult> GetAllBookings()
        {
            try
            {
                var bookings = await _equipmentBookingService.GetAllBookingsAsync();
                return Ok(bookings);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("get-user-bookings/{userId}")]
        public async Task<IActionResult> GetUserBookings(int userId)
        {
            try
            {
                var bookings = await _equipmentBookingService.GetUserBookingsAsync(userId);
                return Ok(bookings);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("get-equipment-bookings/{equipmentId}")]
        public async Task<IActionResult> GetEquipmentBookings(int equipmentId)
        {
            try
            {
                var bookings = await _equipmentBookingService.GetEquipmentBookingsAsync(equipmentId);
                return Ok(bookings);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("get-pending-bookings/{userId}")]
        public async Task<IActionResult> GetPendingBookings(int userId)
        {
            try
            {
                var bookings = await _equipmentBookingService.GetPendingBookingsAsync(userId);
                return Ok(bookings);
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
                var booking = await _equipmentBookingService.GetBookingByIdAsync(id);
                if (booking == null)
                    return NotFound(new { message = "Booking not found" });
                return Ok(booking);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("create-booking")]
        public async Task<IActionResult> CreateBooking([FromBody] EquipmentBooking booking)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var created = await _equipmentBookingService.CreateBookingAsync(booking);
                if (!created)
                    return BadRequest(new { message = "Booking could not be created." });

                return Ok(booking);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPut("update-status/{bookingId}")]
        public async Task<IActionResult> UpdateBookingStatus(int bookingId, [FromBody] UpdateStatusRequest request)
        {
            try
            {
                var booking = await _equipmentBookingService.UpdateBookingStatusAsync(bookingId, request.Status);
                if (booking == null)
                    return NotFound(new { message = "Booking not found" });

                return Ok(booking);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("confirm-booking/{bookingId}")]
        public async Task<IActionResult> ConfirmBooking(int bookingId)
        {
            try
            {
                var booking = await _equipmentBookingService.ConfirmBookingAsync(bookingId);
                if (booking == null)
                    return NotFound(new { message = "Booking not found" });

                return Ok(booking);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("cancel-booking/{bookingId}")]
        public async Task<IActionResult> CancelBooking(int bookingId)
        {
            try
            {
                var booking = await _equipmentBookingService.CancelBookingAsync(bookingId);
                if (booking == null)
                    return NotFound(new { message = "Booking not found" });

                return Ok(booking);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpDelete("delete-booking/{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            try
            {
                var deleted = await _equipmentBookingService.DeleteBookingAsync(id);
                if (!deleted)
                    return NotFound(new { message = "Booking not found or could not be deleted." });

                return Ok(new { message = "Booking deleted successfully" });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("search-bookings")]
        public async Task<IActionResult> SearchBookings(
            [FromQuery] int? userId,
            [FromQuery] int? equipmentId,
            [FromQuery] EquipmentBooking.EquipmentStatus? status,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            try
            {
                var bookings = await _equipmentBookingService.SearchBookingsAsync(
                    userId, equipmentId, status, startDate, endDate);
                return Ok(bookings);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }

    // Helper class for status update request
    public class UpdateStatusRequest
    {
        public EquipmentBooking.EquipmentStatus Status { get; set; }
    }
}