using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookingSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class BookingsUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Bookings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Bookings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
