'use client';

import React, { useState, useMemo } from "react";
import Layout from "../pages/page";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./location.css";

export default function LocationPage() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // Example data
  const countries = ["India", "USA"];
  const states = {
    India: ["Gujarat", "Maharashtra", "Rajasthan"],
    USA: ["California", "Texas", "Florida"]
  };
  const cities = {
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
    California: ["Los Angeles", "San Francisco", "San Diego"],
    Texas: ["Houston", "Dallas", "Austin"],
    Florida: ["Miami", "Orlando", "Tampa"]
  };

  // Example coordinates for demo (replace with real coordinates)
  const locations = {
    India: { lat: 22.5937, lng: 78.9629 },
    USA: { lat: 37.0902, lng: -95.7129 },
    Gujarat: { lat: 22.2587, lng: 71.1924 },
    Maharashtra: { lat: 19.7515, lng: 75.7139 },
    Rajasthan: { lat: 27.0238, lng: 74.2179 },
    California: { lat: 36.7783, lng: -119.4179 },
    Texas: { lat: 31.9686, lng: -99.9018 },
    Florida: { lat: 27.9944, lng: -81.7603 },
    Ahmedabad: { lat: 23.0225, lng: 72.5714 },
    Surat: { lat: 21.1702, lng: 72.8311 },
    Vadodara: { lat: 22.3072, lng: 73.1812 },
    Mumbai: { lat: 19.0760, lng: 72.8777 },
    Pune: { lat: 18.5204, lng: 73.8567 },
    Nagpur: { lat: 21.1458, lng: 79.0882 },
    Jaipur: { lat: 26.9124, lng: 75.7873 },
    Udaipur: { lat: 24.5854, lng: 73.7125 },
    Jodhpur: { lat: 26.2389, lng: 73.0243 },
    "Los Angeles": { lat: 34.0522, lng: -118.2437 },
    "San Francisco": { lat: 37.7749, lng: -122.4194 },
    "San Diego": { lat: 32.7157, lng: -117.1611 },
    Houston: { lat: 29.7604, lng: -95.3698 },
    Dallas: { lat: 32.7767, lng: -96.7970 },
    Austin: { lat: 30.2672, lng: -97.7431 },
    Miami: { lat: 25.7617, lng: -80.1918 },
    Orlando: { lat: 28.5383, lng: -81.3792 },
    Tampa: { lat: 27.9506, lng: -82.4572 }
  };

  const handleSubmit = () => {
    alert(`Country: ${country}\nState: ${state}\nCity: ${city}`);
  };

  // Markers array based on selection
  const markers = useMemo(() => {
    const m = [];
    if (country) m.push({ position: locations[country], color: "red" });
    if (state) m.push({ position: locations[state], color: "blue" });
    if (city) m.push({ position: locations[city], color: "green" });
    return m;
  }, [country, state, city]);

  // Map center
  const mapCenter = markers.length ? markers[markers.length - 1].position : { lat: 20, lng: 77 };

  return (
    <Layout>
      <div className="location-container">
        <h2>Select Your Location</h2>

        <div className="select-boxes">
          <select value={country} onChange={(e) => {setCountry(e.target.value); setState(""); setCity("");}}>
            <option value="">Select Country</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={state} onChange={(e) => {setState(e.target.value); setCity("");}} disabled={!country}>
            <option value="">Select State</option>
            {country && states[country].map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
            <option value="">Select City</option>
            {state && cities[state].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Google Map */}
        <div className="map" style={{ height: "400px", width: "100%" }}>
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
   <GoogleMap
  mapContainerStyle={{ width: "100%", height: "100%" }}
  center={mapCenter}
  zoom={markers.length ? 6 : 4}
  mapTypeId="roadmap" // <-- This ensures normal light map is shown
>
  {markers.map((m, index) => (
    <Marker
      key={index}
      position={m.position}
      icon={{
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: m.color,
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 1.5,
      }}
    />
  ))}
</GoogleMap>
          </LoadScript>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </Layout>
  );
}
