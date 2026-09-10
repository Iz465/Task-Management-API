using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.Backend.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MinLength(4)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [MinLength(4)]
        public string Email { get; set; } = string.Empty;
    }
}
