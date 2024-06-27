using FitnessCenterAPI.Models;
using FitnessCenterAPI.Services;
using Microsoft.AspNetCore.Mvc;
using FitnessCenterAPI.Entities;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace FitnessCenterAPI.Controllers
{
    [ApiController]
    [Route("API")]

    public class APIController : Controller
    {
        private readonly FitnessCenterDbContext _context;

        public APIController(FitnessCenterDbContext context)
        {
            _context = context;
        }

        [HttpPost("Registration")]
        public IResult Registration([FromBody] RegModel data)
        {
            string hashPassword = PassConverter.Convert(data.password);

            User newUser = new User();
            newUser.Email = data.email;
            newUser.Password = hashPassword;
            newUser.Phone = data.phone;
            newUser.Scores = 0;

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Results.Ok(newUser);
        }

        [HttpPost("Authorization")]
        public IResult Authorization([FromBody] AuthModel data)
        {
            string hashPassword = PassConverter.Convert(data.password);

            User? target = _context.Users.FirstOrDefault(p =>  p.Email == data.email && hashPassword == p.Password);

            if(target != null)
            {
                string[] tokens = JwtCreator.GetTokens(target, _context);

                return Results.Ok(tokens);
            }
            else
            {
                return Results.NotFound("Wrong email or password");
            }
        }

        [HttpGet("Validation")]
        public IResult Validation(string aToken, string rToken)
        {
            var handler = new JwtSecurityTokenHandler();

            var jwtA = handler.ReadJwtToken(aToken);
            var claim = jwtA.Claims.First(claim => claim.Type == "exp");
            var ticks = long.Parse(claim.Value);
            var expires_at = DateTimeOffset.FromUnixTimeSeconds(ticks).UtcDateTime;
            var now = DateTime.Now.ToUniversalTime();
            var validA = expires_at > now;

            if (validA)
            {
                return Results.Ok(validA);
            }

            else
            {
                var jwtR = handler.ReadJwtToken(rToken);
                claim = jwtR.Claims.First(claim => claim.Type == "exp");
                ticks = long.Parse(claim.Value);
                expires_at = DateTimeOffset.FromUnixTimeSeconds(ticks).UtcDateTime;
                now = DateTime.Now.ToUniversalTime();
                var validR = expires_at > now;

                if (validR)
                {
                    User? target = _context.Users.FirstOrDefault(p => p.RToken == rToken);
                    if (target != null)
                    {
                        string[] tokens = JwtCreator.GetTokens(target, _context);
                        return Results.Ok(tokens);
                    }
                    return Results.NotFound();
                }
                else
                {
                    return Results.Unauthorized();
                }
            }
        }
    }
}
