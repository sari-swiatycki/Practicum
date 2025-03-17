using SingleZone.Core.entities;
using System;
using System.Collections.Generic;

namespace SingleZone.Core.DTOs
{
    public class SongDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Artist { get; set; }
        public string? Genere { get; set; }
        public string? AudioUrl { get; set; }
        public string? Tags { get; set; }

        public Categories category { get; set; }

    }
}
