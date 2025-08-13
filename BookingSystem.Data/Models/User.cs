namespace BookingSystem.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required int PhoneNumber { get; set; }
        public List<int>? PreferredRoomIds { get; set; }

    }
}