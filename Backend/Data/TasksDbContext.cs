using Microsoft.EntityFrameworkCore;
using TaskManagementApi.Backend.Models;

namespace TaskManagementApi.Backend.Data
{
    public class TasksDbContext : DbContext
    {
        public TasksDbContext(DbContextOptions<TasksDbContext> options)
       : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
