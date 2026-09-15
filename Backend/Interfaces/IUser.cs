
using TaskManagementApi.Backend.Dtos;
using TaskManagementApi.Backend.Dtos.UserDtos;
using TaskManagementApi.Backend.Enums;
using TaskManagementApi.Backend.Models;

namespace TaskManagementApi.Backend.Interfaces

{
    public interface IUser
    {
        Task<LoginResult> CreateUser(CreateUserDto dto);
        Task<LoginResult> Login(LoginUserDto dto);
        Task<string> CreateToken(User user);


    }
}
