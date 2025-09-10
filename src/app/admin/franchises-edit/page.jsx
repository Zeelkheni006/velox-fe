

 import Layout from "../pages/page";
 import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../styles/Franchises.module.css";// style as needed


const franchiseData = [
  {
    id: 34,
    name: "ABC ENTERPRICE JAM",
    ownerName: "John Doe",
    email: "john@example.com",
    mobile: "1234567890",
    address1: "Address Line 1",
    address2: "Address Line 2",
    country: "India",
    state: "Gujarat",
    city: "Jamnagar",
    pincode: "361001",
    deliveryTimeHour: "2",
    deliveryTimeMinute: "30",
    latitude: "22.4707",
    longitude: "70.0577",
    services: ["Oil Change", "Tire Service"],
    workingCity: ["Jamnagar", "Rajkot"],
  },
  // ...add other dummyData as needed
];


export default function EditFranchise({ params }) {

  const {id} = params.id; 

  if (!id) return <p>Loading...</p>;

  const franchise = franchiseData.find((f) => f.id === parseInt(id));
  if (!franchise) return <p>Franchise not found</p>;


  return (
    <Layout>
      <div className={styles.editContainer}>
         <h2>Edit Franchise: {franchise.name}</h2>
        <form className={styles.form}>
          <div>
            <label>Franchise Name</label>
            <input value={franchise.name} readOnly />
          </div>
          <div>
            <label>Owner Name</label>
            <input value={franchise.ownerName} readOnly />
          </div>
          <div>
            <label>Email</label>
            <input value={franchise.email} readOnly />
          </div>
          <div>
            <label>Mobile Number</label>
            <input value={franchise.mobile} readOnly />
          </div>
          <div>
            <label>Address 1</label>
            <input value={franchise.address1} readOnly />
          </div>
          <div>
            <label>Address 2</label>
            <input value={franchise.address2} readOnly />
          </div>
          <div>
            <label>Country</label>
            <input value={franchise.country} readOnly />
          </div>
          <div>
            <label>State</label>
            <input value={franchise.state} readOnly />
          </div>
          <div>
            <label>City</label>
            <input value={franchise.city} readOnly />
          </div>
          <div>
            <label>Pincode</label>
            <input value={franchise.pincode} readOnly />
          </div>
          <div>
            <label>Delivery Time (Hours)</label>
            <input value={franchise.deliveryTimeHour} readOnly />
          </div>
          <div>
            <label>Delivery Time (Minutes)</label>
            <input value={franchise.deliveryTimeMinute} readOnly />
          </div>
          <div>
            <label>Latitude</label>
            <input value={franchise.latitude} readOnly />
          </div>
          <div>
            <label>Longitude</label>
            <input value={franchise.longitude} readOnly />
          </div>
          <div>
            <label>Services</label>
            <textarea value={franchise.services.join(", ")} readOnly />
          </div>
          <div>
            <label>Working Cities</label>
            <textarea value={franchise.workingCity.join(", ")} readOnly />
          </div>
        </form>
      </div>
    </Layout>
  );
}
