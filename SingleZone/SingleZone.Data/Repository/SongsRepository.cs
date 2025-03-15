﻿using System;
using System.Collections.Generic;
using System.Linq;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces;
using SingleZone.Data;

namespace SingleZone.Data.Repository
{
    public class SongsRepository : IRepository<Songs>
    {
        private readonly DataContext _context;

        public SongsRepository(DataContext context)
        {
            _context = context;
        }

        public List<Songs> GetAll()
        {
            return _context.SongsList.ToList();
        }

        public Songs Add(Songs song)
        {
            try
            {
                _context.SongsList.Add(song);
                _context.SaveChanges();
                return song;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Songs GetById(int id)
        {
            return _context.SongsList.FirstOrDefault(s => s.Id == id);
        }

        public int GetIndexById(int id)
        {
            return _context.SongsList.ToList().FindIndex(s => s.Id == id);
        }

        //public bool Update(Songs song, int index)
        //{
        //    try
        //    {
        //        var songsList = _context.SongsList.ToList();

        //        if (index < 0 || index >= songsList.Count)
        //            return false;

        //        var existingSong = songsList[index];

        //        if (!string.IsNullOrWhiteSpace(song.Title))
        //            existingSong.Title = song.Title;

        //        if (!string.IsNullOrWhiteSpace(song.Artist))
        //            existingSong.Artist = song.Artist;

        //        if (!string.IsNullOrWhiteSpace(song.Genere))
        //            existingSong.Genere = song.Genere;

        //        if (!string.IsNullOrWhiteSpace(song.audioUrl))
        //            existingSong.audioUrl = song.audioUrl;

        //        if (song.Tags != null)
        //            existingSong.Tags = song.Tags;

        //        _context.SaveChanges();
        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }
        //}



        public bool Update(Songs song, int id)
        {

            var existingSong = _context.SongsList.FirstOrDefault(c => c.Id == id);
            if (existingSong == null) return false;


            existingSong.Title = song.Title;
            existingSong.Artist = song.Artist;
            existingSong.Genere = song.Genere;
            existingSong.audioUrl = song.audioUrl;
            existingSong.PlayListId = song.PlayListId;
            existingSong.Tags = existingSong.Tags;

            
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public bool Delete(int id)
        {
            var song = _context.SongsList.FirstOrDefault(c => c.Id == id);
            if (song == null) return false;

            try
            {
                _context.SongsList.Remove(song);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }

        }
        //public bool Delete(int index)
        //{
        //    try
        //    {
        //        var songsList = _context.SongsList.ToList();

        //        if (index < 0 || index >= songsList.Count)
        //            return false;

        //        _context.SongsList.Remove(songsList[index]);
        //        _context.SaveChanges();
        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }
        //}
    }
}
