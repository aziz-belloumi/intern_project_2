using BookingSystem.Data.Models;

namespace BookingSystem.Services.Services.Interfaces
{
    public enum SignUpResult
    {
        Success,
        EmailAlreadyUsed,
        PhoneNumberAlreadyUsed,
        BothEmailAndPhoneUsed,
        Failure,
    }

    public interface IUserService
    {
        Task<SignUpResult> SignUpAsync(User user);
        Task<string> SignInAsync(string email, string password);
        Task LogOutAsync();
    }
}