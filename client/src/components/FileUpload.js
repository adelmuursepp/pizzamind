import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Camera from './Camera'
import Header from './Header';
import Footer from './Footer';


function FileUpload() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const { getAccessTokenSilently } = useAuth0();

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        const token = await getAccessTokenSilently();

        fetch('/upload', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert(`${data['product']}`);
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
            <h2>Upload a File</h2>
            < Camera />
            {/* <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form> */}
            <Footer />
        </div>
    );
}

export default FileUpload;
