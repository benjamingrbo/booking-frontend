import React, { useState, useEffect } from 'react';
import './ShopOverview.css';
import Navbar from "./Navbar";

const ShopOverview = () => {
    const [shopDataa, setShopDataa] = useState({});
    const carShopId = 3;
    const [workingHoursArray, setWorkingHoursArray] = useState([]);
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [serviceId, setServiceId] = useState(null);
    const headers = { 'Authorization': localStorage.getItem("token") };
    

    useEffect(() => {
        fetch(`https://localhost:44392/api/CarShop/getCarshopDetails/id?id=${carShopId}`, { headers })
            .then(response => response.json())
            .then(data => {
                setShopDataa(data);
                setWorkingHoursArray(data.workingHours);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`https://localhost:44392/api/CarShopService/getCarShopServiceByCarShopId?id=${carShopId}`, { headers })
            .then(response => response.json())
            .then(data => {
                setServices(data);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`https://localhost:44392/api/Review/getReviewsByCarshopId/id?id=${carShopId}`, { headers })
            .then(response => response.json())
            .then(data => {
                setReviews(data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleOpenModal = (id) => {
        setServiceId(id);
    };


    const [showServices, setShowServices] = useState(true);
    const [showReviews, setShowReviews] = useState(true);

    const toggleServices = () => {
        setShowServices((prevState) => !prevState);
    };

    const toggleReviews = () => {
        setShowReviews((prevState) => !prevState);
    };

    return (
        <div>
            <Navbar />
            <div className="shop-overview">
                <img src={shopDataa.linkToImage} alt="Shop Logo" className="shop-logo" />
                <h1 className="shop-name">{shopDataa.shopName}</h1>
                <p className="shop-location">{shopDataa.shopAddress}, {shopDataa.cityName}</p>
                <div className="working-hours">
                    <h3>Working Hours:</h3>
                    <ul>
                        {workingHoursArray.map(workingHour => (
                            <li key={workingHour.dayOfWeek}>
                                {workingHour.dayOfWeek} : {workingHour.openingTime.hours.toString().padStart(2, '0')}:{workingHour.openingTime.minutes.toString().padStart(2, '0')} - {workingHour.closingTime.hours.toString().padStart(2, '0')}:{workingHour.closingTime.minutes.toString().padStart(2, '0')}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="shop-description">{shopDataa.carshopDescription}</p>
            </div>
            <div className="section">
                <h3 className="section-title" onClick={toggleServices}>
                    Services <i className={`fas ${showServices ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </h3>
                {showServices && (
                        <div className="services active">
                            <div className="service-container">
                                {services.map((service) => (
                                    <div key={service.id} className="service">
                                        <h4>{service.serviceeName}</h4>
                                        <p>{service.price}</p>
                                        <button className="store-details-button" onClick={() => handleOpenModal(service.id)}>Rezerviši</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </div>
            <div className="section">
                <h3 className="section-title" onClick={toggleReviews}>
                    Reviews <i className={`fas ${showReviews ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </h3>
                {showReviews && (
                    <div className="reviews active">
                        <div className="review-container">
                            {reviews.map((review) => (
                                <div key={review.id} className="review">
                                    <p>{review.username}</p>
                                    <p>{review.userMessage}</p>
                                    <p>Rating: {review.rating}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {serviceId && <Modal onClose={() => setServiceId(null)}  serviceId={serviceId}/>}
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

export default ShopOverview;
