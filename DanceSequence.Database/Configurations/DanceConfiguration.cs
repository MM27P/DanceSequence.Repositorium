using DanceSequence.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DanceSequence.Database.Configurations
{
    class DanceConfiguration : IEntityTypeConfiguration<Dance>
    {
        public void Configure(EntityTypeBuilder<Dance> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasMany(x => x.Moves)
                .WithOne(x => x.Dance)
                .HasForeignKey(x => x.DanceId);
        }
    }
}
