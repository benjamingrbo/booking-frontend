import React, { useState } from 'react';
import './CarShopProfile.css'
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';

const CarShopProfile = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [formDataProfileInfo, setFormDataProfileInfo] = useState({
        carshopName: 'John',
        carshopAddress: 'Doe',
        contactNumber: '123456789',
        carshopDescription: 'aaaaa'
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



    const [services, setServices] = useState([
        { id: 1, name: 'Service 1' },
        { id: 2, name: 'Service 2' },
        { id: 3, name: 'Service 3', price:'20 KM' },
      ]);
    
      const handleDeleteService = (id) => {
        setServices(services.filter((service) => service.id !== id));
      };

    return (
        <div>
            <div className="ProfileOverview">
                <div className="ToggleButtons">
                    <button
                        className={activeSection === 'overview' ? 'active' : ''}
                        onClick={() => handleToggle('overview')}
                    >
                        Carshop Overview
                    </button>
                    <button
                        className={activeSection === 'services' ? 'active' : ''}
                        onClick={() => handleToggle('services')}
                    >
                        Services
                    </button>
                    <button
                        className={activeSection === 'reviews' ? 'active' : ''}
                        onClick={() => handleToggle('reviews')}
                    >
                        Reviews
                    </button>
                </div>
                <div className="ProfileSections">
                    {activeSection === 'overview' && (
                        <div className="ProfileInfo">
                            <h2>Carshop information</h2>
                            <form onSubmit={handleSubmitProfileInfo}>
                                <input
                                    type="text"
                                    name="carshopName"
                                    value={formDataProfileInfo.carshopName}//promjeniti nazive atributa i sl
                                    onChange={handleChangeProfileInfo}
                                    placeholder="Carshop Name"
                                />
                                <input
                                    type="text"
                                    name="carshopAddress"
                                    value={formDataProfileInfo.carshopAddress}//promjeniti
                                    onChange={handleChangeProfileInfo}
                                    placeholder="Carshop Address"
                                />
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={formDataProfileInfo.contactNumber}
                                    onChange={handleChangeProfileInfo}
                                    placeholder="Carshop Contact Number"
                                />
                                <textarea
                                    placeholder='Carshop Descripton'
                                    value={formDataProfileInfo.carshopDescription}
                                    onChange={handleChangeProfileInfo}
                                />
                                <br></br>
                                {/* Add additional input fields here */}
                                {profileInfoChanges && (
                                    <button type="submit">Submit</button>
                                )}
                            </form>
                        </div>
                    )}
                    {activeSection === 'services' && (
                        <div className="PasswordChange">
                            <button><Link to="/admin/carshopdetails/addservice">Add service</Link></button>
                            <h2>Services</h2>
                            {services.map((service) => (
                                <div key={service.id} className="service-item">
                                    <p>{service.name}</p>
                                    <p>{service.price}</p>
                                    <button><Link to="/admin/carshopdetails/editcarshopservice">Edit</Link></button>
                                    <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarShopProfile;
