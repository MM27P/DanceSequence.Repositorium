using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceSequence.Database.Models;
using EFGetStarted;

namespace DanceSequence.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DancesController : ControllerBase
    {
        private readonly DSContext _context;

        public DancesController(DSContext context)
        {
            _context = context;
        }

        // GET: api/Dances
        [HttpGet]
        public IEnumerable<Dance> GetDances()
        {
            return _context.Dances.ToList();
        }

        // GET: api/Dances/5
        [HttpGet("{id}")]
        public Dance GetDance(int id)
        {
            var dance = _context.Dances.Include(x => x.Moves).FirstOrDefault(x => x.Id == id);

            return dance;
        }


    }
}
