using System.Collections.Generic;

namespace DanceSequence.Models.Views
{
    public class SequenceView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MovesNumber { get; set; }
        public List<MoveView> Moves { get; set; }
        public string DanceName { get; set; }
    }
}
