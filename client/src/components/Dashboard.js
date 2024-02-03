import React from 'react';
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
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    const navigate = useNavigate();

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
