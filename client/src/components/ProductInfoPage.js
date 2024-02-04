import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductInfo.css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useAuth0 } from '@auth0/auth0-react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const ProductDetails = () => {
    const location = useLocation();
    const { product } = location.state;
    const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleSubmit = async (e) => {
        console.log(isAuthenticated);
        e.preventDefault();
        const token = await getAccessTokenSilently();

        const data = {
            expirationDate: startDate,
            userEmail: user.email,
            nutriScore: product.nutriscore_grade,
            productName: product.product_name
        }

        console.log(data);

        const response = await fetch('http://127.0.0.1:5000/submit-form', { // Replace with your Flask API endpoint
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result); // Process your API response here
            alert('Product saved successfully');
            navigate('/dashboard');
        } else {
            alert('Failed to save the product');
        }
    };

    const chartData = {
        labels: ['Fat', 'Proteins', 'Carbohydrates'],
        datasets: [
            {
                label: 'Nutritional Values (g per serving)',
                data: [product.nutriments.fat, product.nutriments.proteins, product.nutriments.carbohydrates],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                // Correctly configure the x-axis as a category scale
                type: 'category', // This tells Chart.js that the x-axis is a category scale
            },
            y: {
                // Configuring the y-axis as a linear scale, typical for bar charts
                type: 'linear',
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='product-info-page'>
            <div className='product-info-box'>
                <h2 className='product-info'>{product.product_name}</h2>
                <form onSubmit={handleSubmit}>
                    <p>Category: {product.categories}</p>
                    <div className="product-specs">
                        <div>
                            <p>Nutritional score: {product.nutriscore_grade}</p>
                            <p>Ecoscore: {product.ecoscore_grade}</p>
                            <p>Serving size: {product.serving_size}</p>
                        </div>
                        <div>
                            <p>Fat amount: {product.nutrient_levels.fat}</p>
                            <p>Salt amount: {product.nutrient_levels.salt}</p>
                            <p>Sugar amount: {product.nutrient_levels.sugars}</p>
                        </div>
                    </div>
                    <div className='expiration-inpute'>
                        <label htmlFor="expiration">Expiration date:</label>
                        <DatePicker
                            showIcon
                            selected={startDate}
                            // value={formData.expirationDate}
                            onChange={(date) => setStartDate(date)}
                        />
                        {/* <input

                            className='form-control date-picker'
                            id="date"
                            name="date"
                            value={formData.expirationDate}
                            onChange={handleChange}
                        /> */}
                    </div>
                    <div style={{ width: '80vw', margin: '0', marginTop: '5vh', marginBottom: '3vh' }}>
                        <Bar data={chartData} options={options} />
                    </div>
                    <button className="action-btn" type="submit">Save on the shelf</button>
                </form>
            </div>

        </div >
    );
};

export default ProductDetails;
