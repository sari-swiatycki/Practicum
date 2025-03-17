import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const HeaderPersonalArea = () => {
  const handleLogout = () => {
    // לוגיקה ליציאה מהאזור האישי
    console.log('יציאה מהאזור האישי');
    window.location.href = '/';
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          אזור אישי
        </Typography>
        <Button 
          color="inherit" 
          startIcon={<ExitToAppIcon />} 
          onClick={handleLogout}
        >
          יציאה
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPersonalArea;
