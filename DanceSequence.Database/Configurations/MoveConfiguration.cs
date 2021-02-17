using DanceSequence.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DanceSequence.Database.Configurations
{
    class MoveConfiguration : IEntityTypeConfiguration<Move>
    {
        public void Configure(EntityTypeBuilder<Move> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasMany(x => x.Tags)
                .WithMany(x => x.Moves);
            builder.HasMany(x => x.Alternates)
              .WithOne(x => x.Move)
              .HasForeignKey(x => x.MoveId)
              .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
