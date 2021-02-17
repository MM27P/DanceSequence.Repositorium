using System.Collections.Generic;

namespace DanceSequence.Models
{
    public class FollowingMoveModel
    {
        public int MoveId { get; set; }
        public List<int> PreMovesId { get; set; }
        public List<int> PostMovesId { get; set; }

    }

    public class ConnectMoves
    {
        public int MoveId { get; set; }
        public List<int> MovesId { get; set; }

    }
}
