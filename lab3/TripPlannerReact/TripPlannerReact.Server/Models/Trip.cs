using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using TripPlannerReact.Server.Models;

namespace TripPlannerReact.Server.Models
{
    public class Trip
    {
        public int ID { get; set; }
        public int OwnerID { get; set; }
        public string? Description { get; set; }
        public required string Title { get; set; }
        public required int Capacity { get; set; }
        public required DateTime Date { get; set; }
        public ICollection<User>? Users { get; set; }
    }
}

