using Microsoft.EntityFrameworkCore;
using TaskManagementApi.Backend.Data;
using TaskManagementApi.Backend.Dtos.ProjectDtos;
using TaskManagementApi.Backend.Enums;
using TaskManagementApi.Backend.Interfaces;
using TaskManagementApi.Backend.Models;

namespace TaskManagementApi.Backend.Services
{
    public class ProjectServices: IProject
    {
        private readonly TasksDbContext _context;

        public ProjectServices(TasksDbContext context)
        {
            _context = context;
        }

        public async Task<EUserCreation> CreateProject(CreateProjectDto dto, int userId)
        {
            var exists = await _context.Projects.AnyAsync(project => project.Name == dto.Name);
            if (exists)
                return EUserCreation.Conflict;

            var project = new Projects
            {
                Name = dto.Name,
                UserId = userId
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return EUserCreation.Created;
        }

        public async Task<List<ProjectDto>> GetProjects(int userId)
        {
            IQueryable<Projects> query = _context.Projects.AsQueryable();

            query = query.Where(project => project.UserId == userId);

            return await query.Select(project => new ProjectDto
            {
                Id = project.Id,
                Name = project.Name
            }).ToListAsync();
        }

        public async Task<ProjectDto> GetProject(int projectId)
        {
            var projectExists = await _context.Projects.FindAsync(projectId);
            if (projectExists == null)
                return null;
            

            return new ProjectDto
            {
                Id = projectExists.Id,
                Name = projectExists.Name
            };
        }
    }
}
