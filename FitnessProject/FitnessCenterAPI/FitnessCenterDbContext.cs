using System;
using System.Collections.Generic;
using FitnessCenterAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace FitnessCenterAPI;

public partial class FitnessCenterDbContext : DbContext
{
    public FitnessCenterDbContext()
    {
    }

    public FitnessCenterDbContext(DbContextOptions<FitnessCenterDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Club> Clubs { get; set; }

    public virtual DbSet<Coach> Coaches { get; set; }

    public virtual DbSet<Gender> Genders { get; set; }

    public virtual DbSet<Loyalty> Loyalties { get; set; }

    public virtual DbSet<Special> Specials { get; set; }

    public virtual DbSet<Sub> Subs { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<Timetable> Timetables { get; set; }

    public virtual DbSet<TypesCoach> TypesCoaches { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=fitness_center_db;Username=postgres;Password=");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Club>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Clubs_pkey");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<Coach>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Coaches_pkey");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Surname).HasColumnName("surname");
            entity.Property(e => e.TypeId).HasColumnName("type_id");

            entity.HasOne(d => d.Type).WithMany(p => p.Coaches)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Coaches_type_id_fkey");
        });

        modelBuilder.Entity<Gender>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Genders_pkey");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<Loyalty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Loyalty_pkey");

            entity.ToTable("Loyalty");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BonusScores).HasColumnName("bonus_scores");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<Special>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Specials_pkey");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.NeedAge).HasColumnName("need_age");
            entity.Property(e => e.NeedClubId).HasColumnName("need_club_id");
            entity.Property(e => e.NeedLoyaltyId).HasColumnName("need_loyalty_id");

            entity.HasOne(d => d.NeedClub).WithMany(p => p.Specials)
                .HasForeignKey(d => d.NeedClubId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Specials_need_club_id_fkey");

            entity.HasOne(d => d.NeedLoyalty).WithMany(p => p.Specials)
                .HasForeignKey(d => d.NeedLoyaltyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Specials_need_loyalty_id_fkey");
        });

        modelBuilder.Entity<Sub>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Subs_pkey");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Tests_pkey");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.FatPercentage).HasColumnName("fat_percentage");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Weight).HasColumnName("weight");

            entity.HasOne(d => d.User).WithMany(p => p.Tests)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Tests_user_id_fkey");
        });

        modelBuilder.Entity<Timetable>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Timetable_pkey");

            entity.ToTable("Timetable");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CoachId).HasColumnName("coach_id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Coach).WithMany(p => p.Timetables)
                .HasForeignKey(d => d.CoachId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Timetable_coach_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Timetables)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Timetable_user_id_fkey");
        });

        modelBuilder.Entity<TypesCoach>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("TypesCoach_pkey");

            entity.ToTable("TypesCoach");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Users_pkey");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AToken).HasColumnName("aToken");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.GenderId).HasColumnName("gender_id");
            entity.Property(e => e.LoyaltyId).HasColumnName("loyalty_id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Phone).HasColumnName("phone");
            entity.Property(e => e.RToken).HasColumnName("rToken");
            entity.Property(e => e.Scores).HasColumnName("scores");
            entity.Property(e => e.SubId).HasColumnName("sub_id");
            entity.Property(e => e.Surname).HasColumnName("surname");

            entity.HasOne(d => d.Club).WithMany(p => p.Users)
                .HasForeignKey(d => d.ClubId)
                .HasConstraintName("Users_club_id_fkey");

            entity.HasOne(d => d.Gender).WithMany(p => p.Users)
                .HasForeignKey(d => d.GenderId)
                .HasConstraintName("Users_gender_id_fkey");

            entity.HasOne(d => d.Loyalty).WithMany(p => p.Users)
                .HasForeignKey(d => d.LoyaltyId)
                .HasConstraintName("Users_loyalty_id_fkey");

            entity.HasOne(d => d.Sub).WithMany(p => p.Users)
                .HasForeignKey(d => d.SubId)
                .HasConstraintName("Users_sub_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
