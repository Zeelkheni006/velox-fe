'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./main.css";

export default function OrderTrack() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");

  const handleTrack = () => {
    if (orderNumber.trim() === "") {
      alert("Please enter an order number!");
      return;
    }
    alert(`Tracking Order: ${orderNumber}`);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="navList">
          <li onClick={() => router.push("/dashboard")}>Dashboard</li>
          <li onClick={() => router.push("/order-history")}>Order History</li>
          <li onClick={() => router.push("/ongoing-order")}>Ongoing Order</li>
          <li className="active">Order Tracking</li>
          <li onClick={()=>router.push("/user-profile")}>Edit Profile</li>
          <li onClick={()=>router.push("/resetform")}>Reset Password</li>
                  <li
  onClick={() => {
    // 1️⃣ Clear stored login/session data
    localStorage.removeItem("access_token"); // or your auth token key
    // 2️⃣ Redirect to login or homepage
    router.push("/"); // redirect to your login page
  }}
>
  Logout
</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="mainContent">
        <div className="trackBox">
          <h2 className="title">Order Tracking</h2>

          <div className="trackRow">
            <input
              type="text"
              placeholder="Enter Order Number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="trackInput"
            />
            <button className="trackBtn" onClick={handleTrack}>
              View Tracking
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
