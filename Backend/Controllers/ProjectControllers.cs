using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagementApi.Backend.Dtos.ProjectDtos;
using TaskManagementApi.Backend.Enums;
using TaskManagementApi.Backend.Interfaces;
using TaskManagementApi.Backend.Models;

namespace TaskManagementApi.Backend.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class ProjectControllers : ControllerBase
    {
        private readonly IProject _projectServices;

        public ProjectControllers(IProject projectServices)
        {
            _projectServices = projectServices;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateProject(CreateProjectDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return NotFound("Not Authorized");

            var response = await _projectServices.CreateProject(dto, int.Parse(userId));

            switch (response)
            {
                case EUserCreation.Conflict: return Conflict();
                case EUserCreation.Created: return Created();
            }
            return BadRequest();
        }

        [HttpGet]
        [Authorize]
        public async Task<List<ProjectDto>> GetProjects()
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return null!;

            return await _projectServices.GetProjects(int.Parse(userId));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ProjectDto> GetProject(int id)
        {
        
            return await _projectServices.GetProject(id);
        }

    }
}
