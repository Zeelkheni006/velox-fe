"use client";
import React, { useState } from "react";
import Layout from "../pages/page";
import Select from "react-select";
import { GoogleMap, LoadScript, Marker, Rectangle } from "@react-google-maps/api";
import styles from "../styles/Franchises.module.css";
import { useJsApiLoader } from "@react-google-maps/api";
export default function EditFranchise() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [workingCities, setWorkingCities] = useState([{ label: "Jamnagar", value: "jamnagar" }]);
  const [form, setForm] = useState({
    country: "India",
    state: "Gujarat",
    city: "Jamnagar",
    franchiseName: "ABC ENTERPRICE JAM",
    firstAddress: "52/4 SANKARTEKRI UDHYOGNAGAR JAMNAGAR",
    secondAddress: "NR AMUL PALOR",
    mobile: "9825737456",
    commission: "20",
    pincode: "341004",
    email: "honeyvelox1234@gmail.com",
    deliveryHours: "1",
    deliveryMinutes: "30",
    latitude: 22.4707019,
    longitude: 70.05773,
  });

  const serviceOptions = [
    { label: "Split AC Regular Water Jet Service", value: "service1" },
    { label: "Split AC Regular Service", value: "service2" },
    { label: "Split AC Check", value: "service3" },
    { label: "Velox Gold Glow Package – Glow Without Limits!", value: "service4" },
    { label: "Velox Bronze Beauty Package – Fresh Look, Fresh Feel!", value: "service5" },
    { label: "Split AC Chemical Wash", value: "service6" },
    { label: "Velox AC Care+ Plan", value: "service7" },
    { label: "Velox FreshGuard Home Plan", value: "service8" },
    { label: "Velox CoolCare AMC Plan", value: "service9" },
    { label: "Velox Luxe Glow Pack – Pamper Yourself Like Royalty!", value: "service10" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => {
    setWorkingCities([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Franchise updated successfully!");
  };
const center = { lat: Number(form.latitude), lng: Number(form.longitude) };


const { isLoaded, loadError } = useJsApiLoader({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // from .env.local
  libraries: ["places"],
});
  // Rectangle area (example around Jamnagar)
  const rectangleBounds = {
    north: 22.52,
    south: 22.43,
    east: 70.08,
    west: 70.02,
  };

  return (
    <Layout>
      <div className={styles.editcontainer}>
              <div className={styles.headerContainer}>
                  <div>
                    <span className={styles.breadcrumb}>Franchise</span> &gt;{" "}
                    <span className={styles.breadcrumbActive}>Edit Franchise</span>
                  </div>
                </div>
       

        <form onSubmit={handleSubmit} className={styles.addform}>
           <h2 className={styles.edittitle}>Edit Franchise</h2>
          <div className={styles.editgrid}>
            {/* SERVICES */}
            <div className={styles.editfull}>
              <label>SERVICES</label>
              <Select
                isMulti
                options={serviceOptions}
                value={selectedServices}
                onChange={setSelectedServices}
                className={styles.editmultiSelect}
              />
            </div>

            {/* COUNTRY & CITY */}
            <div>
              <label>COUNTRY</label>
              <input name="country" value={form.country} onChange={handleChange} />
            </div>
            <div>
              <label>CITY</label>
              <input name="city" value={form.city} onChange={handleChange} />
            </div>

            {/* STATE & PINCODE */}
            <div>
              <label>STATE</label>
              <input name="state" value={form.state} onChange={handleChange} />
            </div>
            <div>
              <label>PINCODE</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} />
            </div>

            {/* FRANCHISE NAME */}
            <div className={styles.full}>
              <label>FRANCHISE NAME</label>
              <input name="franchiseName" value={form.franchiseName} onChange={handleChange} />
            </div>

            {/* ADDRESSES */}
            <div className={styles.full}>
              <label>FIRST ADDRESS</label>
              <input name="firstAddress" value={form.firstAddress} onChange={handleChange} />
            </div>
            <div className={styles.full}>
              <label>SECOND ADDRESS</label>
              <input name="secondAddress" value={form.secondAddress} onChange={handleChange} />
            </div>

            {/* CONTACT */}
            <div>
              <label>MOBILE NUMBER</label>
              <input name="mobile" value={form.mobile} onChange={handleChange} />
            </div>
            <div>
              <label>EMAIL</label>
              <input name="email" value={form.email} onChange={handleChange} />
            </div>

            {/* COMMISSION */}
            <div>
              <label>COMMISSION(%)</label>
              <input name="commission" value={form.commission} onChange={handleChange} />
            </div>

            {/* DELIVERY TIME */}
            <div>
              <label>DELIVERY TIME (HOURS)</label>
              <select name="deliveryHours" value={form.deliveryHours} onChange={handleChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div>
              <label>DELIVERY TIME (MINUTE)</label>
              <select name="deliveryMinutes" value={form.deliveryMinutes} onChange={handleChange}>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </div>

            {/* LAT/LNG */}
            <div>
              <label>LATITUDE</label>
              <input name="latitude" value={form.latitude} onChange={handleChange} />
            </div>
            <div>
              <label>LONGITUDE</label>
              <input name="longitude" value={form.longitude} onChange={handleChange} />
            </div>

            {/* WORKING CITY */}
            <div className={styles.editfull}>
              <label>WORKING CITY</label>
              <Select
                isMulti
                value={workingCities}
                onChange={setWorkingCities}
                options={[{ label: "Jamnagar", value: "jamnagar" }]}
              />
              <input placeholder="Enter a location" className={styles.editlocationInput} />
              <button type="button" className={styles.editresetBtn} onClick={handleReset}>
                Reset Area
              </button>
            </div>
          </div>

          {/* Google Map */}
         {/* Google Map */}
{/* Google Map */}
<div className={styles.mapContainer}>
  <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "100%" }}
      center={{
        lat: Number(form.latitude) || 22.4707019,
        lng: Number(form.longitude) || 70.05773,
      }}
      zoom={12}
      mapTypeId="roadmap" // ✅ real Google Maps style
     options={{
  mapTypeControl: true,
  mapTypeControlOptions: {
    style: 1,    // HORIZONTAL_BAR = 1
    position: 3, // TOP_RIGHT = 3
  },
  zoomControl: true,
  fullscreenControl: true,
  streetViewControl: true,
}}
    >
      {/* Draggable Marker */}
      <Marker
        position={{
          lat: Number(form.latitude) || 22.4707019,
          lng: Number(form.longitude) || 70.05773,
        }}
        draggable={true}
        onDragEnd={(e) =>
          setForm({
            ...form,
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng(),
          })
        }
      />

      {/* Rectangle Area */}
      <Rectangle
        bounds={rectangleBounds}
        options={{
          strokeColor: "#ff6b6b",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#ec7c7c",
          fillOpacity: 0.35,
        }}
      />
    </GoogleMap>
  </LoadScript>
</div>


          {/* Submit */}
          <button type="submit" className={styles.submitBtn}>
            UPDATE
          </button>
        </form>
      </div>
    </Layout>
  );
}
