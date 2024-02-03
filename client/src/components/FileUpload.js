import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Camera from './Camera'


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
            <h2>Upload a File</h2>
            < Camera  />
            {/* <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form> */}
        </div>
    );
}

export default FileUpload;
