using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.Backend.Models
{
    public class Projects
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int UserId { get; set; }
    }
}
