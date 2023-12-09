import React, { useState, useEffect } from "react";
import './Appoitments.css'
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const headers = { 'Authorization': localStorage.getItem("token") };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = () => {
        fetch('https://localhost:44392/api/Booking/getBookingsByUserId/userId?userId=2', { headers })
            .then(response => response.json())
            .then(data => setAppointments(data))
            .catch(error => console.log(error));
    }

    // Filter appointments based on status
    const pendingAppointments = appointments.filter(appointment => appointment.appointmentStatus === 'Pending');
    const acceptedAppointments = appointments.filter(appointment => appointment.appointmentStatus === 'Accepted');
    const declinedAppointments = appointments.filter(appointment => appointment.appointmentStatus === 'Declined');
    const finishedAppointments = appointments.filter(appointment => appointment.appointmentStatus === 'Finished');

    // Helper function to render appointment items
    const renderAppointmentItems = appointmentList => {
        const handleCancelAppointment = appointmentId => {
            let updateObject = {
                appointmentId: appointmentId,
                status: "Finished"
            }
            console.log(`Cancel appointment with ID: ${appointmentId}`);

            fetch("https://localhost:44392/api/Booking/changeAppointmentStatus", {
                method: 'PATCH', // Use PATCH instead of POST
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token"),
                },
                body: JSON.stringify(updateObject)
            })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch((error) => console.log(error));

                setAppointments(appointments.map(appointment =>{
                    if(appointment.id === appointmentId){
                        return {...appointment, appointmentStatus: 'Finished'};
                    }
                    return appointment;
                }));
        };

        const handleLeaveFeedback = appointmentId => {
            // Handle redirecting to the feedback page for the appointment with the given ID
            console.log(`Redirect to leave feedback for appointment with ID: ${appointmentId}`);
            navigate('/customer/leavefeedback');
        };

        return appointmentList.map(appointment => (
            <div key={appointment.id} className="appointment-card">
                <div>{appointment.carLicencePlate}</div>
                <p>Servis: {appointment.shopName}</p>
                <p>Usluga: {appointment.serviceeName}</p>
                <p>Datum: {appointment.appointmentDate}</p>
                {appointment.appointmentStatus === 'Pending' && (
                    <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel</button>
                )}
                {appointment.appointmentStatus === 'Finished' && (
                    <button onClick={() => handleLeaveFeedback(appointment.id)} style={{width: '60%'}}>Leave Feedback</button>
                )}
            </div>
        ));
    };

    return (
        <div>
            <Navbar />
            <div className="appointments-page">
                <div className="section">
                    <h2>Termini na čekanju</h2>
                    <ul>{renderAppointmentItems(pendingAppointments)}</ul>
                </div>
                <div className="section">
                    <h2>Prihvaćeni termini</h2>
                    <ul>{renderAppointmentItems(acceptedAppointments)}</ul>
                </div>
                <div className="section">
                    <h2>Odbijeni termini</h2>
                    <ul>{renderAppointmentItems(declinedAppointments)}</ul>
                </div>
                <div className="section">
                    <h2>Završeni termini</h2>
                    <ul>{renderAppointmentItems(finishedAppointments)}</ul>
                </div>
            </div>
        </div>
    );
};

export default Appointments;