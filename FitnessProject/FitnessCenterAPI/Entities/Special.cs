using System;
using System.Collections.Generic;

namespace FitnessCenterAPI.Entities;

public partial class Special
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int NeedAge { get; set; }

    public int NeedLoyaltyId { get; set; }

    public int NeedClubId { get; set; }

    public virtual Club NeedClub { get; set; } = null!;

    public virtual Loyalty NeedLoyalty { get; set; } = null!;
}
