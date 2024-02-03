import React from 'react';
import { useLocation } from 'react-router-dom';
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



    const chartData = {
        labels: ['Fat', 'Proteins', 'Carbohydrates'],
        datasets: [
            {
                label: 'Nutritional Values (g per 100g)',
                data: [product.nutriments.fat, product.nutriments.proteins, product.nutriments.carbohydrates],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
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
        <div>
            <h1>{product.product_name}</h1>
            <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default ProductDetails;
