'use client';
import { useRouter } from "next/navigation"; 
import React from "react";
import "./main.css"; 

export default function Dashboard() {
    const router = useRouter();
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        
        <ul className="navList">
          <li onClick={()=> router.push("/dashboard")}>Dashboard</li>
          <li onClick={() => router.push("/order-history")}>Order History</li>
          <li onClick={()=>router.push("/ongoing-order")}>Ongoing Order</li>
          <li onClick={()=>router.push("/order-track")}>Order Tracking</li>
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
