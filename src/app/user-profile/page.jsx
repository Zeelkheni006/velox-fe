'use client';
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "./main.css";

export default function UserProfile() {
  const router = useRouter();

  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const countries = ["India", "USA"];
  const states = { India: ["Gujarat", "Maharashtra"], USA: ["Texas", "California"] };
  const cities = { Gujarat: ["Ahmedabad", "Surat"], Maharashtra: ["Mumbai", "Pune"], Texas: ["Houston"], California: ["Los Angeles"] };

  // Ref to trigger file input
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // open file picker
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    alert("Profile saved!");
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
          <li className="active">Edit Profile</li>
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
      

        <div className="profileBox">
              <h2 className="profileTitle">Edit Profile</h2>
          {/* Profile Picture & Upload */}
          <div className="profilePicSection">
            <div className="profileCircle">
              {profilePic ? (
                <img src={profilePic} alt="Profile" />
              ) : (
                <span>👤</span>
              )}
            </div>
            <button className="uploadBtn" onClick={handleUploadClick}>
              Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {/* Form */}
          <div className="formGrid">
            {/* Row 1 */}
            <div className="formLeft">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
            </div>
            <div className="formRight">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </div>

            {/* Row 2 */}
            <div className="formLeft">
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone" />
            </div>
            <div className="formRight">
              <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Enter zip" />
            </div>

            {/* Row 3 */}
            <div className="formLeft">
              <select value={country} onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }}>
                <option value="">Select Country</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="formRight">
              <select value={state} onChange={(e) => { setState(e.target.value); setCity(""); }} disabled={!country}>
                <option value="">Select State</option>
                {country && states[country].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Row 4 */}
            <div className="formLeft">
              <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
                <option value="">Select City</option>
                {state && cities[state].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="formRight">
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
            </div>
          </div>

          {/* Save Button */}
          <div className="saveBtnSection">
            <button className="saveBtn" onClick={handleSave}>Save</button>
          </div>
        </div>
      </main>
    </div>
  );
}
