using System.ComponentModel.DataAnnotations;
using System;

namespace TripPlanner.Models
{
    public class Trip
    {
        public int ID { get; set; }
        public string? Description { get; set; }
        public required string Title { get; set; }
        public required int Capacity { get; set; }
        public required string Date { get; set; }
        public List<string>? Owners { get; set; }
        public ICollection<User>? Users { get; set; }
    }
}
