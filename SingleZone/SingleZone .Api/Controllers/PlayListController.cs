﻿using Microsoft.AspNetCore.Mvc;
using SingleZone.Core.DTOs;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces.ServiceInterface;
using AutoMapper;
using System.Collections.Generic;
using SingleZone.Core.entities;
using SingleZone.API.PostModales;
using SingleZone.Service;

namespace SingleZone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayListController : ControllerBase
    {
        private readonly IPlayListService _playListService;
        private readonly IMapper _mapper;

        public PlayListController(IPlayListService playListService, IMapper mapper)
        {
            _playListService = playListService;
            _mapper = mapper;
        }

        // GET: api/PlayList
        [HttpGet]
        public ActionResult<List<PlayListDto>> Get()
        {
            var result = _playListService.GetList();
            if (result == null || result.Count == 0)
            {
                return NotFound("No playlists found.");
            }
            return Ok(result);
        }

        // GET api/PlayList/5
        [HttpGet("{id}")]
        public ActionResult<PlayListDto> GetById(int id)
        {
            if (id < 0) return BadRequest("Invalid ID.");

            var result = _playListService.GetById(id);
            if (result == null)
            {
                return NotFound("Playlist not found.");
            }
            return Ok(result);
        }

        // POST api/PlayList
        [HttpPost]
        public ActionResult<SongDto> Post([FromBody] PlayListPostModal playListPost)
        {
            if (playListPost == null) return BadRequest("Invalid playlist data.");

            var playList = _mapper.Map<PlayListDto>(playListPost); // ממיר את ה-DTO לישות
            var createdPlayList = _playListService.AddPlayList(playList);
            if (createdPlayList == null)
            {
                return BadRequest("Failed to create user.");
            }
            return Ok(createdPlayList);
        }

        // PUT api/PlayList/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] PlayListPostModal playListPost)
        {
            if (id < 0 || playListPost == null) return BadRequest("Invalid ID or playlist data.");
            var playList = _mapper.Map<PlayListDto>(playListPost); // ממיר את ה-DTO לישות
            bool success = _playListService.Update(id, playList);
            if (!success) return NotFound("Playlist not found.");

            return Ok(success);
        }

        // DELETE api/PlayList/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (id < 0) return BadRequest("Invalid ID.");

            bool success = _playListService.Remove(id);
            if (!success) return NotFound("Playlist not found.");

            return Ok(success);
        }
    }
}
