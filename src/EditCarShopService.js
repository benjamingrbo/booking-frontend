import React, { useEffect, useState } from 'react';

const EditCarShopService = ({ serviceId }) => {
    const [service, setService] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [price, setPrice] = useState('');
    const [moreInformation, setMoreInformation] = useState('');

    useEffect(() => {
        // Simulating API call to fetch service details
        fetchServiceDetails(serviceId)
            .then((response) => {
                setService(response);
                setSelectedCategory(response.category);
                setPrice(response.price);
                setMoreInformation(response.moreInformation);
            })
            .catch((error) => {
                console.error('Error fetching service details:', error);
            });
    }, [serviceId]);

    const fetchServiceDetails = (id) => {
        // Replace this with your actual API call to fetch service details based on the ID
        return new Promise((resolve, reject) => {
            // Simulating API response delay
            setTimeout(() => {
                const mockService = {
                    id: id,
                    category: 'Maintenance',
                    price: 100,
                    moreInformation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                };
                resolve(mockService);
            }, 500);
        });
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleMoreInformationChange = (event) => {
        setMoreInformation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your submit logic here, e.g., API call
        console.log('Updated Service:', {
            id: service.id,
            category: selectedCategory,
            price: price,
            moreInformation: moreInformation,
        });
    };

    if (!service) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Select a category</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Repairs">Repairs</option>
                        <option value="Inspections">Inspections</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="text" id="price" value={price} onChange={handlePriceChange} />
                </div>
                <div>
                    <label htmlFor="moreInformation">More Information:</label>
                    <textarea id="moreInformation" value={moreInformation} onChange={handleMoreInformationChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditCarShopService;
