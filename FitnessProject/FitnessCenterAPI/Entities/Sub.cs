using System;
using System.Collections.Generic;

namespace FitnessCenterAPI.Entities;

public partial class Sub
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Price { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
