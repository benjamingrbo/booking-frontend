import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import SearchElement from "./SearchElement";


const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick = () => {
    navigate('/');
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={()=> handleOnClick()}>GARAGE BOOK</Typography>
          <Link to="/customer/appoitments"><Button color="inherit" onClick={handleOpen} style={{color:'white'}}>Termini</Button></Link>
          <Link to="/customer/myprofile"><Button color="inherit" onClick={handleOpen} style={{color:'white'}}>Profil</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;