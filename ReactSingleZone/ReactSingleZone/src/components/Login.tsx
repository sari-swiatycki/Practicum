import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface LoginProps {
  open: boolean;
  handleClose: () => void;
}

const Login: React.FC<LoginProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        login
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" component={Link} to="/personal-area">
          Go to Personal Area
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;