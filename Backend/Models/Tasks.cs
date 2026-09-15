using System.ComponentModel.DataAnnotations;
using TaskManagementApi.Backend.Enums;

namespace TaskManagementApi.Backend.Models
{
    public class Tasks
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int DueDate { get; set; }

        [Required]
        public ETasks Status { get; set; }

        [Required]
        public int ProjectId { get; set; }

    }
}
