import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Login from './Login';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" onClick={handleOpen} startIcon={<LoginIcon />}>
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/register"
            startIcon={<PersonAddIcon />}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Login open={open} handleClose={handleClose} />
    </>
  );
};

export default Header;