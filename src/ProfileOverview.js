import React, { useState } from "react";
import "./ProfileOverview.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Navbar from "./Navbar";


const ProfileOverview = () => {
    const [activeSection, setActiveSection] = useState('info');
    const [formDataProfileInfo, setFormDataProfileInfo] = useState({
        name: 'John',
        surname: 'Doe',
        contactNumber: '123456789'
    });
    const [formDataPasswordChange, setFormDataPasswordChange] = useState({
        oldPassword: '',
        newPassword: ''
    })
    const [profileInfoChanges, setProfileInfoChanges] = useState(false);
    const [passwordInfoChanges, setPasswordInfoChanges] = useState(false);

    const handleToggle = (section) => {
        setActiveSection(section);
    };

    const handleChangeProfileInfo = (e) => {
        const { name, value } = e.target;
        setFormDataProfileInfo((prevFormDataProfileInfo) => ({
            ...prevFormDataProfileInfo,
            [name]: value,
        }));
        setProfileInfoChanges(true);
    };

    const handleChangePasswordInfo = (e) => {
        const { name, value } = e.target;
        setFormDataPasswordChange((prevFormDataPasswordInfo) => ({
            ...prevFormDataPasswordInfo,
            [name]: value,
        }));
        setPasswordInfoChanges(true);
    };

    const handleSubmitProfileInfo = (e) => {
        e.preventDefault();
        // Perform submit action for Profile Info here
        setProfileInfoChanges(false);
    };

    const handleSubmitPasswordChange = (e) => {
        e.preventDefault();
        // Perform submit action for Password Change here
    };

    return (
        <div>
            <Navbar/>
            <div className="ProfileOverview">
                <div className="ToggleButtons">
                    <button
                        className={activeSection === 'info' ? 'active' : ''}
                        onClick={() => handleToggle('info')}
                    >
                        Profile Info
                    </button>
                    <button
                        className={activeSection === 'password' ? 'active' : ''}
                        onClick={() => handleToggle('password')}
                    >
                        Password Change
                    </button>
                </div>
                <div className="ProfileSections">
                    {activeSection === 'info' && (
                        <div className="ProfileInfo">
                            <h2>Profile Info</h2>
                            <form onSubmit={handleSubmitProfileInfo}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formDataProfileInfo.name}
                                    onChange={handleChangeProfileInfo}
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    name="surname"
                                    value={formDataProfileInfo.surname}
                                    onChange={handleChangeProfileInfo}
                                    placeholder="Surname"
                                />
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={formDataProfileInfo.contactNumber}
                                    onChange={handleChangeProfileInfo}
                                    placeholder="Contact Number"
                                />
                                {/* Add additional input fields here */}
                                {profileInfoChanges && (
                                    <button type="submit">Submit</button>
                                )}
                            </form>
                        </div>
                    )}
                    {activeSection === 'password' && (
                        <div className="PasswordChange">
                            <h2>Password Change</h2>
                            <form onSubmit={handleSubmitPasswordChange}>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={formDataPasswordChange.oldPassword}
                                    onChange={handleChangePasswordInfo}
                                    placeholder="Old Password"
                                />
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formDataPasswordChange.newPassword}
                                    onChange={handleChangePasswordInfo}
                                    placeholder="New Password"
                                />
                                {passwordInfoChanges && (
                                    <button type="submit">Submit</button>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;