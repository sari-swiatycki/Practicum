﻿using SingleZone.Core.entities;
using System.ComponentModel.DataAnnotations;

namespace SingleZone.API.PostModales
{
    public class SongsPostModal
    {
   
        public string? Title { get; set; }

        public string? Artist { get; set; }

        public string? Genere { get; set; }

        public string? AudioUrl { get; set; }

        public string? Tags { get; set; }

        public int PlayListId { get; set; }
        public Categories category { get; set; }



    }
}
