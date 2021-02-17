using System.Collections.Generic;

namespace DanceSequence.Models.Views
{
    public class MoveDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<MoveView> PreMoves { get; set; }
        public List<MoveView> ProMoves { get; set; }
        public List<AlternationView> Alternations { get; set; }
        public List<TagView> Tags { get; set; }
    }
}
