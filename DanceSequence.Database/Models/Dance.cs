using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DanceSequence.Database.Models
{
    [Table("Dances")]
    public class Dance
    {
        public enum DanceType
        {
            Latino,
            NotLatino
        }

        public Dance()
        {
            Moves = new List<Move>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DanceType Type { get; set; }
        public ICollection<Move> Moves { get; set; }

    }
}
