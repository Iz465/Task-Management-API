using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagementApi.Backend.Data;
using TaskManagementApi.Backend.Dtos.UserDtos;
using TaskManagementApi.Backend.Enums;
using TaskManagementApi.Backend.Interfaces;
using TaskManagementApi.Backend.Models;

namespace TaskManagementApi.Backend.Services
{
    public class UserServices : IUser
    {

        private readonly TasksDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserServices(TasksDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<LoginResult> CreateUser(CreateUserDto dto)
        {

            var userExists = await _context.Users.AnyAsync(user => user.Username == dto.Username || user.Email == dto.Email);
            if (userExists) return new LoginResult { Status = EUserCreation.Conflict, Token = null };


            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            string jwt = await CreateToken(user);

            return new LoginResult { Status = EUserCreation.Created, Token = jwt };
        }

        public async Task<LoginResult> Login(LoginUserDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Username == dto.Username);
            if (user == null)
                return new LoginResult { Status = EUserCreation.Incorrect, Token = null };


            var passwordMatches = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (passwordMatches == PasswordVerificationResult.Failed)
                return new LoginResult { Status = EUserCreation.Incorrect, Token = null };



            string jwt = await CreateToken(user);

            return new LoginResult { Status = EUserCreation.Authenticated, Token = jwt };
        }

    

    public async Task<string> CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            string secretKey = "Thesecretkey=2332512fdsfggh0reg23423423232234235235234343434";
            byte[] secretKeyByte = Encoding.UTF8.GetBytes(secretKey);

            var securityKey = new SymmetricSecurityKey(secretKeyByte);

            var credentials = new SigningCredentials
                (
                securityKey,
                SecurityAlgorithms.HmacSha256
                );

            var token = new JwtSecurityToken
            (
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

