import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './FileUploadNOCAM.css';

function FileUpload() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Successfully saved the file');
                navigate('/productinfo', { state: { product: data.product } });
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                alert('Error uploading file');
            });
    };

    return (
        <div>
            <Header />
            <div className='upload-file-box'>
                <h2>Upload a File</h2>
                <form onSubmit={handleFileUpload}>
                    <input type="file" onChange={handleFileChange} />
                    <button className="action-btn-upload" type="submit">Upload</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default FileUpload;
