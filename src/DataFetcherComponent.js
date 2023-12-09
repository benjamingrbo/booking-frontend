import React, { useEffect, useState } from "react";
import "./DataFetcherComponent.css"
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';

const DataFetcherComponent = () => {
    const [data, setData] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const { state } = useLocation();
    const { cityId, serviceId } = state;
    const navigate = useNavigate();
    const headers = { 'Authorization': localStorage.getItem("token") };

    const handleOpenModal = (store) => {
        setSelectedStore(store);
    };

    useEffect(() => {
        fetch(`https://localhost:44392/api/CarShop/getCarShopsByCityIdOrServiceId/${cityId}/${serviceId}`, { headers })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    const handleStorenameClick = (id) => {
        navigate('/customer/carshop', {state : {carshopId: id}});
    }

    return (
        <div>
            <Navbar />
            <div className="data-list">
                {
                    data.map((store) => (
                        <div key={store.id} className="data-item">
                            <div className="store-image">
                                <img src={store.linkToImage} alt="Store" />
                            </div>
                            <div className="store-info">
                                <h3 className="store-name" onClick={() => {handleStorenameClick(store.id)}}>{store.shopName}</h3>
                                <p className="store-address">{store.shopAddress}</p>
                                <p className="store-contact">{store.contactNumbert}</p>
                                <p style={{fontSize: 12}} id="store-description">{store.carShopDescription}</p>
                                <hr></hr>
                                <p style={{fontSize: 15}}>{store.moreInformation}</p>
                                <p style={{fontSize: 20}}>{store.price}</p>
                            </div>
                            <button className="store-details-button" onClick={() => handleOpenModal(store)}>Rezerviši</button>
                        </div>
                    ))
                }
            </div>
            {selectedStore && <Modal store={selectedStore} onClose={() => setSelectedStore(null)}  serviceId={serviceId}/>}
        </div>
    );
};

const Modal = ({ store, onClose, serviceId }) => {
    const [step, setStep] = useState(1);
    const [vehicleData, setVehicleData] = useState({
        make: '',
        model: '',
        year: '',
        color: '',
        licensePlate: '',
        vin: '',
    });
    const [termSelection, setTermSelection] = useState({
        asap: false,
        selectedDateTime: '0000-00-00T00:00',
    });

    const handleVehicleDataChange = (e) => {
        const { name, value } = e.target;
        setVehicleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTermSelectionChange = (e) => {
        const { name, value } = e.target;
        if (name === 'asap') {
            setTermSelection((prevSelection) => ({
                ...prevSelection,
                asap: value === 'true',
                selectedDateTime: '0000-00-00T00:00',
            }));
        } else {
            setTermSelection((prevSelection) => ({
                ...prevSelection,
                selectedDateTime: value,
            }));
        }
    };

    const submitBooking = () => {
        let booking = {
            customerId: 2,
            carLicencePlate: vehicleData.licensePlate,
            carShopServiceId: parseInt(serviceId),
            appointmentDate: termSelection.selectedDateTime,
            appointmentStatus: "Pending",
            carMake: vehicleData.make,
            carModel: vehicleData.model,
            carYear: parseInt(vehicleData.year),
            carColor: vehicleData.color,
            carVin: vehicleData.vin
        }

        console.log(booking);

        fetch("https://localhost:44392/api/Booking/saveBooking", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token"),
            },
            body: JSON.stringify(booking)
          })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error));
    }

    const handleNextStep = () => {
        if (step === 1) {
            const { make, model, year, color, licensePlate, vin } = vehicleData;
            if (make && model && year && color && licensePlate && vin) {
                setStep((prevStep) => prevStep + 1);
            } else {
                // Show error message or handle invalid data in step 1
            }
        } else if (step === 2) {
            const { asap, selectedDateTime } = termSelection;
            if (asap || selectedDateTime) {
                setStep((prevStep) => prevStep + 1);
            } else {
                // Show error message or handle invalid data in step 2
            }
        } else if (step === 3) {
            // Handle data submission to backend
            submitBooking();
            // Reset form and close modal
            setVehicleData({
                make: '',
                model: '',
                year: '',
                color: '',
                licensePlate: '',
                vin: '',
            });
            setTermSelection({
                asap: true,
                selectedDateTime: null,
            });
            setStep(1);
            onClose();
        }
    };

    const handleCancel = () => {
        setVehicleData({
            make: "",
            model: "",
            year: "",
            color: "",
            licensePlate: "",
            vin: "",
        });
        setTermSelection({
            asap: true,
            selectedDateTime: null,
        });
        setStep(1);
        onClose();
    };


    return (
        <div className="modal">
            <div className="modal-content">
                {step === 1 && (
                    <div>
                        <h2>Step 1: Vehicle Data</h2>
                        <input type="text" name="make" placeholder="Make" value={vehicleData.make} onChange={handleVehicleDataChange} />
                        <input type="text" name="model" placeholder="Model" value={vehicleData.model} onChange={handleVehicleDataChange} />
                        <input type="text" name="year" placeholder="Year" value={vehicleData.year} onChange={handleVehicleDataChange} />
                        <input type="text" name="color" placeholder="Color" value={vehicleData.color} onChange={handleVehicleDataChange} />
                        <input type="text" name="licensePlate" placeholder="License Plate" value={vehicleData.licensePlate} onChange={handleVehicleDataChange} />
                        <input type="text" name="vin" placeholder="VIN" value={vehicleData.vin} onChange={handleVehicleDataChange} />
                        <button onClick={handleNextStep}>Next</button>
                        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2>Step 2: Term Selection</h2>
                        <label>
                            <input type="radio" name="asap" value="true" checked={termSelection.asap} onChange={handleTermSelectionChange} />
                            ASAP
                        </label>
                        <label>
                            <input type="radio" name="asap" value="false" checked={!termSelection.asap} onChange={handleTermSelectionChange} />
                            Select Date and Time
                        </label>
                        {!termSelection.asap && (
                            <input type="datetime-local" name="selectedDateTime" value={termSelection.selectedDateTime} onChange={handleTermSelectionChange} />
                        )}
                        <button onClick={handleNextStep}>Next</button>
                        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2>Step 3: Data Submission</h2>
                        <p>Make: {vehicleData.make}</p>
                        <p>Model: {vehicleData.model}</p>
                        <p>Year: {vehicleData.year}</p>
                        <p>Color: {vehicleData.color}</p>
                        <p>License Plate: {vehicleData.licensePlate}</p>
                        <p>VIN: {vehicleData.vin}</p>
                        <p>ASAP: {termSelection.asap.toString()}</p>
                        {termSelection.selectedDateTime && <p>Selected Date and Time: {termSelection.selectedDateTime}</p>}
                        <button onClick={handleNextStep}>Submit</button>
                        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataFetcherComponent;
