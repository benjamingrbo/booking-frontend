import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SearchElement from "./SearchElement";
import ProfileOverview from "./ProfileOverview";
import Navbar from "./Navbar";


const Customer = () => {
  return (
    <div>
      <Navbar/>
      <SearchElement />
    </div>
  );
};

export default Customer;