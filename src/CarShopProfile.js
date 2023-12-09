import React, { useState, useEffect } from 'react';
import './CarShopProfile.css'
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';

const CarShopProfile = () => {
    const navigate = useNavigate();
    const carShopId = 3;
    const [activeSection, setActiveSection] = useState('overview');
    const [formDataProfileInfo, setFormDataProfileInfo] = useState({});
    const [formDataPasswordChange, setFormDataPasswordChange] = useState({
        oldPassword: '',
        newPassword: ''
    })
    const [profileInfoChanges, setProfileInfoChanges] = useState(false);
    const [passwordInfoChanges, setPasswordInfoChanges] = useState(false);
    const headers = { 'Authorization': localStorage.getItem("token") };

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
        
        console.log(formDataProfileInfo);

        fetch(`https://localhost:44392/api/CarShop/changeCarShop/${carShopId}`, {
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


    const [services, setServices] = useState([]);

    const handleDeleteService = (id) => {
        setServices(services.filter((service) => service.id !== id));

        fetch(`https://localhost:44392/api/CarShopService/deleteCarshopServiceById/${id}`, {
            method: 'DELETE', 
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
    };

    const handleClick = () => {
        navigate('/admin/carshopdetails/addservice');
    }


    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:44392/api/CarShop/getCarShop?parametar=${carShopId}`, { headers })
            .then(response => response.json())
            .then(data => setFormDataProfileInfo(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(()=>{
        fetch(`https://localhost:44392/api/CarShopService/getCarShopServiceByCarShopId?id=${carShopId}`, { headers })
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(()=>{
        fetch(`https://localhost:44392/api/Review/getReviewsByCarshopId/id?id=${carShopId}`, { headers })
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.log(error));
    }, []);

    const handleEditRequest = (serviceId) =>{
        console.log(serviceId)
        navigate('/admin/carshopdetails/editcarshopservice', { state: { serviceId: serviceId} });
    }

    return (
        <div>
            <div className="ProfileOverview">
                <div className="ToggleButtons">
                    <button
                        className={activeSection === 'overview' ? 'active' : ''}
                        onClick={() => handleToggle('overview')}
                    >
                        Informacije o profilu
                    </button>
                    <button
                        className={activeSection === 'services' ? 'active' : ''}
                        onClick={() => handleToggle('services')}
                    >
                        Usluge
                    </button>
                    <button
                        className={activeSection === 'reviews' ? 'active' : ''}
                        onClick={() => handleToggle('reviews')}
                    >
                        Recenzije
                    </button>
                </div>
                <div className="ProfileSections">
                    {activeSection === 'overview' && (
                        <>
                            <h2>Informacije o profilu</h2>
                            <div className="CarshopInfo">
                                <form onSubmit={handleSubmitProfileInfo}>
                                    <input
                                        type="text"
                                        name="shopName"
                                        value={formDataProfileInfo.shopName}//promjeniti nazive atributa i sl
                                        onChange={handleChangeProfileInfo}
                                        placeholder="Carshop Name"
                                    />
                                    <input
                                        type="text"
                                        name="shopAddress"
                                        value={formDataProfileInfo.shopAddress}//promjeniti
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
                                    <br></br>
                                    <textarea
                                        style={{width: '80%'}}
                                        placeholder='Carshop Descripton'
                                        value={formDataProfileInfo.carShopDescription}
                                        onChange={handleChangeProfileInfo}
                                    />
                                    <br></br>
                                    <input
                                        type='text'
                                        name='linkToImage'
                                        value={formDataProfileInfo.linkToImage}
                                        onChange={handleChangeProfileInfo}
                                        placeholder="Carshop image link"
                                    />
                                    <br></br>
                                    {/* Add additional input fields here */}
                                    {profileInfoChanges && (
                                        <button style={{ width: "80%", float: "left" }} type="submit">Submit</button>
                                    )}
                                </form>
                            </div>
                        </>
                    )}
                    {activeSection === 'services' && (
                        <>
                            <h2>Usluge</h2>
                            <div className="ServicesInfo">
                                <button onClick={()=>{handleClick()}}>Dodaj uslugu</button>
                                <hr></hr>
                                {services.map((service) => (
                                    <div key={service.id} className="service-item">
                                        <p style={{fontSize:"15px"}}>{service.serviceeName}</p>
                                        <p>{service.price}</p>
                                        <button onClick={()=> handleEditRequest(service.id)}>Uredi</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {activeSection === 'reviews' && (
                        //PasswordChange
                        <div className="ReviewsInfo">
                            <h2>Recenzije</h2>
                            {reviews.map((review) => (
                                <div key={review.id} className="review">
                                    <p>{review.username}</p>
                                    <p>{review.userMessage}</p>
                                    <p>Ocjena: {review.rating}</p>
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
