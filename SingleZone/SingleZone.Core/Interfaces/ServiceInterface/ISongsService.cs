﻿using SingleZone.Core.DTOs;

namespace SingleZone.Core.Interfaces.ServiceInterface
{
    public interface ISongsService
    {

        List<SongDto> GetList();         // מחזיר את כל רשימת השירים ב-DTO
        SongDto GetById(int id);         // מחזיר שיר לפי מזהה כ-DTO
        SongDto AddSong(SongDto songDto);  // מוסיף שיר חדש מ-DTO
        bool Update(int id, SongDto songDto);  // מעדכן שיר קיים ב-DTO
        bool Remove(int id);  // מסיר שיר לפי מזהה
    }
}
