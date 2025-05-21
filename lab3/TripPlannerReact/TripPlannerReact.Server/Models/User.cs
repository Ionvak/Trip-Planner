using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using TripPlannerReact.Server.Models;

namespace TripPlannerReact.Server.Models
{
    public class User
    {
        public int ID { get; set; }
        public ICollection<Trip>? Trips { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }

    }
}
