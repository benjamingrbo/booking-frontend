import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SearchElement from "./SearchElement";
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