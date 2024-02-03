import React, { useEffect, useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


const Camera = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        // Request camera access and start streaming
        const startVideoStream = async () => {
            try {
                const constraints = {
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        frameRate: { ideal: 24 }
                    }
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(stream);
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (err) {
                console.error('Error accessing the camera:', err);
                setError('Unable to access camera: ' + err.message);
            }
        };

        startVideoStream();

        // Cleanup function to stop the video stream
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const { getAccessTokenSilently } = useAuth0();

    const captureImage = async () => {
        if (!stream) return;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
            const imageFile = new File([blob], "capture.jpg", { type: "image/jpeg" });
            // onCapture(imageFile); // This is optional depending on your use case

            const token = await getAccessTokenSilently();
            const formData = new FormData();
            formData.append('file', imageFile);

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
                    navigate("/productinfo", { state: data });
                    // Handle response data...
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    // Handle error...
                });
        }, 'image/jpeg');
    };

    return (
        <div>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <>
                    <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }}></video>
                    <button onClick={captureImage}>Capture Photo</button>
                </>
            )}
        </div>
    );
};

export default Camera;
