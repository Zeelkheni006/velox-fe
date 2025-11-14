"use client";
import { useState } from "react";
import  "./main.css";
import { FaLock } from "react-icons/fa";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="container">
      <h2 className="title">Reset Password</h2>

      <div className="card">
        <div className="lockIcon">  <FaLock /></div>

      

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="button">
          Reset Password
        </button>
      </div>
    </div>
  );
}
