import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PersonIcon from '@mui/icons-material/Person';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom'; // ייבוא Link

const PersonalAreaMenu = () => {
  const [open, setOpen] = useState(false);

  // פונקציה לפתיחת וסגירת התפריט
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <>
      {/* כפתור שלושה עיגולים */}
      <IconButton onClick={toggleDrawer(true)} color="inherit">
        <MoreVertIcon />
      </IconButton>

      {/* תפריט נפתח בצד */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        variant="persistent"
      >
        <List sx={{ width: 250 }}>
          {/* במקום ListItem עם onClick, נשתמש ב-Link */}
          <ListItem>
            <Link to="/personal-area/playlist" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon>
                <QueueMusicIcon />
              </ListItemIcon>
              <ListItemText primary="פלייליסט" />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/personal-area/profile-update" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="עדכון פרטים אישיים" />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/personal-area/upload-song" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon>
                <CloudUploadIcon />
              </ListItemIcon>
              <ListItemText primary="העלאת שיר חדש" />
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default PersonalAreaMenu;
