using FitnessCenterAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FitnessCenterAPI.Services
{
    public static class JwtCreator
    {

        public static bool ValidateToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(token);
            var claim = jwt.Claims.First(claim => claim.Type == "exp");
            var ticks = long.Parse(claim.Value);
            var expires_at = DateTimeOffset.FromUnixTimeSeconds(ticks).UtcDateTime;
            var now = DateTime.Now.ToUniversalTime();
            var valid = expires_at > now;
            return valid;
        }

        public static string[] GetTokens(User target, FitnessCenterDbContext _db)
        {
            var claims = new List<Claim> {
                new Claim("Id", target.Id.ToString()),
                new Claim("Name", target.Name ?? ""),
                new Claim("Surname", target.Surname ?? ""),
                new Claim("Age", target.Age.ToString() ?? ""),
                new Claim("Email", target.Email),
                new Claim("Phone", target.Phone),
                new Claim("GenderID", target.GenderId.ToString() ?? ""),
                new Claim("LoyaltyID", target.LoyaltyId.ToString() ?? ""),
                new Claim("Scores", target.Scores.ToString() ?? ""),
                new Claim("SubID", target.SubId.ToString() ?? ""),
                new Claim("ClubID", target.ClubId.ToString() ?? ""),
                new Claim("CreateTime", DateTime.Now.ToString())
            };

            var jwtA = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(15)));

            var jwtR = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromDays(30)));


            var AToken = new JwtSecurityTokenHandler().WriteToken(jwtA);
            var RToken = new JwtSecurityTokenHandler().WriteToken(jwtR);


            target.AToken = AToken;
            target.RToken = RToken;
            _db.SaveChanges();

            string[] tokens = new string[] { AToken, RToken };

            return tokens;
        }
    }
}
