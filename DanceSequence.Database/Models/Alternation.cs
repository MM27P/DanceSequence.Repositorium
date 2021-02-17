using DanceSequence.Database.Models.Many2Many;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DanceSequence.Database.Models
{
    [Table("Alternation")]
    public class Alternation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Move Move { get; set; }
        public int MoveId { get; set; }
    }
}
