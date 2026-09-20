using TaskManagementApi.Backend.Dtos.TaskDtos;
using TaskManagementApi.Backend.Enums;

namespace TaskManagementApi.Backend.Interfaces
{
    public interface ITasks
    {
        Task<List<TaskDto>> GetTasks(int projectId);

        Task<EUserCreation> CreateTask(CreateTaskDto dto);
    }
}
