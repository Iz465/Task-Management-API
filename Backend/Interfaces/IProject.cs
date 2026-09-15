using TaskManagementApi.Backend.Dtos.ProjectDtos;
using TaskManagementApi.Backend.Enums;

namespace TaskManagementApi.Backend.Interfaces
{
    public interface IProject
    {
        Task<EUserCreation> CreateProject(CreateProjectDto dto, int userId);
    }
}
