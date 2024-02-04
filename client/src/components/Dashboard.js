import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the CSS for styling
import WebFont from 'webfontloader';
import Header from './Header';
import Footer from './Footer';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Map from './Map'

WebFont.load({
    google: {
        families: ['Pacifico:400']
    }
});


const Dashboard = () => {
    const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const formatDateToDDMMYYYY = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        const fetchProducts = async () => {

            if (isAuthenticated && user?.email) {
                try {
                    const token = await getAccessTokenSilently();
                    const response = await fetch(`http://127.0.0.1:5000/get-products?email=${encodeURIComponent(user.email)}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log(data);
                    setProducts(data);
                } catch (error) {
                    console.error("There was an error fetching the products: ", error);
                }
            }
        };

        fetchProducts();
    }, [isAuthenticated, user?.email, getAccessTokenSilently]);

    const handleSaveProduct = async (product) => {
        if (isAuthenticated && user?.email) {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch('http://127.0.0.1:5000/save-product', {
                    method: 'POST',
                    // mode: 'no-cors',
                    body: JSON.stringify(product),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Product saved:', data);
                    alert('Product saved successfully!');
                } else {
                    console.error('Failed to save product');
                    alert('Failed to save product');
                }
            } catch (error) {
                console.error('Error saving product:', error);
                alert('Error saving product');
            }
        }
    };

    return (
        <div className="dashboard">
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect()}>
                    Log In
                </button>
            )}
            {isAuthenticated && (
                <>
                    {/* <div className="dashboard"> */}

                    <div>
                        <Header />
                    </div>
                    <div className="user-info">
                        <h1 className="h1-title">Hello, {user.name}!</h1>
                        <p></p>
                    </div>
                    <div className='soon-expiring'>
                        <h4>Soon to expire products</h4>
                        <ul className="list-group">
                            {products.map((product, index) => (

                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="my-0">{product.product_name}</h6>
                                        <small className="text-muted">Expiration Date: {formatDateToDDMMYYYY(product.expiration_date)}</small>
                                    </div>
                                    <button className=" to-donate" onClick={() => handleSaveProduct(product)}>Mark for Donation</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Map />
                    {/* <div className='data-visualization'>

                    </div> */}
                    <div className="actions">
                        <button className="action-btn" onClick={() => navigate("/takephoto")}>Scan</button>
                        <button className="action-btn" onClick={() => navigate("/upload")}>Upload Photo</button>
                    </div>
                    {/* </div> */}
                    {/* <button onClick={() => logout({ returnTo: "/" })}>
                        Log Out
                    </button> */}
                    <div>
                        <Footer />
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
