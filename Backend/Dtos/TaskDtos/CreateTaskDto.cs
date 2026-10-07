using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.Backend.Dtos.TaskDtos
{
    public class CreateTaskDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateOnly DueDate { get; set; } 

        [Required]
        public int ProjectId { get; set; }
    }
}
