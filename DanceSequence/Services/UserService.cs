using DanceSequence.Database.Models;
using DanceSequence.Models.Add;
using DanceSequence.Models.Views;
using EFGetStarted;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DanceSequence.Services
{
    public class UserService
    {
        private DSContext DSAppContext;

        public UserService(DSContext DSAppContext)
        {
            this.DSAppContext = DSAppContext;
        }

        public bool CheckUser(string login, string password)
        {
            var user = DSAppContext.Users.FirstOrDefault(x => x.Login.Equals(login));
            return user != null ? user.Password.Equals(password) : false;
        }

        public User GetUserByLogin(string login)
        {
            return DSAppContext.Users.FirstOrDefault(x => x.Login.Equals(login));

        }

        public bool AddSequence(AddSequence addSequence)
        {
            Sequence sequence = new Sequence();
            sequence.Name = addSequence.Name;
            sequence.UserId = addSequence.UserId;
            sequence.Ids = string.Join(",", addSequence.Ids);
            DSAppContext.Sequences.Add(sequence);
            DSAppContext.SaveChanges();
            return true;
        }

        public ICollection<SequenceView> GetSequenceByUser(int userId)
        {
            var sequences = DSAppContext.Sequences.Where(x => x.UserId == userId).ToList();

            List<SequenceView> sequenceViews = new List<SequenceView>();

            foreach (var sequence in sequences)
            {
                SequenceView sequenceView = new SequenceView();
                sequenceView.Id = sequence.Id;
                sequenceView.Name = sequence.Name;
                var ids = sequence.Ids.Split(",");
                sequenceView.MovesNumber = ids.Length;
                sequenceView.Moves = new List<MoveView>();

                foreach (var item in ids)
                {
                    int id = Int32.Parse(item);
                    var move = DSAppContext.Moves.FirstOrDefault(x => x.Id == id);
                    sequenceView.Moves.Add(new MoveView() { Id = move.Id, Name = move.Name, Description = move.Description });
                }
                sequenceViews.Add(sequenceView);
            }

            return sequenceViews;
        }

        public bool DeleteSequence(int id)
        {
            var sequene = DSAppContext.Sequences.FirstOrDefault(x => x.Id == id);
            DSAppContext.Sequences.Remove(sequene);
            DSAppContext.SaveChanges();
            return true;
        }
    }
}
