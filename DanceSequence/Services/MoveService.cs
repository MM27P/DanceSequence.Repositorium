using DanceSequence.Database.Models;
using DanceSequence.Database.Models.Many2Many;
using DanceSequence.Models;
using DanceSequence.Models.Add;
using DanceSequence.Models.Views;
using EFGetStarted;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DanceSequence.Services
{
    public class MoveService
    {
        private DSContext DSAppContext;

        public MoveService(DSContext DSAppContext)
        {
            this.DSAppContext = DSAppContext;
        }

        public Move GetFullDetailsMoveById(int id)
        {
            Move move = DSAppContext.Moves.Include(x => x.Tags).Include(x => x.Alternates).Where(x => x.Id == id).FirstOrDefault();

            move.PreMoves = DSAppContext.FollowingMoves.Where(x => x.PostMoveId == id).ToList();
            move.ProMoves = DSAppContext.FollowingMoves.Where(x => x.PreMoveId == id).ToList();
            return move;
        }

        public MoveDetails GetFullDetailsMoveViewById(int id)
        {
            Move move = GetFullDetailsMoveById(id);
            MoveDetails moveDetails = new MoveDetails();
            moveDetails.Id = move.Id;
            moveDetails.Name = move.Name;
            moveDetails.Description = move.Description;
            moveDetails.Tags = new List<TagView>();

            foreach (var tag in move.Tags)
            {
                TagView tagView = new TagView();
                tagView.Id = tag.Id;
                tagView.Value = tag.Value;
                tagView.Description = tag.Description;
                moveDetails.Tags.Add(tagView);
            }

            moveDetails.Alternations = new List<AlternationView>();
            foreach (var alternate in move.Alternates)
            {
                AlternationView alternateView = new AlternationView();
                alternateView.Id = alternate.Id;
                alternateView.Value = alternate.Name;
                alternateView.Description = alternate.Description;
                moveDetails.Alternations.Add(alternateView);
            }

            moveDetails.PreMoves = new List<MoveView>();
            foreach (var preMove in move.PreMoves)
            {
                Move preMoveData = GetMoveById(preMove.PreMoveId);
                MoveView preMoveView = new MoveView();
                preMoveView.Id = preMoveData.Id;
                preMoveView.Name = preMoveData.Name;
                preMoveView.Description = preMoveData.Description;
                moveDetails.PreMoves.Add(preMoveView);
            }

            moveDetails.ProMoves = new List<MoveView>();
            foreach (var proMove in move.ProMoves)
            {
                Move proMoveData = GetMoveById(proMove.PostMoveId);
                MoveView proMoveView = new MoveView();
                proMoveView.Id = proMoveData.Id;
                proMoveView.Name = proMoveData.Name;
                proMoveView.Description = proMoveData.Description;
                moveDetails.ProMoves.Add(proMoveView);
            }
            return moveDetails;
        }

        public Move GetMoveById(int id)
        {
            var Move = DSAppContext.Moves
                .FirstOrDefault(x => x.Id == id);
            Move.Alternates = DSAppContext.Alternations.Where(x => x.MoveId == id).ToList();

            return Move;
        }

        public ICollection<MoveView> AllMoveByDance(int danceId)
        {
            var moves = DSAppContext.Moves.Where(x => x.DanceId == danceId);

            List<MoveView> returns = new List<MoveView>();
            foreach (var move in moves)
            {
                var view = new MoveView();
                view.Id = move.Id;
                view.Name = move.Name;
                view.Description = move.Description;
                returns.Add(view);
            }

            return returns;
        }

        public Move AddMove(AddMove modelView)
        {
            Move move = new Move();
            move.DanceId = modelView.DanceId;
            move.Name = modelView.Name;
            move.Description = modelView.Description;

            DSAppContext.Moves.Add(move);
            DSAppContext.SaveChanges();
            return move;
        }

        public bool ConnectTags(ConnectTag connectTag)
        {
            Move move = GetMoveById(connectTag.MoveId);
            move.Tags = new List<Tag>();
            if (connectTag.TagsId != null)
                foreach (var tagId in connectTag.TagsId)
                {
                    var tag = GetTagById(tagId);
                    move.Tags.Add(tag);
                }
            DSAppContext.SaveChanges();
            return true;
        }
        public bool ConnectMoves(FollowingMoveModel followingMoveModel)
        {
            Move move = GetFullDetailsMoveById(followingMoveModel.MoveId);
            move.Tags = new List<Tag>();

            DSAppContext.RemoveRange(move.PreMoves);
            move.PreMoves = new List<FollowingMove>();

            foreach (var preMoveId in followingMoveModel.PreMovesId)
            {
                var preMove = GetMoveById(preMoveId);
                var followingMove = new FollowingMove() { PostMove = move, PreMove = preMove };
                preMove.ProMoves.Add(followingMove);
                move.PreMoves.Add(followingMove);
            }
            DSAppContext.RemoveRange(move.ProMoves);
            move.ProMoves = new List<FollowingMove>();
            foreach (var proMoveId in followingMoveModel.PostMovesId)
            {
                var postMove = GetMoveById(proMoveId);
                var followingMove = new FollowingMove() { PostMove = move, PreMove = postMove };
                move.ProMoves.Add(followingMove);
                postMove.PreMoves.Add(followingMove);
            }

            DSAppContext.SaveChanges();
            return true;
        }

        public bool ConnectPreMoves(ConnectMoves connectMoves)
        {
            Move move = GetFullDetailsMoveById(connectMoves.MoveId);
            move.Tags = new List<Tag>();

            DSAppContext.RemoveRange(move.PreMoves);
            move.PreMoves = new List<FollowingMove>();

            if (connectMoves.MovesId != null)
                foreach (var preMoveId in connectMoves.MovesId)
                {
                    var preMove = GetMoveById(preMoveId);
                    var followingMove = new FollowingMove() { PostMove = move, PreMove = preMove };
                    if (move.Id != preMove.Id)
                        preMove.ProMoves.Add(followingMove);
                    move.PreMoves.Add(followingMove);
                }

            DSAppContext.SaveChanges();
            return true;
        }

        public bool ConnectPostMoves(ConnectMoves connectMoves)
        {
            Move move = GetFullDetailsMoveById(connectMoves.MoveId);
            move.Tags = new List<Tag>();

            DSAppContext.RemoveRange(move.ProMoves);
            move.ProMoves = new List<FollowingMove>();
            if (connectMoves.MovesId != null)
                foreach (var proMoveId in connectMoves.MovesId)
                {
                    var postMove = GetMoveById(proMoveId);
                    var followingMove = new FollowingMove() { PostMove = postMove, PreMove = move };
                    move.ProMoves.Add(followingMove);
                    if (move.Id != postMove.Id)
                        postMove.PreMoves.Add(followingMove);
                }

            DSAppContext.SaveChanges();
            return true;
        }

        public bool DeleteMove(int id)
        {
            var move = GetFullDetailsMoveById(id);
            DSAppContext.FollowingMoves.RemoveRange(move.PreMoves);
            DSAppContext.FollowingMoves.RemoveRange(move.ProMoves);
            DSAppContext.Moves.Remove(move);
            DSAppContext.SaveChanges();
            return true;
        }

        public void UpdateMove(UpdateMove move)
        {
            var moveToUpdate = GetMoveById(move.Id);
            moveToUpdate.Name = move.Name;
            moveToUpdate.Description = move.Desciption;

            DSAppContext.Update(moveToUpdate);
            DSAppContext.SaveChanges();
        }

        public Tag GetTag(string name)
        {
            return DSAppContext.Tags.FirstOrDefault(x => x.Value.Equals(name));
        }

        public Tag GetTagById(int id)
        {
            return DSAppContext.Tags.FirstOrDefault(x => x.Id == id);
        }

        public ICollection<Tag> GetTags()
        {
            return DSAppContext.Tags.ToList();
        }

        public Tag AddTag(AddTag addTag)
        {
            Tag tag = new Tag() { Description = addTag.Description, Value = addTag.Value };
            DSAppContext.Tags.Add(tag);
            DSAppContext.SaveChanges();
            return tag;
        }

        public bool UpdateTag(UpdateTag updateTag)
        {
            Tag tag = GetTagById(updateTag.Id);
            tag.Description = updateTag.Description;
            tag.Value = updateTag.Value;
            DSAppContext.Update(tag);
            DSAppContext.SaveChanges();
            return true;
        }

        public bool RemoveTag(int tagId)
        {
            Tag tag = GetTagById(tagId);
            DSAppContext.Tags.Remove(tag);
            DSAppContext.SaveChanges();
            return true;
        }
        public Alternation GetAlternationById(int id)
        {
            return DSAppContext.Alternations.FirstOrDefault(x => x.Id == id);
        }

        public bool AddAlternation(AddAlternationList addAlternationList)
        {

            var move = GetMoveById(addAlternationList.MoveId);
            DSAppContext.RemoveRange(move.Alternates);

            foreach (var alternationView in addAlternationList.Alternations)
            {
                Alternation alternation = new Alternation() { Description = alternationView.Description, Name = alternationView.Value, MoveId = move.Id };
                DSAppContext.Alternations.Add(alternation);
            }

            DSAppContext.SaveChanges();
            return true;
        }

        public void RemoveAlternation(int tagId)
        {
            Tag tag = GetTagById(tagId);
            DSAppContext.Tags.Remove(tag);
            DSAppContext.SaveChanges();
        }

        public CountModel Count()
        {
            CountModel countModel = new CountModel();
            countModel.DanceNumber = DSAppContext.Dances.Count();
            countModel.MoveNumber = DSAppContext.Moves.Count();
            countModel.SequenceNumber = DSAppContext.Sequences.Count();
            return countModel;
        }

        public List<MoveView> GetPostMoves(int id)
        {
            var followingMoves = DSAppContext.FollowingMoves.Where(x => x.PreMoveId == id).ToList();
            List<MoveView> moveViews = new List<MoveView>();

            foreach (var followingMove in followingMoves)
            {
                var preMove = GetMoveById(followingMove.PostMoveId);
                moveViews.Add(new MoveView() { Id = preMove.Id, Name = preMove.Name, Description = preMove.Description });
            }

            return moveViews;
        }
    }
}
