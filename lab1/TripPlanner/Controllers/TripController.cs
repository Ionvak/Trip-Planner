using Microsoft.AspNetCore.Mvc;
using TripPlanner.Data;
using TripPlanner.Models;

namespace TripPlanner.Controllers
{
    public class TripController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TripController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var trips = _context.Trips.ToList();
            return View(trips);
        }

        [HttpGet]
        public IActionResult Create() => View();

        [HttpPost]
        public IActionResult Create(Trip trip)
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null) return RedirectToAction("Login", "Account");

            trip.OwnerId = userId.Value;
            _context.Trips.Add(trip);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        public IActionResult Register(int id)
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null) return RedirectToAction("Login", "Account");

            var trip = _context.Trips.Find(id);
            if (trip != null && trip.ParticipantIds.Count < trip.Capacity)
            {
                trip.ParticipantIds.Add(userId.Value);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        public IActionResult Unregister(int id)
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null) return RedirectToAction("Login", "Account");

            var trip = _context.Trips.Find(id);
            if (trip != null && trip.ParticipantIds.Contains(userId.Value))
            {
                trip.ParticipantIds.Remove(userId.Value);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }

    [HttpGet]
    public IActionResult Edit(int id)
    {
        var trip = _context.Trips.Find(id);
        var userId = HttpContext.Session.GetInt32("UserId");
        if (trip == null || trip.OwnerId != userId) return RedirectToAction("Index");

        return View(trip);
    }

    [HttpPost]
    public IActionResult Edit(Trip updatedTrip)
    {
        var trip = _context.Trips.Find(updatedTrip.Id);
        var userId = HttpContext.Session.GetInt32("UserId");
        if (trip == null || trip.OwnerId != userId) return RedirectToAction("Index");

        trip.Title = updatedTrip.Title;
        trip.Description = updatedTrip.Description;
        trip.Capacity = updatedTrip.Capacity;
        trip.Date = updatedTrip.Date;

        _context.SaveChanges();
        return RedirectToAction("Index");
    }

    [HttpPost]
    public IActionResult Delete(int id)
    {
        var trip = _context.Trips.Find(id);
        var userId = HttpContext.Session.GetInt32("UserId");
        if (trip == null || trip.OwnerId != userId) return RedirectToAction("Index");

        _context.Trips.Remove(trip);
        _context.SaveChanges();
        return RedirectToAction("Index");
    }
}