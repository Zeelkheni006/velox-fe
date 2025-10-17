'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./main.css";

export default function ResetForm() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleSubmit = () => {
    if (!currentPassword || !newPassword || !retypePassword) {
      alert("Please fill all fields");
      return;
    }
    if (newPassword !== retypePassword) {
      alert("New Password and Re-type Password do not match!");
      return;
    }
    alert("Password reset successfully!");
    // Add your password reset logic here
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="navList">
          <li onClick={() => router.push("/dashboard")}>Dashboard</li>
          <li onClick={() => router.push("/order-history")}>Order History</li>
          <li onClick={() => router.push("/ongoing-order")}>Ongoing Order</li>
          <li onClick={() => router.push("/order-track")}>Order Tracking</li>
          <li onClick={() => router.push("/user-profile")}>Edit Profile</li>
          <li className="active">Reset Password</li>
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
        <div className="resetBox">
          <h2 className="resetTitle">Reset Password</h2>

          <div className="formGrid">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Re-type New Password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>

          <div className="submitBtnSection">
            <button className="submitBtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
