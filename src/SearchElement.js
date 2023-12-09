import React, { useState, useEffect } from "react";
import './SearchElement.css';
import DataList from "./DataList";

import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';



const SearchElement = () => {
    const [dropdown1Value, setDropdown1Value] = useState("");
    const [dropdown2Value, setDropdown2Value] = useState("");
    const navigate = useNavigate();
    const [dropdown1Data, setDropdown1Data] = useState([]);
    const [dropdown2Data, setDropdown2Data] = useState([]);
    const headers = { 'Authorization': localStorage.getItem("token") };

    const handleDropdown1Change = (event) => {
        console.log(event.target.value);
        setDropdown1Value(event.target.value);
    };

    const handleDropdown2Change = (event) => {
        console.log(event.target.value);
        setDropdown2Value(event.target.value);
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        'https://res.cloudinary.com/intercars/image/upload/q_auto,f_auto/v1656326726/Banners/BA/Motul/Motul-desktop.gif',
        'https://res.cloudinary.com/intercars/image/upload/q_auto,f_auto/v1656324480/Banners/BA/VARTA/VARTA-desktop.png',
        'https://res.cloudinary.com/intercars/image/upload/q_auto,f_auto/v1656331783/Banners/BA/Continental/Continental-desktop.jpg',
        'https://res.cloudinary.com/intercars/image/upload/q_auto,f_auto/v1656325491/Banners/BA/BOSCH/BOCH.jpg',
        'https://res.cloudinary.com/intercars/image/upload/q_auto,f_auto/v1656325268/Banners/BA/Meyle/Meyle-desktop.gif',
        'https://res.cloudinary.com/intercars/image/upload/q_auto,f_auto/v1656326492/Banners/BA/ZF/ZF.jpg',
        'https://res.cloudinary.com/intercars/image/upload/q_auto,f_auto/v1656325987/Banners/BA/ZF/ZF-desktop.jpg',
        'https://res.cloudinary.com/intercars/image/upload/q_auto,f_auto/v1690185872/Banners/BA/Mann/Mann_filter-desktop.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [images.length]);

    useEffect(() => {
        fetch('https://localhost:44392/api/City/getAllCities', { headers })
            .then(response => response.json())
            .then(data => setDropdown1Data(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch('https://localhost:44392/api/CarService/getAllCarServices', { headers })
            .then(response => response.json())
            .then(data => setDropdown2Data(data))
            .catch(error => console.log(error));
    }, []);


    const data = [
        {
            title: 'Item 1',
            description: 'This is the description for Item 1.',
        },
        {
            title: 'Item 2',
            description: 'This is the description for Item 2.',
        },
        {
            title: 'Item 3',
            description: 'This is the description for Item 3.',
        },
        {
            title: 'Item 4',
            description: 'This is the description for Item 4.',
        },
        {
            title: 'Item 5',
            description: 'This is the description for Item 4.',
        },
        {
            title: 'Item 6',
            description: 'This is the description for Item 4.',
        }
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Klikno si");
        navigate('/customer/carshops', { state: { cityId: dropdown1Value, serviceId: dropdown2Value } });
    };
    return (
        <>
            <div>
                <div
                    style={{
                        position: 'relative',
                        height: '60vh',
                        backgroundColor: '#f1f1f1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <h1>Pronađi pouzdani autoservis, provjeri cijene, recenzije i rezerviši termin online.</h1>
                    <h6>Provjerite naš katalog autoservisa, pregledajte recenzije i rezervišite posjete u provjereno pouzdanim autoservisima.</h6>
                    <form onSubmit={handleSubmit} id="optionSubmit">
                        <select value={dropdown1Value} onChange={handleDropdown1Change}>
                            <option value="" disabled selected>Označite grad</option>
                            {dropdown1Data.map(city => (
                                <option key={city.id} value={city.id}>{city.cityName}</option>
                            ))}
                        </select>
                        <select value={dropdown2Value} onChange={handleDropdown2Change}>
                            <option value="" disabled selected>Označite uslugu</option>
                            {dropdown2Data.map(service => (
                                <option key={service.id} value={service.id}>{service.serviceeName}</option>
                            ))}
                        </select>
                        <hr></hr>
                        <button type="submit" disabled={dropdown1Value === "" || dropdown2Value === ""}>Submit</button>
                    </form>
                </div>

                <div
                    style={{
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: 'auto',
                        backgroundColor: '#f1f1f1',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '3%'
                    }}
                >
                    <img
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>

                <DataList data={data} />

            </div>
        </>
    );
};

export default SearchElement;