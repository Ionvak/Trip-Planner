using System.Collections.Generic;

namespace TripPlanner.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public string Date { get; set; }
        public int OwnerId { get; set; }
        public List<int> ParticipantIds { get; set; } = new List<int>();
    }
}