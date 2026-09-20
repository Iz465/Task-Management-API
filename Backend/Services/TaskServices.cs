using Microsoft.EntityFrameworkCore;
using TaskManagementApi.Backend.Data;
using TaskManagementApi.Backend.Dtos.TaskDtos;
using TaskManagementApi.Backend.Enums;
using TaskManagementApi.Backend.Interfaces;
using TaskManagementApi.Backend.Models;

namespace TaskManagementApi.Backend.Services
{
    public class TaskServices: ITasks
    {

        private readonly TasksDbContext _context;

        public TaskServices(TasksDbContext context) =>
            _context = context;

        public async Task<List<TaskDto>> GetTasks(int projectId)
        {
            var query = _context.Tasks.AsQueryable();

            query = query.Where(task => task.ProjectId == projectId);

            return await query.Select(task => new TaskDto
            {
                Name = task.Name,
                DueDate = task.DueDate,
                Status = task.Status
            }).ToListAsync();
        }

        public async Task<EUserCreation> CreateTask(CreateTaskDto dto)
        {
            var taskExists = await _context.Tasks.AnyAsync(task => task.Name == dto.Name && task.ProjectId == dto.ProjectId);
            if (taskExists)
                return EUserCreation.Conflict;

            Tasks task = new Tasks
            {
                Name = dto.Name,
                DueDate = dto.DueDate,
                ProjectId = dto.ProjectId,
                Status = ETasks.NotStarted
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();


            return EUserCreation.Created;
        }

    }
}
