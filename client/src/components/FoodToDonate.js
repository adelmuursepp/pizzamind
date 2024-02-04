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


const FoodToDonate = () => {
    const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {

            if (isAuthenticated && user?.email) {
                try {
                    const token = await getAccessTokenSilently();
                    const response = await fetch(`http://127.0.0.1:5000/get-products-to-donate`, {
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

                    <div>
                        <Header />
                    </div>
                    <div className="user-info">
                        <h2 className="h2-title">Food Available for Donation</h2>
                    </div>
                    <div className='soon-expiring'>
                        <ul className="list-group">
                            {products.map((product, index) => (

                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="my-0">{product.product_name}</h6>
                                        <small className="text-muted">Expiration Date: {product.expiration_date}</small>
                                    </div>
                                    <button className=" to-donate" >Claim Product</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* <div className='data-visualization'>

                    </div> */}
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

export default FoodToDonate;
