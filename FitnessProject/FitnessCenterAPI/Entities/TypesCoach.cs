using System;
using System.Collections.Generic;

namespace FitnessCenterAPI.Entities;

public partial class TypesCoach
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<Coach> Coaches { get; set; } = new List<Coach>();
}
