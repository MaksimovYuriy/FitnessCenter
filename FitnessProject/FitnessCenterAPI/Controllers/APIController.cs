﻿using FitnessCenterAPI.Models;
using FitnessCenterAPI.Services;
using Microsoft.AspNetCore.Mvc;
using FitnessCenterAPI.Entities;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.EntityFrameworkCore.Diagnostics.Internal;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            var validA = JwtCreator.ValidateToken(aToken);

            if (validA)
            {
                return Results.Ok(validA);
            }

            else
            {
                var validR = JwtCreator.ValidateToken(rToken);

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

        [HttpPut("ChangeUser")]
        public IResult ChangeUser([FromBody] ChangeModel change)
        {
            User? target = _context.Users.FirstOrDefault(p => p.Id == change.id);
            if (target == null)
            {
                return Results.NotFound();
            }
            if (JwtCreator.ValidateToken(change.jwtA))
            {
                target.Name = change.name;
                target.Surname = change.surname;
                target.Email = change.email;
                target.Phone = change.phone;
                target.GenderId = change.genderID;
                _context.SaveChanges();

                string[] tokens = JwtCreator.GetTokens(target, _context);
                target.AToken = tokens[0];
                target.RToken = tokens[1];
                _context.SaveChanges();

                return Results.Ok(tokens);
            }
            else
            {
                if (JwtCreator.ValidateToken(change.jwtR))
                {
                    target.Name = change.name;
                    target.Surname = change.surname;
                    target.Email = change.email;
                    target.Phone = change.phone;
                    target.GenderId = change.genderID;
                    _context.SaveChanges();

                    string[] tokens = JwtCreator.GetTokens(target, _context);
                    target.AToken = tokens[0];
                    target.RToken = tokens[1];
                    _context.SaveChanges();

                    return Results.Ok(tokens);
                }
                return Results.Unauthorized();
            }
        }

        [HttpGet("SelectDate")]
        public IResult SelectDate(string date)
        {
            DateOnly targetDate = DateOnly.Parse(date);

            int[] coaches = _context.Coaches.Select(p => p.Id).ToArray();
            int[] uniqCoaches = _context.Timetables.Where(p => p.Date == targetDate).Select(p => p.CoachId).Distinct().ToArray();
            
            coaches = coaches.Except(uniqCoaches).ToArray();

            Coach[] result = _context.Coaches.Where(p => coaches.Contains(p.Id)).ToArray();

            return Results.Json(result);
        }

        [HttpPost("MakeTrain")]
        public IResult MakeTrain([FromBody] MakeTrainModel newTrain)
        {
            Timetable t = new Timetable();
            DateOnly targetDate = DateOnly.Parse(newTrain.date);
            t.Date = targetDate;
            t.UserId = newTrain.user_id;
            t.CoachId = newTrain.coach_id;
            _context.Timetables.Add(t);
            _context.SaveChanges();
            return Results.Json(t);
        }
    }
}
