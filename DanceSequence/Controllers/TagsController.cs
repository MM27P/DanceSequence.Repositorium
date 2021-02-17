using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DanceSequence.Database.Models;
using DanceSequence.Services;
using DanceSequence.Models.Views;
using DanceSequence.Models.Add;

namespace DanceSequence.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly MoveService _moveService;

        public TagsController(MoveService service)
        {
            _moveService = service;
        }

        // GET: api/Tags
        [HttpGet]
        public IEnumerable<Tag> GetTags()
        {
            return _moveService.GetTags();
        }

        // GET: api/Tags/5
        [HttpGet("{id}")]
        public Tag GetTag(int id)
        {
            return _moveService.GetTagById(id);
        }

        // PUT: api/Tags/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public bool UpdateTag(UpdateTag tag)
        {
            return _moveService.UpdateTag(tag);
        }

        // POST: api/Tags
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public Tag AddTag(AddTag tag)
        {
            return _moveService.AddTag(tag);
        }

        // DELETE: api/Tags/5
        [HttpDelete("{id}")]
        public bool DeleteTag(int id)
        {
            return _moveService.RemoveTag(id);
        }
    }
}
