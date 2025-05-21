using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TripPlannerReact.Server.Models;

namespace TripPlannerReact.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Trip> Trips { get; set; }
    }

}