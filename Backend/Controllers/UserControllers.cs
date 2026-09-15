using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
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

            switch (result.Status)
            {
                case EUserCreation.Created: return Ok(result.Token);
                case EUserCreation.Conflict: return Conflict("Username or Email is taken");
            }


            return NotFound("Error Creating Account");
        }


        [HttpPost("login")]
     
        public async Task<ActionResult> Login(LoginUserDto dto)
        {
            var result = await _userServices.Login(dto);

            switch (result.Status)
            {
                case EUserCreation.Authenticated: return Ok(result.Token);
                case EUserCreation.Incorrect: return NotFound("Incorrect Login Details");
            }

            return NotFound("Error Logging In");
        }
        

    }
}
