using System.ComponentModel.DataAnnotations.Schema;

namespace DanceSequence.Database.Models.Many2Many
{
    [Table("FollowingMoves")]
    public class FollowingMove
    {
        public int PreMoveId { get; set; }
        public Move PreMove { get; set; }

        public int PostMoveId { get; set; }
        public Move PostMove { get; set; }
    }
}
