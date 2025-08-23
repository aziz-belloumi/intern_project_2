namespace BookingSystem.Data.Models
{
    public class Room
    {
        public int Id { get; set; }
        public required int Capacity { get; set; }
        public required string RoomType { get; set; }
        public required bool HasProjector { get; set; }
        public required bool HasWhiteboard { get; set; }
        public required string Description { get; set; }
        public required decimal PricePerMinute { get; set; }


        public ICollection<Booking> Bookings { get; set; } = new List<Booking>(); // bookings associated with the room
    }
}
