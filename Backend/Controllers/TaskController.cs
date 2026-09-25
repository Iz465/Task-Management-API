using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApi.Backend.Dtos.TaskDtos;
using TaskManagementApi.Backend.Enums;
using TaskManagementApi.Backend.Interfaces;

namespace TaskManagementApi.Backend.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TaskController : ControllerBase
    {

        private readonly ITasks _taskServices;

        public TaskController(ITasks taskServices) =>
            _taskServices = taskServices;


        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateTask(CreateTaskDto dto)
        {
            var result = await _taskServices.CreateTask(dto);

            switch (result)
            {
                case EUserCreation.Conflict: return Conflict();
                case EUserCreation.Created: return Created();
                case EUserCreation.Incorrect: return BadRequest();
            }

            return BadRequest();
        }

        [HttpGet("{projectId}")]
        [Authorize]
        public async Task<List<TaskDto>> GetTasks(int projectId)
        {
            
            return await _taskServices.GetTasks(projectId);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult> UpdateTask(UpdateTaskDto dto)
        {
            var response = await _taskServices.UpdateTask(dto);

            if(response == EUserCreation.Incorrect)
                return NotFound();

            return Ok();
        }
    }
}
