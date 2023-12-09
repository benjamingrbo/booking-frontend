import React, { useState, useEffect } from "react";
import './Appoitments.css'
import Navbar from "./Navbar";

const AppointmentRequests = () => {
    const [appointments, setAppointments] = useState([]);
    const headers = { 'Authorization': localStorage.getItem("token") };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = () => {
        fetch('https://localhost:44392/api/Booking/getBookingsByCarshopId/carshopId?carshopId=3', { headers })
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
        
        const updateStatus = (appointmentId, newAppointmentStatus) =>{
            setAppointments(appointments.map(appointment =>{
                if(appointment.id === appointmentId){
                    return {...appointment, appointmentStatus: newAppointmentStatus};
                }
                return appointment;
            }));

            let updateObject = {
                appointmentId: appointmentId,
                status: newAppointmentStatus
            }

            fetch("https://localhost:44392/api/Booking/changeAppointmentStatus", {
                method: 'PATCH', // Use PATCH instead of POST
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateObject)
            })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch((error) => console.log(error));
        }

        return appointmentList.map(appointment => (
            <div key={appointment.id} className="appointment-card">
                <p>{appointment.serviceeName}</p>
                <hr></hr>
                <p>{appointment.carMake}</p>
                <p>{appointment.carModel}</p>
                <p>{appointment.carYear}</p>
                <p>{appointment.carColor}</p>
                <p style={{fontSize:"18px"}}>{appointment.carVin}</p>
                <p>{appointment.carLicencePlate}</p>
                <hr></hr>
                <p>Date: {appointment.appointmentDate}</p>
                {appointment.appointmentStatus === 'Pending' && (
                  <>
                    <button onClick={() => updateStatus(appointment.id, "Accepted")}>Prihvati</button>
                    <button onClick={() => updateStatus(appointment.id, "Declined")}>Odbij</button>
                  </>
                )}
                {appointment.appointmentStatus === 'Accepted' && (
                    <button onClick={() => updateStatus(appointment.id, "Finished")}>Finish</button>
                )}
            </div>
        ));
    };

    return (
        <div>
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

export default AppointmentRequests;