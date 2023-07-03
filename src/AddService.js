import React, { useState } from "react";
import './Addservice.css';

const categories = ['Maintenance', 'Repairs', 'Inspections'];

const AddService = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [price, setPrice] = useState('');
    const [moreInformation, setMoreInformation] = useState('');

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
        console.log('Category:', selectedCategory);
        console.log('Price:', price);
        console.log('More Information:', moreInformation);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddService;