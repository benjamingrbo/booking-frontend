import React, { useEffect, useState } from "react";
import "./DataFetcherComponent.css"
import Navbar from "./Navbar";

const DataFetcherComponent = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStore, setSelectedStore] = useState(null);

    const handleOpenModal = (store) => {
        setSelectedStore(store);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulating the API call with a delay
                setTimeout(() => {
                    const mockData = [
                        {
                            id: 1,
                            image: "https://res.cloudinary.com/intercars/image/upload/c_scale,w_800,f_auto,q_auto/v1656689763/workshops_prod2/lpdo7rod/lpdo7rod_image_0.jpg",
                            name: "Store 1",
                            address: "123 Street, City",
                            contact: "123-456-7890",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        },
                        {
                            id: 2,
                            image: "store2.jpg",
                            name: "Store 2",
                            address: "456 Street, City",
                            contact: "987-654-3210",
                            description: "Ut fringilla magna eu ante placerat, a rutrum lectus accumsan.",
                        },
                        // Add more store objects here...
                    ];
                    setData(mockData);
                    setIsLoading(false);
                }, 2000);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="data-list">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    data.map((store) => (
                        <div key={store.id} className="data-item">
                            <div className="store-image">
                                <img src={store.image} alt="Store" />
                            </div>
                            <div className="store-info">
                                <h3 className="store-name">{store.name}</h3>
                                <p className="store-address">{store.address}</p>
                                <p className="store-contact">{store.contact}</p>
                                <p className="store-description">{store.description}</p>
                            </div>
                            <button className="store-details-button" onClick={() => handleOpenModal(store)}>Open Details</button>
                        </div>
                    ))
                )}
            </div>
            {selectedStore && <Modal store={selectedStore} onClose={() => setSelectedStore(null)} />}
        </div>
    );
};

const Modal = ({ store, onClose }) => {
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
        asap: true,
        selectedDateTime: null,
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
            }));
        } else {
            setTermSelection((prevSelection) => ({
                ...prevSelection,
                selectedDateTime: value,
            }));
        }
    };

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
