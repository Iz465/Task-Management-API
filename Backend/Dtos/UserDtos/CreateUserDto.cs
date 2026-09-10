using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.Backend.Dtos.UserDtos
{
    public class CreateUserDto
    {
        [Required]
        [MinLength(4)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MinLength(4)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [MinLength(4)]
        public string Email { get; set; } = string.Empty;




    }

}
