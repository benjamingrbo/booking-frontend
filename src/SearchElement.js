import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './SearchElement.css';
import DataList from "./DataList";


const SearchElement = () => {
    const [dropdown1Value, setDropdown1Value] = useState('');
    const [dropdown2Value, setDropdown2Value] = useState('');

    const handleDropdown1Change = (event) => {
        setDropdown1Value(event.target.value);
    };

    const handleDropdown2Change = (event) => {
        setDropdown2Value(event.target.value);
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg',
        'path/to/image4.jpg',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [images.length]);


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
        // Perform your submit logic here
    };
    return (
        <div>
            <div
                style={{
                    height: '50vh',
                    backgroundColor: '#f1f1f1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                <h1>Pronađi pouzdani autoservis, provjeri cijene, recenzije i rezerviši termin online.</h1>
                <h6>Provjerite naš katalog autoservisa, pregledajte recenzije i rezervišite posjete u provjereno pouzdanim autoservisima.</h6>
                {/* <img
                src="path/to/background-image.jpg"
                alt="Background"
                style={{ width: '100%', height: 'auto' }}
            /> */}
                <form onSubmit={handleSubmit}>
                    <select value={dropdown1Value} onChange={handleDropdown1Change}>
                        <option value="">Select Option 1</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                    <select value={dropdown2Value} onChange={handleDropdown2Change}>
                        <option value="">Select Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div
                style={{
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: '30vh',
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

            <DataList data={data}/>

        </div>
    );
};

export default SearchElement;