
using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class DateTimeforTasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Tasks");

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Tasks",
                type: "timestamp with time zone",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Tasks");

            migrationBuilder.AddColumn<string>(
                name: "DueDate",
                table: "Tasks",
                type: "text",
                nullable: false);
        }
    }
}
