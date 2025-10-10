'use client';

import React from "react";
import "./main.css"; 

export default function Dashboard() {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="logo">Dashboard</h3>
        <ul className="navList">
          <li>Order History</li>
          <li>Ongoing Order</li>
          <li>Order Tracking</li>
          <li>Edit Profile</li>
          <li>Reset Password</li>
          <li>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Account Info */}
        <section className="accountInfo">
          <h3>Account Information</h3>
          <p>dhruvi</p>
          <p>Email: dhruvimendapara3874@gmail.com</p>
          <p>Phone: 8401637607</p>
          <p>Address:</p>
        </section>

        {/* Orders Stats */}
        <section className="stats">
          <div className="statCard">
            <div className="circle">
              <span className="number">0</span>
            </div>
            <p>Total Orders</p>
            <small>All Time</small>
          </div>

          <div className="statCard">
            <div className="circle">
              <span className="number">0</span>
            </div>
            <p>Pending Orders</p>
            <small>All Time</small>
          </div>
        </section>
      </main>
    </div>
  );
}
