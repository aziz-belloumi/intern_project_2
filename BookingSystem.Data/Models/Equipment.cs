using System.Text.Json.Serialization;

namespace BookingSystem.Data.Models
{
    public enum EquipmentStatus
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed
    }
    public class Equipment
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public required string Description { get; set; }
        public required EquipmentStatus status{ get; set; } // available | maintenance | unavailable
        public decimal? Price { get; set; }
        public string? SerialNumber { get; set; }
        public bool HasWarranty { get; set; }
        public bool IsPortable { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Foreign key for owner
        public int? UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
    }
}
