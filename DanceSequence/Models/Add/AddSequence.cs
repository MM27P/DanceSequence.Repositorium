using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DanceSequence.Models.Add
{
    public class AddSequence
    {
        public string Name { get; set; }
        public List<int> Ids { get; set; }
        public int UserId { get; set; }
    }
}
