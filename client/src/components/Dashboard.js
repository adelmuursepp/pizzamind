import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the CSS for styling
import WebFont from 'webfontloader';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

WebFont.load({
    google: {
        families: ['Pacifico:400']
    }
});


const Dashboard = () => {
    const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

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
                    <div className="user-info">
                        <h2 className="h2-title">Dashboard</h2>
                        <p>{user.name}</p>
                    </div>
                    <div className='soon-expiring'>
                        {products.map((product, index) => (
                            <div key={index}>
                                <h3>{product.name}</h3> {/* Adjust according to your product structure */}
                                <p></p>
                                <p>Expiration Date: {product.expiration_date}</p> {/* Example field */}
                            </div>
                        ))}
                    </div>
                    <div className='data-visualization'>

                    </div>
                    <div className="actions">
                        <button className="action-btn" onClick={() => navigate("/takephoto")}>Scan</button>
                        <button className="action-btn" onClick={() => navigate("/upload")}>Upload Photo</button>
                    </div>
                    {/* </div> */}
                    {/* <button onClick={() => logout({ returnTo: "/" })}>
                        Log Out
                    </button> */}
                </>
            )}
        </div>
    );
};

export default Dashboard;
