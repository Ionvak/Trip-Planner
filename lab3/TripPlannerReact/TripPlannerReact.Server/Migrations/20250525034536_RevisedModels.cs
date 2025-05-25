using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TripPlannerReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class RevisedModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string[]>(
                name: "Trips",
                table: "Users",
                type: "text[]",
                nullable: true,
                oldClrType: typeof(int[]),
                oldType: "integer[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<string[]>(
                name: "Users",
                table: "Trips",
                type: "text[]",
                nullable: true,
                oldClrType: typeof(int[]),
                oldType: "integer[]",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int[]>(
                name: "Trips",
                table: "Users",
                type: "integer[]",
                nullable: true,
                oldClrType: typeof(string[]),
                oldType: "text[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<int[]>(
                name: "Users",
                table: "Trips",
                type: "integer[]",
                nullable: true,
                oldClrType: typeof(string[]),
                oldType: "text[]",
                oldNullable: true);
        }
    }
}
