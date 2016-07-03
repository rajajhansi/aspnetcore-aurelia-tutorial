using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace demo.Controllers
{
    [Route("api/[controller]")]
    public class GreetingsController : Controller
    {
        // GET api/values
        [HttpGet]
        public string Get()
        {
            return "Hello World from ASP.NET Core 1.0 Web API!";
        }
    }
}
