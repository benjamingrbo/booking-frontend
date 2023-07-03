import React, { useState } from 'react';
import './AppoitmentsRequests.css'; // Import the CSS file
import Navbar from './Navbar';

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Doe', status: 'pending' },
    { id: 2, name: 'Jane Smith', status: 'pending' },
    { id: 3, name: 'Bob Johnson', status: 'accepted' },
    { id: 4, name: 'Alice Brown', status: 'declined' },
    { id: 5, name: 'Tom Wilson', status: 'finished' },
  ]);

  const handleAccept = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: 'accepted' } : request
      )
    );
  };

  const handleDecline = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: 'declined' } : request
      )
    );
  };

  const handleFinish = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: 'finished' } : request
      )
    );
  };

  const renderRequestItem = (request) => (
    <li key={request.id}>
      {request.name} - {request.status}
      {request.status === 'pending' && (
        <>
          <button onClick={() => handleAccept(request.id)}>Accept</button>
          <button onClick={() => handleDecline(request.id)}>Decline</button>
        </>
      )}
      {request.status === 'accepted' && (
        <button onClick={() => handleFinish(request.id)}>Finish</button>
      )}
    </li>
  );

  const pendingRequests = requests.filter((request) => request.status === 'pending');
  const acceptedRequests = requests.filter((request) => request.status === 'accepted');
  const declinedRequests = requests.filter((request) => request.status === 'declined');
  const finishedRequests = requests.filter((request) => request.status === 'finished');

  return (
    <div>
      <h2 id="pending-requests-heading">Pending Requests</h2>
      {pendingRequests.length > 0 ? (
        <ul id="pending-requests-list">{pendingRequests.map(renderRequestItem)}</ul>
      ) : (
        <p>No pending requests.</p>
      )}

      <h2 id="accepted-requests-heading">Accepted Requests</h2>
      {acceptedRequests.length > 0 ? (
        <ul id="accepted-requests-list">{acceptedRequests.map(renderRequestItem)}</ul>
      ) : (
        <p>No accepted requests.</p>
      )}

      <h2 id="declined-requests-heading">Declined Requests</h2>
      {declinedRequests.length > 0 ? (
        <ul id="declined-requests-list">{declinedRequests.map(renderRequestItem)}</ul>
      ) : (
        <p>No declined requests.</p>
      )}

      <h2 id="finished-requests-heading">Finished Requests</h2>
      {finishedRequests.length > 0 ? (
        <ul id="finished-requests-list">{finishedRequests.map(renderRequestItem)}</ul>
      ) : (
        <p>No finished requests.</p>
      )}
    </div>
  );
};

export default AppointmentRequests;
