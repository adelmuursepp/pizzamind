import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import ProductInfoPage from './components/ProductInfoPage';
import Dashboard from './components/Dashboard';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/takephoto" element={<FileUpload />} />
        <Route path="/productinfo" element={<ProductInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
