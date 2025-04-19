using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TripPlanner.Data;
using TripPlanner.Migrations;
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

            var trip = await _context.Trips.Include(t => t.Users).AsNoTracking()
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
                else
                {
                    foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
                    {
                        Console.WriteLine(error.ErrorMessage); // Log the error messages
                    }
                    return View(trip);
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
        public async Task<IActionResult> Edit(int id, [Bind("ID,Description,Title,Capacity,Date,Owners,xmin")] Trip trip)
        {
            if (id != trip.ID)
            {
                return NotFound();
            }

            //Retrieve item to update
            var TripToUpdate = await _context.Trips.Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.ID == id);

            if (TripToUpdate == null)
            {
                ModelState.AddModelError(string.Empty,
                     "Unable to save changes. The trip was deleted by another user.");
                return View(trip);
            }

            //Set the original value of the RowVersion property
            _context.Entry(TripToUpdate).Property("xmin").OriginalValue = trip.xmin;

            if (await TryUpdateModelAsync<Trip>(TripToUpdate, "", s=> s.Title, s=> s.Description, s=> s.Capacity,s=> s.Date))
            {
                try
                {
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    //Get client values
                    var exceptionEntry = ex.Entries.Single();
                    var clientValues = (Trip)exceptionEntry.Entity;

                    //Get database values
                    var databaseEntry = exceptionEntry.GetDatabaseValues();
                    if (databaseEntry == null)
                    {
                        ModelState.AddModelError(string.Empty,
                            "Unable to save changes. The trip was deleted by another user.");
                    }
                    else
                    {
                        var databaseValues = (Trip)databaseEntry.ToObject();

                        if (databaseValues.Title != clientValues.Title)
                        {
                            ModelState.AddModelError("Title", $"Current value: {databaseValues.Title}");
                        }
                        if (databaseValues.Date != clientValues.Date)
                        {
                            ModelState.AddModelError("Date", $"Current value: {databaseValues.Date}");
                        }
                        if (databaseValues.Description != clientValues.Description)
                        {
                            ModelState.AddModelError("Description", $"Current value: {databaseValues.Description}");
                        }
                        if (databaseValues.Capacity != clientValues.Capacity)
                        {
                            ModelState.AddModelError("Capacity", $"Current value: {databaseValues.Capacity}");
                        }

                        ModelState.AddModelError(string.Empty, "The record you attempted to edit "
                                + "was modified by another user after you got the original value. The "
                                + "edit operation was canceled and the current values in the database "
                                + "have been displayed. If you still want to edit this record, click "
                                + "the Save button again. Otherwise click the Back to List hyperlink.");
                        TripToUpdate.xmin = (uint)databaseValues.xmin;
                        ModelState.Remove("xmin");
                    }
                }
            }
            return View(TripToUpdate);
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

            if (trip.Capacity <= trip.Users.Count)
            {
                TempData["Error"] = "The trip is already full.";
                return RedirectToAction(nameof(Index));
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
