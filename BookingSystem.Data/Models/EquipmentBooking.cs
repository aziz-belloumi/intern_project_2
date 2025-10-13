using BookingSystem.Data.Models;
using System.Text.Json.Serialization;

public class EquipmentBooking
{
    public enum EquipmentStatus
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed
    }
    public int Id { get; set; }
    public int EquipmentId { get; set; }
    [JsonIgnore]
    public Equipment? Equipment { get; set; }
    public int UserId { get; set; }
    [JsonIgnore]
    public User? User { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int DurationMinutes { get; set; }
    public EquipmentStatus Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

}
