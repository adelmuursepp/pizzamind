import React, { useRef, useEffect, useState } from 'react';

const Camera = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        // Request access to the camera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const constraints = {
                video: true
            };

            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                setStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }).catch((err) => console.error(err));
        }

        // Clean up
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const capturePhoto = () => {
        const video = videoRef.current;
        const photo = photoRef.current;
        const context = photo.getContext('2d');

        if (video && photo) {
            const width = video.videoWidth;
            const height = video.videoHeight;

            photo.width = width;
            photo.height = height;

            context.drawImage(video, 0, 0, width, height);

            // You can now use photo.toDataURL() to get the image data
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }}></video>
            <button onClick={capturePhoto}>Capture Photo</button>
            <canvas ref={photoRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default Camera;
