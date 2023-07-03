import React, { useState } from "react";
import './Appoitments.css'
import Navbar from "./Navbar";

const Appointments = () => {
    const appointments = [
        { id: 1, status: 'pending', date: '2023-06-26', time: '10:00 AM', customer: 'John Doe' },
        { id: 2, status: 'accepted', date: '2023-06-27', time: '2:00 PM', customer: 'Jane Smith' },
        { id: 3, status: 'declined', date: '2023-06-28', time: '4:30 PM', customer: 'Alex Johnson' },
        { id: 4, status: 'finished', date: '2023-06-29', time: '9:00 AM', customer: 'Emily Brown' },
        { id: 5, status: 'finished', date: '2023-06-29', time: '9:00 AM', customer: 'Emily Brown' }
        // ... add more appointments
    ];

    // Filter appointments based on status
    const pendingAppointments = appointments.filter(appointment => appointment.status === 'pending');
    const acceptedAppointments = appointments.filter(appointment => appointment.status === 'accepted');
    const declinedAppointments = appointments.filter(appointment => appointment.status === 'declined');
    const finishedAppointments = appointments.filter(appointment => appointment.status === 'finished');

    // Helper function to render appointment items
    const renderAppointmentItems = appointmentList => {
        const handleCancelAppointment = appointmentId => {
            // Handle canceling the appointment with the given ID
            console.log(`Cancel appointment with ID: ${appointmentId}`);
        };

        const handleLeaveFeedback = appointmentId => {
            // Handle redirecting to the feedback page for the appointment with the given ID
            console.log(`Redirect to leave feedback for appointment with ID: ${appointmentId}`);
        };

        return appointmentList.map(appointment => (
            <li key={appointment.id}>
                <span>{appointment.customer}</span>
                <span>Date: {appointment.date}</span>
                <span>Time: {appointment.time}</span>
                {appointment.status === 'pending' && (
                    <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel</button>
                )}
                {appointment.status === 'finished' && (
                    <button onClick={() => handleLeaveFeedback(appointment.id)}>Leave Feedback</button>
                )}
            </li>
        ));
    };

    return (
        <div>
            <Navbar/>
            <div className="appointments-page">
                <div className="section">
                    <h2>Pending Appointments</h2>
                    <ul>{renderAppointmentItems(pendingAppointments)}</ul>
                </div>
                <div className="section">
                    <h2>Accepted Appointments</h2>
                    <ul>{renderAppointmentItems(acceptedAppointments)}</ul>
                </div>
                <div className="section">
                    <h2>Declined Appointments</h2>
                    <ul>{renderAppointmentItems(declinedAppointments)}</ul>
                </div>
                <div className="section">
                    <h2>Finished Appointments</h2>
                    <ul>{renderAppointmentItems(finishedAppointments)}</ul>
                </div>
            </div>
        </div>
    );
};

export default Appointments;