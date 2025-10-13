using BookingSystem.Data.Models;
using BookingSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentService _equipmentService;

        public EquipmentController(IEquipmentService equipmentService)
        {
            _equipmentService = equipmentService;
        }

        [HttpGet("get-all-equipment")]
        public async Task<IActionResult> GetAllEquipment()
        {
            try
            {
                var equipment = await _equipmentService.GetAllEquipmentAsync();
                return Ok(equipment);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("get-user-equipment/{userId}")]
        public async Task<IActionResult> GetUserEquipment(int userId)
        {
            try
            {
                var equipment = await _equipmentService.GetUserEquipmentAsync(userId);
                return Ok(equipment);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("get-equipment/{id}")]
        public async Task<IActionResult> GetEquipmentById(int id)
        {
            try
            {
                var equipment = await _equipmentService.GetEquipmentByIdAsync(id);
                if (equipment == null)
                    return NotFound(new { message = "Equipment not found" });
                return Ok(equipment);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("create-equipment")]
        public async Task<IActionResult> CreateEquipment([FromBody] Equipment equipment)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var created = await _equipmentService.CreateEquipmentAsync(equipment);
                if (!created)
                    return BadRequest(new { message = "Equipment could not be created." });

                return Ok(equipment);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPut("update-equipment/{id}")]
        public async Task<IActionResult> UpdateEquipment(int id, [FromBody] Equipment equipment)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (id != equipment.Id)
                    return BadRequest(new { message = "ID mismatch" });

                var updated = await _equipmentService.UpdateEquipmentAsync(equipment);
                if (!updated)
                    return BadRequest(new { message = "Equipment could not be updated." });

                return Ok(equipment);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpDelete("delete-equipment/{id}")]
        public async Task<IActionResult> DeleteEquipment(int id)
        {
            try
            {
                var deleted = await _equipmentService.DeleteEquipmentAsync(id);
                if (!deleted)
                    return NotFound(new { message = "Equipment not found or could not be deleted." });

                return Ok(new { message = "Equipment deleted successfully" });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("search-equipment")]
        public async Task<IActionResult> SearchEquipment(
            [FromQuery] string? searchTerm,
            [FromQuery] string? type,
            [FromQuery] bool? hasWarranty,
            [FromQuery] bool? isPortable,
            [FromQuery] int? userId)
        {
            try
            {
                var equipment = await _equipmentService.SearchEquipmentAsync(
                    searchTerm, type, hasWarranty, isPortable, userId);
                return Ok(equipment);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}