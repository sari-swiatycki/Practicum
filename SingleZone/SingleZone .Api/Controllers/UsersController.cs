﻿using Microsoft.AspNetCore.Mvc;
using SingleZone.Core.DTOs;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces.ServiceInterface;
using AutoMapper;
using System.Collections.Generic;
using SingleZone.Core.entities;
using SingleZone.Service;
using SingleZone.API.PostModales;

namespace SingleZone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IMapper _mapper;

        public UsersController(IUsersService usersService, IMapper mapper)
        {
            _usersService = usersService;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        public ActionResult<List<UserDto>> Get()
        {
            var result = _usersService.GetList();
            if (result == null || result.Count == 0)
            {
                return NotFound("No users found.");
            }
            return Ok(result);
        }

        // GET api/Users/5
        [HttpGet("{id}")]
        public ActionResult<UserDto> GetById(int id)
        {
            if (id < 0) return BadRequest("Invalid ID.");

            var result = _usersService.GetById(id);
            if (result == null)
            {
                return NotFound("User not found.");
            }
            return Ok(result);
        }


        //[HttpPost]
        //public ActionResult Post([FromBody] UsersPostModal userPost)//post model
        //{
        //    if (userPost == null) return BadRequest("Invalid user data.");

        //    var user = _mapper.Map<UserDto>(userPost); // ממיר את ה-DTO לישות
        //    bool success = _usersService.AddUser(user);
        //    if (!success)
        //    {
        //        return BadRequest("Failed to create user.");
        //    }
        //    return Ok(success);
        //}

        // POST api/Users
        [HttpPost]
        public ActionResult<UserDto> Post([FromBody] UsersPostModal userPost)
        {
            if (userPost == null)
                return BadRequest("Invalid user data.");

            var userDto = _mapper.Map<UserDto>(userPost); // ממיר את ה-Post Model ל- DTO
            var createdUser = _usersService.AddUser(userDto); // מקבל את המשתמש שנוסף

            if (createdUser == null)
            {
                return BadRequest("Failed to create user.");
            }
            return Ok(createdUser);
            //return CreatedAtAction(nameof(Post), new { id = createdUser.Id }, createdUser);
        }




   


    // PUT api/Users/5
            [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] UsersPostModal userPost)//postmodal
        {
            if (id < 0 || userPost == null) return BadRequest("Invalid ID or user data.");

            var user = _mapper.Map<UserDto>(userPost); // ממיר את ה-DTO לישות
            bool success = _usersService.Update(id, user);
            if (!success) return NotFound("User not found.");

            return Ok(success);
        }

        // DELETE api/Users/5
        [HttpDelete("{id}")]//
        public ActionResult Delete(int id)
        {
            if (id < 0) return BadRequest("Invalid ID.");

            bool success = _usersService.Remove(id);
            if (!success) return NotFound("User not found.");

            return Ok(success);
        }
    }
}
