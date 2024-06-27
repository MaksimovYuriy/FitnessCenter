using System;
using System.Collections.Generic;

namespace FitnessCenterAPI.Entities;

public partial class Timetable
{
    public int Id { get; set; }

    public DateOnly Date { get; set; }

    public int UserId { get; set; }

    public int CoachId { get; set; }

    public virtual Coach Coach { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
