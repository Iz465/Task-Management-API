using TaskManagementApi.Backend.Enums;

namespace TaskManagementApi.Backend.Models;


    public class LoginResult
    {
        public EUserCreation Status { get; set; }
        public string? Token { get; set; }
    }

