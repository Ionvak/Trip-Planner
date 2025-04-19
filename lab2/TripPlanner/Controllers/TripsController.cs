using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TripPlanner.Data;
using TripPlanner.Models;

namespace TripPlanner.Controllers
{
    public class TripsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TripsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Trips
        public async Task<IActionResult> Index()
        {
            var UserId = HttpContext.Session.GetInt32("UserId");
            if (UserId == null)
            {
                return RedirectToAction("Login", "Users");
            }
            ViewData["LoggedInUser"] = await _context.Users
                .FirstOrDefaultAsync(m => m.ID == UserId);
            if (ViewData["LoggedInUser"] == null)
            {
                ViewBag.Error = "Issues detecting logged in user. Please log in again.";
                return RedirectToAction("Login", "Users");
            }
            var trips = await _context.Trips
                 .Include(t => t.Users)
                 .ToListAsync();

            return View(trips);
        }

        // GET: Trips/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var trip = await _context.Trips.Include(t => t.Users)
                .FirstOrDefaultAsync(m => m.ID == id);
            if (trip == null)
            {
                return NotFound();
            }

            return View(trip);
        }

        // GET: Trips/Create
        public IActionResult Create()
        {
            var UserId = HttpContext.Session.GetInt32("UserId");
            if (UserId == null)
            {
                return RedirectToAction("Login", "Users");
            }
            return View();
        }

        // POST: Trips/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Description,Title,Capacity,Date")] Trip trip)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var UserId = HttpContext.Session.GetInt32("UserId");

                    if (UserId == null)
                    {
                        return RedirectToAction("Login", "Users");
                    }
                    var user = await _context.Users.FindAsync(UserId);

                    if (user == null)
                    {
                        return NotFound();
                    }

                    trip.Owners = new List<string> { user.Username };
                    trip.Users = new List<User> { user };
                    _context.Add(trip);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists " +
                    "see your system administrator.");
            }
            return View(trip);
        }

        // GET: Trips/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var trip = await _context.Trips.FindAsync(id);
            if (trip == null)
            {
                return NotFound();
            }
            return View(trip);
        }

        // POST: Trips/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Description,Title,Capacity,Date,Owners")] Trip trip)
        {
            if (id != trip.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(trip);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TripExists(trip.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(trip);
        }

        // GET: Trips/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var trip = await _context.Trips
                .FirstOrDefaultAsync(m => m.ID == id);
            if (trip == null)
            {
                return NotFound();
            }

            return View(trip);
        }

        // POST: Trips/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var trip = await _context.Trips.FindAsync(id);
            if (trip != null)
            {
                _context.Trips.Remove(trip);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TripExists(int id)
        {
            return _context.Trips.Any(e => e.ID == id);
        }

        public async Task<IActionResult> Register(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var trip = await _context.Trips.Include(t => t.Users)
                .FirstOrDefaultAsync(m => m.ID == id);

            if (trip == null)
            {
                return NotFound();
            }

            var UserId = HttpContext.Session.GetInt32("UserId");
            if (UserId == null)
            {
                return RedirectToAction("Login", "Users");
            }

            var user = await _context.Users.FindAsync(UserId);
            trip.Users.Add(user);
            _context.Update(trip);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> AddOwner(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var trip = await _context.Trips.FindAsync(id);
            if (trip == null)
            {
                return NotFound();
            }

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddOwner(int id, string newOwner)
        {
            if (string.IsNullOrWhiteSpace(newOwner))
            {
                ViewBag.Error = "Owner name required.";
                return View();
            }

            var trip = await _context.Trips.FindAsync(id);
            if (trip == null)
            {
                return NotFound();
            }

            var AddedUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == newOwner);
            if (AddedUser == null)
            {
                ViewBag.Error = "User not found.";
                return View();
            }

            trip.Owners.Add(newOwner);
            _context.Update(trip);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }
    }
}
