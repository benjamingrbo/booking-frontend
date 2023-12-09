import React, { useState, useEffect } from "react";
import "./ProfileOverview.css"
import Navbar from "./Navbar";


const ProfileOverview = () => {
    const [activeSection, setActiveSection] = useState('info');
    const userId = localStorage.getItem("userId");
    const headers = { 'Authorization': localStorage.getItem("token") };

    useEffect(() => {
        fetch(`https://localhost:44392/api/User/getUser?parametar=${userId}`, { headers })
            .then(response => response.json())
            .then(data => setFormDataProfileInfo(data))
            .catch(error => console.log(error));
    }, []);

    const [formDataProfileInfo, setFormDataProfileInfo] = useState({});

    const [formDataPasswordChange, setFormDataPasswordChange] = useState({
        userId: parseInt(userId),
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
        console.log(formDataProfileInfo)
        fetch(`https://localhost:44392/api/User/changeUser/${userId}`, {
            method: 'PUT', // Use PATCH instead of POST
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
            },
            body: JSON.stringify(formDataProfileInfo)
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error));

        setProfileInfoChanges(false);
    };

    const handleSubmitPasswordChange = async (e) => {
        e.preventDefault();
          try {
            const response = await fetch('https://localhost:44392/api/User/changePassword', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
              },
              body: JSON.stringify(formDataPasswordChange),
            });
     
            if (response.ok) {
              // Password change successful
              alert("You have successfully changed your password.")
              window.location.reload();
            } else {
              alert("Old password is wrong.")
            }
          } catch (error) {
            // Handle error
          }
    };

    return (
        <div>
            <Navbar />
            <div className="ProfileOverview">
                <div className="ToggleButtons">
                    <button
                        className={activeSection === 'info' ? 'active' : ''}
                        onClick={() => handleToggle('info')}
                    >
                        Informacije o profilu
                    </button>
                    <button
                        className={activeSection === 'password' ? 'active' : ''}
                        onClick={() => handleToggle('password')}
                    >
                        Promjena lozinke
                    </button>
                </div>
                <div className="ProfileSections">
                    {activeSection === 'info' && (
                        <div className="ProfileInfo">
                            <h2>Informacije o profilu</h2>
                            <form onSubmit={handleSubmitProfileInfo}>
                                <label>Korisničko ime</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formDataProfileInfo.username}
                                    onChange={handleChangeProfileInfo}
                                    placeholder="username"
                                />
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formDataProfileInfo.email}
                                    onChange={handleChangeProfileInfo}
                                    placeholder="email"
                                />
                                <label>Kontakt telefon</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={formDataProfileInfo.contactNumber}
                                    onChange={handleChangeProfileInfo}
                                    placeholder="Contact Number"
                                />
                                {/* Add additional input fields here */}
                                <br></br>
                                {profileInfoChanges && (
                                    <button style={{ width: "80%", float: "right" }} type="submit">Submit</button>
                                )}
                            </form>
                        </div>
                    )}
                    {activeSection === 'password' && (
                        <div className="PasswordChange">
                            <h2>Promjena lozinke</h2>
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
                                    <button style={{ width: "80%", float: "left" }} type="submit">Submit</button>
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