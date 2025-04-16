using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TripPlanner.Models
{
    public class User
    {
        public int ID { get; set; }
        public ICollection<Trip> Trips { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        
    }
}
