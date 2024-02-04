import React from 'react';
import './WelcomePage.css'; // Import the CSS for styling
import WebFont from 'webfontloader';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

WebFont.load({
    google: {
        families: ['Pacifico:400']
    }
});


const LogoutPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth0();
    return (
        <div className="welcomepage">
            <div className='welcome-box'>
                <div className="welcome-info">
                    <h2 className="h2-title">PizzaMind</h2>
                    <p className='intro-sentence'>Are you sure you want to log out?</p>
                </div>
                <div className="actions">
                    <button className="action-btn" onClick={() => navigate("/dashboard")}>No, go back</button>
                    <button className="action-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Yes, log me out</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutPage;
