using DanceSequence.Database.Configurations;
using DanceSequence.Database.Models;
using DanceSequence.Database.Models.Many2Many;
using Microsoft.EntityFrameworkCore;

namespace EFGetStarted
{
    public class DSContext : DbContext
    {
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Dance> Dances { get; set; }
        public DbSet<Move> Moves { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Alternation> Alternations { get; set; }
        public DbSet<FollowingMove> FollowingMoves { get; set; }
        public DbSet<Sequence> Sequences { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("Server=(LocalDb)\\MSSQLLocalDB;Database=DanceSequence;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<FollowingMove>().HasKey(sc => new { sc.PreMoveId, sc.PostMoveId });

            builder.ApplyConfiguration(new DanceConfiguration());
            builder.ApplyConfiguration(new MoveConfiguration());
            builder.ApplyConfiguration(new TagConfiguration());
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new FollowingMoveConfiguration());
            builder.ApplyConfiguration(new SequenceConfiguration());

            builder.Entity<Dance>().HasData(
                new Dance() { Id = 1, Name = "Zouk", Type = Dance.DanceType.Latino },
                new Dance() { Id = 2, Name = "Bachata", Type = Dance.DanceType.Latino },
                new Dance() { Id = 3, Name = "Swing", Type = Dance.DanceType.NotLatino });

            builder.Entity<User>().HasData(
                new User() { Id = 1, Login = "Admin", Password = "P@ssw0rd" }
                );
        }
    }


}