using System;
using System.Collections.Generic;

namespace FitnessCenterAPI.Entities;

public partial class Test
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateOnly Date { get; set; }

    public double Weight { get; set; }

    public double FatPercentage { get; set; }

    public virtual User User { get; set; } = null!;
}
