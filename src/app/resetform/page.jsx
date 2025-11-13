'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./main.css";
import { changePassword } from "../api/user-side/dashboard/resetpassword"; // import your API helper

export default function ResetForm() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  if (!token || !userId) {
    alert("Session expired. Please login again.");
    router.push("/");
    return;
  }

  if (!currentPassword || !newPassword || !retypePassword) {
    alert("Please fill all fields");
    return;
  }

  if (newPassword !== retypePassword) {
    alert("New Password and Re-type Password do not match!");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        currentPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Password reset successfully!");
      router.push("/dashboard");
    } else {
      alert(`❌ ${data.message || "Password reset failed"}`);
    }
  } catch (err) {
    console.error("Error changing password:", err);
    alert("❌ Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
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
              localStorage.removeItem("access_token");
              router.push("/");
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
            <button
              className="submitBtn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
