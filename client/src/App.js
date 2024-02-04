import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import FileUploadNOCAM from './components/FileUploadNOCAM';
import ProductInfoPage from './components/ProductInfoPage';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomePage from './components/WelcomePage';
import FoodToDonate from './components/FoodToDonate';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';


function App() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('/api')
  //     .then(response => response.json())
  //     .then(data => setMessage(data.message));
  // }, []);
  console.log(window.location.origin)
  return (
    <Auth0Provider
      domain="dev-b5k0rhu0fupm5t8g.us.auth0.com"
      clientId="730YxqDwDeD6SlH58ypzMenCm6Lmt6Md"
      audience="pizzamind-backend"
      authorizationParams={{
        redirect_uri: "http://127.0.0.1:3000",
        // Include other authorization parameters if needed
        response_type: "code",
        // audience: "https://your-api-identifier", // Optional: Required if you are working with APIs
        scope: "openid profile email", // Adjust the scope according to your needs
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products-to-donate" element={<ProtectedRoute><FoodToDonate /></ProtectedRoute>} />
          <Route path="/takephoto" element={<ProtectedRoute><FileUpload /></ProtectedRoute>} />
          <Route path="/productinfo" element={<ProductInfoPage />} />
          <Route path="/upload" element={<FileUploadNOCAM />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>

  );
}

export default App;
