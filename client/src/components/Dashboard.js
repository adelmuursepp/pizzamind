import React from 'react';
import './Dashboard.css'; // Import the CSS for styling
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Pacifico:400']
    }
});


const Dashboard = ({ userName }) => {
    return (
        <div className="dashboard">
            <div className="user-info">
                <h2 className="h2-title">Dashboard</h2>
            </div>
            <div className='soon-expiring'>

            </div>
            <div className='data-visualization'>

            </div>
            <div className="actions">
                <button className="action-btn">Scan</button>
                <button className="action-btn">Upload Photo</button>
            </div>
        </div>
    );
};

export default Dashboard;
