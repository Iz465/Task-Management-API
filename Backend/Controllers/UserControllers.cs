using Microsoft.AspNetCore.Mvc;
using TaskManagementApi.Backend.Dtos.UserDtos;
using TaskManagementApi.Backend.Enums;
using TaskManagementApi.Backend.Interfaces;

namespace TaskManagementApi.Backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserControllers : ControllerBase
    {

        private readonly IUser _userServices;
        public UserControllers(IUser userServices)
        {
            _userServices = userServices;
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser(CreateUserDto dto)
        {
       
            var result = await _userServices.CreateUser(dto);

            if (result == EUserCreation.Created)
                return Created();

            return NotFound("Error Creating Account");
        }

    }
}
