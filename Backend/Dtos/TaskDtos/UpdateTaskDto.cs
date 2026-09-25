using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.Backend.Dtos.TaskDtos
{
    public class UpdateTaskDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Status { get; set; } = string.Empty;
    }
}
