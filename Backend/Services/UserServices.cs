using TaskManagementApi.Backend.Data;
using TaskManagementApi.Backend.Dtos.UserDtos;
using TaskManagementApi.Backend.Enums;
using TaskManagementApi.Backend.Interfaces;
using TaskManagementApi.Backend.Models;

namespace TaskManagementApi.Backend.Services
{
    public class UserServices : IUser
    {

        private readonly TasksDbContext _context;

        public UserServices(TasksDbContext context)
        {
            _context = context;
        }

        public async Task<EUserCreation> CreateUser(CreateUserDto dto)
        {
          
            var user = new User
            {
                Username = dto.Username,
                PasswordHash = dto.Password,
                Email = dto.Email
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            Console.WriteLine($"{user.Username}!");
            return EUserCreation.Created;
        }

        public async Task<EUserCreation> Login()
        {
            return EUserCreation.Authenticated;
        }

    }
}

