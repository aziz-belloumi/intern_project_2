namespace BookingSystem.Data.Models
{
    public class Booking
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public required  User User { get; set; }

        public int RoomId { get; set; }
        public required Room Room { get; set; }

        public required string Purpose { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int DurationMinutes { get; set; }
        public int Attendees { get; set; }
        public bool IsPreferredRoom { get; set; }
        public bool IsPurposeCompatible { get; set; }

        public int DayOfWeek { get; set; } 
        public int HourOfDay { get; set; }
        public int Month { get; set; }
        public bool IsWeekend { get; set; }

        public double CapacityUtilization { get; set; }
        public bool IsPeakHour { get; set; }
        public int Season { get; set; }
        public decimal TotalPrice { get; set; }


        public BookingStatus Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }

}
