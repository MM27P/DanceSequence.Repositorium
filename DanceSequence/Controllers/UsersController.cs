using Microsoft.AspNetCore.Mvc;
using DanceSequence.Database.Models;
using DanceSequence.Services;
using DanceSequence.Models.Views;
using DanceSequence.Models.Add;
using System.Collections.Generic;

namespace DanceSequence.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService _userService)
        {
            this._userService = _userService;
        }

        // GET: api/Users
        [HttpPost()]
        public bool CheckUser([FromBody] UserView userView)
        {
            return _userService.CheckUser(userView.Login, userView.Password);
        }

        [HttpGet("{login}")]
        public User CheckUser(string login)
        {
            var user = _userService.GetUserByLogin(login);
            return user;
        }

        [HttpPost()]
        public bool AddSequence(AddSequence addSequence)
        {
            return _userService.AddSequence(addSequence);
        }

        [HttpDelete("{id}")]
        public bool DeleteSeqeunce(int id)
        {
            return _userService.DeleteSequence(id);
        }

        [HttpGet("{userId}")]
        public ICollection<SequenceView> GetSequence(int userId)
        {
            return _userService.GetSequenceByUser(userId);
        }
    }
}
