import React, { useState } from "react";
import './Split.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';


const Admin = () => {
  const [isHoveringDiv1, setIsHoveringDiv1] = useState(false);
  const [isHoveringDiv2, setIsHoveringDiv2] = useState(false);

  const handleMouseEnterDiv1 = () => {
    setIsHoveringDiv1(true);
  };

  const handleMouseLeaveDiv1 = () => {
    setIsHoveringDiv1(false);
  };

  const handleMouseEnterDiv2 = () => {
    setIsHoveringDiv2(true);
  };

  const handleMouseLeaveDiv2 = () => {
    setIsHoveringDiv2(false);
  };
  return (
    <div className="split-body">
      <div
        className={`split-body-div ${isHoveringDiv1 ? 'active' : ''}`}
        onMouseEnter={handleMouseEnterDiv1}
        onMouseLeave={handleMouseLeaveDiv1}
      >
        <Link to="/admin/myprofile">Upravljaj profilom servisa</Link>
      </div>
      <div
        className={`split-body-div ${isHoveringDiv2 ? 'active' : ''}`}
        onMouseEnter={handleMouseEnterDiv2}
        onMouseLeave={handleMouseLeaveDiv2}
      >
        <Link to="/admin/appoitments">Upravljaj terminima</Link>
      </div>
    </div>
  );
};

export default Admin;