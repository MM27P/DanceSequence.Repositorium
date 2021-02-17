using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DanceSequence.Database.Models;
using DanceSequence.Services;
using DanceSequence.Models.Views;
using DanceSequence.Models;
using DanceSequence.Models.Add;

namespace DanceSequence.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MovesController : ControllerBase
    {
        private readonly MoveService _moveService;

        public MovesController(MoveService moveService)
        {
            _moveService = moveService;
        }

        // GET: api/Moves
        [HttpGet("{danceId}")]
        public ICollection<MoveView> GetMoves(int danceId)
        {
            return _moveService.AllMoveByDance(danceId);
        }

        // GET: api/Moves/5
        [HttpGet("{id}")]
        public MoveDetails GetMove(int id)
        {
            var move = _moveService.GetFullDetailsMoveViewById(id);

            return move;
        }

        // PUT: api/Moves/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost()]
        public bool UpdateMove(UpdateMove updateMove)
        {
            _moveService.UpdateMove(updateMove);
            return true;
        }

        //POST: api/Moves
        //To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost()]
        public Move AddMove(AddMove move)
        {
            return _moveService.AddMove(move);
        }

        [HttpPost()]
        public bool ConnectMoves(FollowingMoveModel move)
        {
            return _moveService.ConnectMoves(move);
        }

        [HttpPost()]
        public bool ConnectPostMoves(ConnectMoves move)
        {
            return _moveService.ConnectPostMoves(move);
        }

        [HttpPost()]
        public bool ConnectPreMoves(ConnectMoves move)
        {
            return _moveService.ConnectPreMoves(move);
        }

        [HttpPost()]
        public bool AddTags(ConnectTag tags)
        {
            return _moveService.ConnectTags(tags);
        }

        // DELETE: api/Moves/5
        [HttpDelete("{id}")]
        public bool DeleteMove(int id)
        {
            return _moveService.DeleteMove(id);
        }

        [HttpPost()]
        public bool AddAlternation(AddAlternationList addAlternationList)
        {
            return _moveService.AddAlternation(addAlternationList);
        }

        [HttpGet()]
        public CountModel CountEntities()
        {
            return _moveService.Count();
        }

        [HttpGet("{id}")]
        public ICollection<MoveView> GetPostMoves(int id)
        {
            return _moveService.GetPostMoves(id);
        }
    }
}
