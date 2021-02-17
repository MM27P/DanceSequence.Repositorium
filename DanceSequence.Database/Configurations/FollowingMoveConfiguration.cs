using DanceSequence.Database.Models.Many2Many;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DanceSequence.Database.Configurations
{
    class FollowingMoveConfiguration : IEntityTypeConfiguration<FollowingMove>
    {
        public void Configure(EntityTypeBuilder<FollowingMove> builder)
        {
            builder.HasOne(x => x.PreMove)
                .WithMany(x => x.ProMoves)
                .HasForeignKey(x => x.PreMoveId);
            builder.HasOne(x => x.PostMove)
                .WithMany(x => x.PreMoves)
                .HasForeignKey(x => x.PostMoveId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}

