using BookingSystem.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingSystem.Data.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<EquipmentBooking> EquipmentBookings { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Apply rules to User table
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);

                entity.Property(u => u.FirstName)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(u => u.LastName)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(u => u.Email)
                      .IsRequired()
                      .HasMaxLength(200);

                entity.HasIndex(u => u.Email)
                      .IsUnique();

                entity.Property(u => u.Password)
                      .IsRequired();

                entity.Property(u => u.PhoneNumber)
                      .IsRequired();
                
                entity.HasIndex(u => u.PhoneNumber)
                      .IsUnique();
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.Property(r => r.Description)
                      .IsRequired();

                entity.Property(r => r.RoomType)
                      .IsRequired();

                entity.Property(r => r.PricePerMinute)
                      .HasColumnType("decimal(18,2)");

                // Relationship: Room -> User
                entity.HasOne(r => r.User)
                      .WithMany()
                      .HasForeignKey(r => r.UserId)
                      .OnDelete(DeleteBehavior.Restrict); // <- avoid multiple cascade paths
                entity.Property(r => r.UserId)
                      .IsRequired(false);
            });


            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasKey(b => b.Id);

                entity.Property(b => b.TotalPrice)
                      .HasColumnType("decimal(18,2)");

                // Relationship: Booking -> Room
                entity.HasOne(b => b.Room)
                      .WithMany(r => r.Bookings)
                      .HasForeignKey(b => b.RoomId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Relationship: Booking -> User
                entity.HasOne(b => b.User)
                      .WithMany()
                      .HasForeignKey(b => b.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                      .IsRequired()
                      .HasMaxLength(200);

                entity.Property(e => e.Type)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(e => e.Description)
                      .IsRequired()
                      .HasMaxLength(1000);

                entity.Property(e => e.Price)
                      .HasPrecision(18, 2);

                entity.Property(e => e.SerialNumber)
                      .HasMaxLength(100);

                // Relationship: Equipment -> User (Owner)
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<EquipmentBooking>(entity =>
            {
                entity.HasKey(eb => eb.Id);

                // Configure the enum as string in database
                entity.Property(eb => eb.Status)
                      .HasConversion<string>()
                      .HasMaxLength(20);

                // Relationship: EquipmentBooking -> Equipment
                entity.HasOne(eb => eb.Equipment)
                      .WithMany(e => e.EquipmentBookings) // ← CHANGE ONLY THIS LINE
                      .HasForeignKey(eb => eb.EquipmentId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Relationship: EquipmentBooking -> User
                entity.HasOne(eb => eb.User)
                      .WithMany() // ← LEAVE THIS AS IS
                      .HasForeignKey(eb => eb.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.Property(eb => eb.DurationMinutes)
                      .IsRequired();
            });
        }
    }
}
