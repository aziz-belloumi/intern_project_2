using System.Text.Json;
using BookingSystem.Data.Models;
using BookingSystem.Services.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace BookingSystem.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }


        // POST: api/Users/signup
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] User user)
        {
            try
            {
                var result = await _userService.SignUpAsync(user);
                switch (result)
                {
                    case SignUpResult.Success:
                        return Ok(new { message = "User registered successfully." });
                    case SignUpResult.EmailAlreadyUsed:
                        return BadRequest(new { message = "Email is already in use." });
                    case SignUpResult.PhoneNumberAlreadyUsed:
                        return BadRequest(new { message = "Phone number is already in use." });
                    case SignUpResult.BothEmailAndPhoneUsed:
                        return BadRequest(new { message = "Both email and phone number are already in use." });
                    default:
                        return StatusCode(500, new { message = "An unexpected error occurred." });
                }
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Server error." });
            }

        }

        // POST: api/Users/signin
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] JsonElement requestBody)
        {
            var email = requestBody.GetProperty("email").GetString();
            var password = requestBody.GetProperty("password").GetString();

            var token = await _userService.SignInAsync(email, password);
            if (string.IsNullOrEmpty(token))
                return Unauthorized(new { message = "Invalid email or password." });

            return Ok(new { token });
        }

        // POST: api/Users/logout
        [HttpPost("logout")]
        public async Task<IActionResult> LogOut()
        {
            await _userService.LogOutAsync();
            return Ok(new { message = "Logged out." });
        }
    }
}
