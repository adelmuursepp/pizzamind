import React from 'react';
import './WelcomePage.css'; // Import the CSS for styling
import WebFont from 'webfontloader';
import { useNavigate } from 'react-router-dom';

WebFont.load({
    google: {
        families: ['Pacifico:400']
    }
});


const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="welcomepage">
            <div className='welcome-box'>
                <div className="welcome-info">
                    <h2 className="h2-title"> 🍕 PizzaMind </h2>
                    <p className='intro-sentence'>Stay healthy, save money, and have some pizza mind </p>
                </div>
                <div className="actions">
                    <button className="action-btn" onClick={() => navigate("/dashboard")}>Log In / Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
