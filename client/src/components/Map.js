import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRlbC1tdXVyc2VwcCIsImEiOiJjbG5ndWY1OGEwNzZrMm1ydjc1MjVweTZyIn0.lYDX-bNBQ8tJ7_uE4hOeHw';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-76.48);
    const [lat, setLat] = useState(44.25);
    const [zoom, setZoom] = useState(11);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        const marker1 = new mapboxgl.Marker()
            .setLngLat([-76.48901, 44.25252])
            .addTo(map.current);

        // Add a popup to the marker
        const popup1 = new mapboxgl.Popup({ offset: 25 }) // Add popup offset to avoid overlap
            .setText('Partners in Mission Food Bank');

        // Associate the popup with the marker
        marker1.setPopup(popup1);

        const marker2 = new mapboxgl.Marker()
            .setLngLat([-76.49092, 44.24552])
            .addTo(map.current);

        // Add a popup to the marker
        const popup2 = new mapboxgl.Popup({ offset: 25 }) // Add popup offset to avoid overlap
            .setText('The Salvation Army');

        // Associate the popup with the marker
        marker2.setPopup(popup2);


        const marker3 = new mapboxgl.Marker()
            .setLngLat([-76.49109, 44.24254])
            .addTo(map.current);

        // Add a popup to the marker
        const popup3 = new mapboxgl.Popup({ offset: 25 }) // Add popup offset to avoid overlap
            .setText('St Vincent De Paul Society');

        // Associate the popup with the marker
        marker3.setPopup(popup3);

        const marker4 = new mapboxgl.Marker()
            .setLngLat([-76.50134, 44.23706])
            .addTo(map.current);

        // Add a popup to the marker
        const popup4 = new mapboxgl.Popup({ offset: 25 }) // Add popup offset to avoid overlap
            .setText("Martha's Table Community Program");

        // Associate the popup with the marker
        marker4.setPopup(popup4);

        const marker5 = new mapboxgl.Marker()
            .setLngLat([-76.48296, 44.22968])
            .addTo(map.current);

        // Add a popup to the marker
        const popup5 = new mapboxgl.Popup({ offset: 25 }) // Add popup offset to avoid overlap
            .setText("Lunch by George Charity");

        // Associate the popup with the marker
        marker5.setPopup(popup5);

        const marker6 = new mapboxgl.Marker()
            .setLngLat([-76.48323, 44.23526])
            .addTo(map.current);

        // Add a popup to the marker
        const popup6 = new mapboxgl.Popup({ offset: 25 }) // Add popup offset to avoid overlap
            .setText("United Way KFL&A");

        // Associate the popup with the marker
        marker6.setPopup(popup6);

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div className='map-box'>
            <h2>Food Donation Centers Near You</h2>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}
