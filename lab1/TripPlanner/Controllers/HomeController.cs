using Microsoft.AspNetCore.Mvc;

namespace TripPlanner.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}