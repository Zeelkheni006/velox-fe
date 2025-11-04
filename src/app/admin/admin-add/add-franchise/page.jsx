// pages/admin/create-franchise.js
"use client";
import { useSearchParams } from "next/navigation";
import styles from "../../styles/CreateFranchise.module.css";
import Layout from "../../pages/page";
import React, { useEffect, useRef } from "react";


export default function CreateFranchisePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const mobile = searchParams.get("mobile") || "";

   const mapRef = useRef(null);

   useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 21.1702, lng: 72.8311 }, // Surat coordinates
        zoom: 12,
      });

      new window.google.maps.Marker({
        position: { lat: 21.1702, lng: 72.8311 },
        map,
        title: "Surat",
      });
    
  

      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ["polygon"],
        },
        polygonOptions: {
          fillColor: "#FF0000",
          fillOpacity: 0.3,
          strokeWeight: 2,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
      });
<Script
        src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing`}
        strategy="beforeInteractive"
      />
      drawingManager.setMap(map);
    }
  }, []);

  const handleReset = () => {
    window.location.reload(); // refresh to clear map
  };

  return (
    <Layout>
      <div className={styles.container}>
         <div className={styles.headerContainer1}>
            
                <span className={styles.breadcrumb}>Franchise User</span> &gt; <span className={styles.breadcrumbActive}>Franchise User</span>
            </div>
        <h1 className={styles.title}>Add Franchise</h1>
        <form className={styles.form}>
          <div className={styles.row}>
            <div>
              <label>SERVICES</label>
              <select><option>Select Service</option></select>
            </div>
            <div>
              <label>COUNTRY</label>
              <select><option>India</option></select>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>STATE</label>
              <select><option>Gujarat</option></select>
            </div>
            <div>
              <label>CITY</label>
              <select><option>Ahmedabad</option></select>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>FRANCHISE NAME</label>
              <input type="text" defaultValue={name} />
            </div>
            <div>
              <label>ADDRESS</label>
              <input type="text" />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>ADDRESS 2</label>
              <input type="text" />
            </div>
            <div>
              <label>PINCODE</label>
              <input type="text" />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>MOBILE NUMBER</label>
              <input type="text" defaultValue={mobile} />
            </div>
            <div>
              <label>EMAIL</label>
              <input type="email" defaultValue={email} />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>COMMISSION(%)</label>
              <input type="text" />
            </div>
            <div>
              <label>DELIVERY TIME (HOURS)</label>
              <select><option>Select Hours</option></select>
            </div>
            <div>
              <label>DELIVERY TIME (MINUTE)</label>
              <select><option>Select Minute</option></select>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>WORKING CITY</label>
              <select><option>Select Working City</option></select>
            </div>
            <div>
              <label>LATITUDE</label>
              <input type="text" />
            </div>
            <div>
              <label>LONGITUDE</label>
              <input type="text" />
            </div>
          </div>

          <div className={styles.row}>
            <div style={{ width: "100%" }}>
              <input type="text" placeholder="Enter a location" />
            </div>
          </div>
 <div className={styles.mapWrapper}>
            <button type="button" className={styles.resetButton} onClick={handleReset}>
              Reset Area
            </button>
            <div ref={mapRef} className={styles.mapContainer}>
            </div>
          </div>
          <button className={styles.updateButton}>SAVE</button>
        </form>
      </div>
    </Layout>
  );
}
