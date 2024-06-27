using System;
using System.Collections.Generic;

namespace FitnessCenterAPI.Entities;

public partial class Coach
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public int TypeId { get; set; }

    public virtual ICollection<Timetable> Timetables { get; set; } = new List<Timetable>();

    public virtual TypesCoach Type { get; set; } = null!;
}
