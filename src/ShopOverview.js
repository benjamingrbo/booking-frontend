import React, { useState } from 'react';
import './ShopOverview.css';
import Navbar from "./Navbar";

const ShopOverview = () => {
    const shopData = {
        logo: 'path/to/logo.png',
        name: 'Example Shop',
        location: 'Example Location',
        workingHours: {
            Monday: '9:00 AM - 6:00 PM',
            Tuesday: '9:00 AM - 6:00 PM',
            Wednesday: '9:00 AM - 6:00 PM',
            Thursday: '9:00 AM - 6:00 PM',
            Friday: '9:00 AM - 6:00 PM',
            Saturday: '10:00 AM - 4:00 PM',
            Sunday: 'Closed',
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipisciadsdsadsadsadsadsadsadsaadsng elit. Nulla sed urna risus. Donec maximus dignissim nulla, sed auctor nisl semper sit amet.',
    };

    const services = [
        { id: 1, name: 'Service 1', description: 'Description 1', price: '$10', reserveLink: 'reserve-link-for-service-1' },
        { id: 2, name: 'Service 2', description: 'Description 2', price: '$15', reserveLink: 'reserve-link-for-service-2' },
        { id: 3, name: 'Service 3', description: 'Description 3', price: '$20', reserveLink: 'reserve-link-for-service-3' },
        { id: 4, name: 'Service 4', description: 'Description 4', price: '$25', reserveLink: 'reserve-link-for-service-4' },
        { id: 5, name: 'Service 5', description: 'Description 5', price: '$30', reserveLink: 'reserve-link-for-service-5' },
        { id: 6, name: 'Service 6', description: 'Description 6', price: '$35', reserveLink: 'reserve-link-for-service-6' },
    ];

    const reviews = [
        { id: 1, user: 'User 1', comment: 'Great service!', rating: 5 },
        { id: 2, user: 'User 2', comment: 'Highly recommended.', rating: 4 },
        { id: 3, user: 'User 3', comment: 'Friendly staff.', rating: 5 },
        { id: 4, user: 'User 3', comment: 'Friendly staff.', rating: 5 },
        { id: 5, user: 'User 3', comment: 'Friendly staff.', rating: 5 }
    ];

    const [showServices, setShowServices] = useState(true);
    const [showReviews, setShowReviews] = useState(true);

    const toggleServices = () => {
        setShowServices((prevState) => !prevState);
    };

    const toggleReviews = () => {
        setShowReviews((prevState) => !prevState);
    };

    return (
        <div>
            <Navbar/>
            <div className="shop-overview">
                <img src={shopData.logo} alt="Shop Logo" className="shop-logo" />
                <h1 className="shop-name">{shopData.name}</h1>
                <p className="shop-location">{shopData.location}</p>
                <div className="working-hours">
                    <h3>Working Hours:</h3>
                    <ul>
                        {Object.entries(shopData.workingHours).map(([day, hours]) => (
                            <li key={day}>
                                <span>{day}:</span>
                                <span>{hours}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="shop-description">{shopData.description}</p>
            </div>
            <div className="section">
                    <h3 className="section-title" onClick={toggleServices}>
                        Services <i className={`fas ${showServices ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </h3>
                    {showServices && (
                        <div className="services active">
                            <div className="service-container">
                                {services.map((service) => (
                                    <div key={service.id} className="service">
                                        <h4>{service.name}</h4>
                                        <p>{service.description}</p>
                                        <p>{service.price}</p>
                                        <a href={service.reserveLink}>Reserve</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="section">
                    <h3 className="section-title" onClick={toggleReviews}>
                        Reviews <i className={`fas ${showReviews ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </h3>
                    {showReviews && (
                        <div className="reviews active">
                            <div className="review-container">
                                {reviews.map((review) => (
                                    <div key={review.id} className="review">
                                        <p>{review.user}</p>
                                        <p>{review.comment}</p>
                                        <p>Rating: {review.rating}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
        </div>
    );
};

export default ShopOverview;
