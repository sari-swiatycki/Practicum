﻿using AutoMapper;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces;
using SingleZone.Core.Interfaces.ServiceInterface;
using SingleZone.Core.DTOs;
using SingleZone.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SingleZone.Core.entities;



namespace SingleZone.Service
{
    public class SongsService : ISongsService
    {
        readonly IRepository<Songs> _repository;
        readonly IMapper _mapper;

        public SongsService(IRepository<Songs> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public List<SongDto> GetList()
        {
            var data = _repository.GetAll();
            return _mapper.Map<List<SongDto>>(data);
        }

        public SongDto GetById(int id)
        {
            var data = _repository.GetById(id);
            if (data == null) return null;
            return _mapper.Map<SongDto>(data);
        }

        public SongDto AddSong(SongDto songDto)
        {
            // Check if the song already exists by Id
            if (_repository.GetById(songDto.Id) != null) return null;

            // Map the DTO back to the entity before adding
            var song = _mapper.Map<Songs>(songDto);
            song= _repository.Add(song);
            if (song == null)
            {
                return null;
            }
            return _mapper.Map<SongDto>(song);
        }
      



        public bool Update(int id, SongDto songDto)
        {
            var song = _repository.GetById(id);
            if (song == null) return false;

            // Map the DTO to the entity before updating
            var updatedSong = _mapper.Map<Songs>(songDto);
            return _repository.Update(updatedSong, id);
        }

        public bool Remove(int id)
        {
            var song = _repository.GetById(id);
            if (song == null) return false;

            return _repository.Delete(id);
        }



      

    }
}
