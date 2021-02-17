using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceSequence.Database.Models
{
    [Table("Users")]
    public class User
    {
        public User()
        {
            Sequence = new List<Sequence>();
        }

        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public ICollection<Sequence> Sequence { get; set; }
    }
}
