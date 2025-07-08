using BookingSystemAPI.Data;
using BookingSystemAPI.Models;
using Microsoft.EntityFrameworkCore;
using UserRoleManagementApi.Helpers;


public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly JwtTokenGenerator _jwtTokenGenerator;

    public UserService(ApplicationDbContext context, IConfiguration configuration, JwtTokenGenerator jwtTokenGenerator)
    {
        _configuration = configuration;
        _jwtTokenGenerator = jwtTokenGenerator;
        _context = context;
    }

    public async Task<SignUpResult> SignUpAsync(User user)
    {
        try
        {
            bool emailExists = await _context.Users.AnyAsync(u => u.Email == user.Email);
            bool phoneExists = await _context.Users.AnyAsync(u => u.PhoneNumber == user.PhoneNumber);

            if (emailExists && phoneExists)
                return SignUpResult.BothEmailAndPhoneUsed;
            if (emailExists)
                return SignUpResult.EmailAlreadyUsed;
            if (phoneExists)
                return SignUpResult.PhoneNumberAlreadyUsed;

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return SignUpResult.Success;
        }
        catch (Exception)
        {
            return SignUpResult.Failure;
        }
    }

    public async Task<string> SignInAsync(string email, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            return string.Empty;
        }

        return _jwtTokenGenerator.GenerateToken(user);

    }
    public Task LogOutAsync()
    {
        // maybe i need to implement some logic to invalidate the token 
        return Task.CompletedTask;
    }
}