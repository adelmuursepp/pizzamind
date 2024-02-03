import React, { useEffect, useRef, useState } from 'react';

const Camera = ({ onCapture }) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState('');

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

    const captureImage = () => {
        if (!stream) return;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');

        // Draw the video frame to the canvas
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to blob and then to a file
        canvas.toBlob(blob => {
            const imageFile = new File([blob], "capture.jpg", { type: "image/jpeg" });
            onCapture(imageFile);
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
