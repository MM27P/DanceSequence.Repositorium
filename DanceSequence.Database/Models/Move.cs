using DanceSequence.Database.Models.Many2Many;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DanceSequence.Database.Models
{
    [Table("Moves")]
    public class Move
    {
        public Move()
        {
            Alternates =  new List<Alternation>();
            PreMoves =  new List<FollowingMove>();
            ProMoves =  new List<FollowingMove>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Dance Dance { get; set; }
        public int DanceId { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public ICollection<Alternation> Alternates { get; set; }
        public ICollection<FollowingMove> PreMoves { get; set; }
        public ICollection<FollowingMove> ProMoves { get; set; }
    }
}
