using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.Backend.Dtos.TaskDtos
{
    public class CreateTaskDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string DueDate { get; set; } = string.Empty;

        [Required]
        public int ProjectId { get; set; }
    }
}
