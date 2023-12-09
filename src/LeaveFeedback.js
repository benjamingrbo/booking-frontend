import React, { useState, useEffect } from "react";
import './LeaveFeedback.css'
import Navbar from "./Navbar";

const LeaveFeedback = () => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [review, setReview] = useState({
        customerId: 2,
        carshopId: 3,
        rating: 0,
        userMessage: ''
    })

    const handleRatingChange = (e) => {
        let newRating = parseInt(e.target.value);

        setReview((prevReview) => ({
            ...prevReview,
            rating: newRating,
        }))
    };

    const handleMessageChange = (e) => {
        let message = e.target.value;

        setReview((prevReview) => ({
            ...prevReview,
            userMessage: message,
        }))
    };

    const handleSubmit = () => {

        console.log(review);

        fetch('https://localhost:44392/api/Review/leaveReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
                
            },
            body: JSON.stringify(review),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Feedback submitted successfully!');
                    setRating(0);
                    setMessage('');
                } else {
                    console.error('Failed to submit feedback');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="feedback-container">
                <div className="feedback-box">
                    <h1>Car Shop Feedback</h1>
                    <div>
                        <label>Rate the car shop (1-5):</label>
                        <select value={review.message} onChange={handleRatingChange}>
                            <option value="0">Select rating</option>
                            <option value="1">1 - Terrible</option>
                            <option value="2">2 - Poor</option>
                            <option value="3">3 - Average</option>
                            <option value="4">4 - Good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                    </div>
                    <div>
                        <label>Leave a short message:</label>
                        <textarea
                            value={review.userMessage}
                            onChange={handleMessageChange}
                            placeholder="Your feedback..."
                        ></textarea>
                    </div>
                    <button onClick={handleSubmit} disabled={review.userMessage === '' || review.rating === 0}>Submit Feedback</button>
                </div>
            </div>
        </>
    );
}

export default LeaveFeedback;
