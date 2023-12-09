import React, { useState } from "react";
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var inputObject = {
      userName: username,
      password: password
    }

    console.log(inputObject);

    fetch('https://localhost:44392/api/Login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputObject),
    })
      .then(response => {
        if (response.ok) {
          console.log('Login successful');
          return response.json(); // Parse the response body as JSON
        } else if (response.status === 404) {
          console.log('User not found');
          throw new Error('User not found');
        } else {
          console.log('Login failed');
          throw new Error('Login failed');
        }
      })
      .then(responseData => {
        localStorage.setItem("token", "Bearer " + responseData.token);
        handleSuccessfulLogin();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSuccessfulLogin = () => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwtToken(token);
    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("userId", userId)
    navigate('/');
    window.location.reload();
  };

  const parseJwtToken = (token) => {
    const decoded = jwt_decode(token);
    console.log(decoded);
    return decoded;
  };

  return (
    <div id="login-form-wrap">
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <p>
          <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={handleUsernameChange} required />
        </p>
        <p>
          <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
        </p>
        <p>
          <input type="submit" id="login" value="Login" />
        </p>
        <br />
      </form>
    </div>
  );
};

export default LoginPage;
