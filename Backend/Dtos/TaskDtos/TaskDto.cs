using System.ComponentModel.DataAnnotations;
using TaskManagementApi.Backend.Enums;

namespace TaskManagementApi.Backend.Dtos.TaskDtos
{
    public class TaskDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string DueDate { get; set; } = string.Empty;

        [Required]
        public ETasks Status { get; set; }

      


    }
}
