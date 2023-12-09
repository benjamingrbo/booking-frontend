import React, { useEffect, useState } from "react";
import './Addservice.css';


const AddService = () => {

    const[services, setServices] = useState([]);
    const[newService, setNewService] = useState({
        carshopId: 3,
        serviceId: 0,
        price: "",
        moreInformation: ""
    })
    const headers = { 'Authorization': localStorage.getItem("token") };

    useEffect(()=>{
        fetch('https://localhost:44392/api/CarService/getAllCarServices', { headers })
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (event) =>{
        let {name, value} = event.target;
        if(name === "serviceId"){
            value = parseInt(value);
        }
        setNewService((prevNewService) => ({
            ...prevNewService,
            [name]: value,
        }))

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your submit logic here, e.g., API call
        console.log(newService);
        fetch("https://localhost:44392/api/CarShopService/saveCarShopService", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token"),
              
            },
            body: JSON.stringify(newService)
          })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error));
    };

    return (
        <>
        <div className="addServiceContainer">
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="serviceId">Usluga</label>
                    <hr></hr>
                    <select id="category" value={newService.serviceId} onChange={handleChange} name="serviceId">
                        <option value="">Izaberite uslugu</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.serviceeName}
                            </option>
                        ))}
                    </select>
                </div>
                <br></br>
                <br></br>
                <div>
                    <label htmlFor="price">Cijena</label>
                    <hr></hr>
                    <input type="text" id="price" value={newService.price} onChange={handleChange} name="price" placeholder="20 KM"/> 
                </div>
                <br></br>
                <br></br>
                <div>
                    <label htmlFor="moreInformation">Više informacija</label>
                    <hr></hr>
                    <textarea id="moreInformation" value={newService.moreInformation} onChange={handleChange} name="moreInformation"/>
                </div>
                <br></br>
                <br></br>
                <button 
                type="submit" 
                disabled={newService.serviceId === 0 || newService.moreInformation === "" || newService.price === ""}>
                    Submit
                </button>
            </form>
        </div>
        </>
    );
};

export default AddService;