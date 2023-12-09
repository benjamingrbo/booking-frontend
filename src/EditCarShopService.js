import React, { useEffect, useState } from 'react';
import './EditCarShopService.css'
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';

const EditCarShopService = () => {
    const [data, setData] = useState({});
    const [price, setPrice] = useState('');
    const [moreInformation, setMoreInformation] = useState('');
    const { state } = useLocation();
    const { serviceId } = state;
    const headers = { 'Authorization': localStorage.getItem("token") };

    useEffect(() => {
        fetch(`https://localhost:44392/api/CarShopService/getCarShopService?parametar=${serviceId}`, { headers })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);


    const handleChange = (event) => {
        const {name, value} = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your submit logic here, e.g., API call

        fetch(`https://localhost:44392/api/CarShopService/changeCarShopService/${serviceId}`, {
            method: 'PUT', // Use PATCH instead of POST
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
                
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error));
    };


    return (
        <div className="editServiceContainer">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="price">Cijena</label>
                    <hr></hr>
                    <input
                        type="text"
                        id="price"
                        name='price'
                        value={data.price}
                        onChange={handleChange} />
                </div>
                <br></br>
                <br></br>
                <div>
                    <label htmlFor="moreInformation">Više informacija</label>
                    <hr></hr>
                    <textarea
                        id="moreInformation"
                        name='moreInformation'
                        value={data.moreInformation}
                        onChange={handleChange} />
                </div>
                <br></br>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditCarShopService;
