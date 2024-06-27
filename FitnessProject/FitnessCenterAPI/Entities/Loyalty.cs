using System;
using System.Collections.Generic;

namespace FitnessCenterAPI.Entities;

public partial class Loyalty
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int BonusScores { get; set; }

    public virtual ICollection<Special> Specials { get; set; } = new List<Special>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
