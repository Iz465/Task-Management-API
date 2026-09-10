
using TaskManagementApi.Backend.Enums;
using TaskManagementApi.Backend.Dtos;
using TaskManagementApi.Backend.Dtos.UserDtos;

namespace TaskManagementApi.Backend.Interfaces

{
    public interface IUser
    {
        Task<EUserCreation> CreateUser(CreateUserDto dto);
        Task<EUserCreation> Login();
        

        
    }
}
