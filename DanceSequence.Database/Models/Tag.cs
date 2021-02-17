using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DanceSequence.Database.Models
{
    [Table("Tags")]
    public class Tag
    {
        public Tag()
        {
            Moves = new List<Move>();
        }

        public int Id { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public ICollection<Move> Moves { get; set; }
    }
}
