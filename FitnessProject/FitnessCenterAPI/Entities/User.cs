using System;
using System.Collections.Generic;

namespace FitnessCenterAPI.Entities;

public partial class User
{
    public int Id { get; set; }

    public string? AToken { get; set; }

    public string? RToken { get; set; }

    public string? Name { get; set; }

    public string? Surname { get; set; }

    public int? Age { get; set; }

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? GenderId { get; set; }

    public int? LoyaltyId { get; set; }

    public int Scores { get; set; }

    public int? SubId { get; set; }

    public int? ClubId { get; set; }

    public virtual Club? Club { get; set; }

    public virtual Gender? Gender { get; set; }

    public virtual Loyalty? Loyalty { get; set; }

    public virtual Sub? Sub { get; set; }

    public virtual ICollection<Test> Tests { get; set; } = new List<Test>();

    public virtual ICollection<Timetable> Timetables { get; set; } = new List<Timetable>();
}
