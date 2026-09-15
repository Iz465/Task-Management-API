using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.Backend.Dtos.ProjectDtos
{
    public class CreateProjectDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
