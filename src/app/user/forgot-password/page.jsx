"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./reset.css";
import { FaLock } from "react-icons/fa";
import { verifyResetPassword } from "../../api/auth/user-login";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword)
      return setMsg("Please enter both fields.");

    if (password !== confirmPassword)
      return setMsg("Passwords do not match.");

    setLoading(true);
    setMsg("");

    const data = await verifyResetPassword(token, password);

    if (data.success) {
      setMsg("Password reset successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMsg(data.message || "Failed to reset password");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="title">Reset Password</h2>

      <div className="card">
        <div className="lockIcon"><FaLock /></div>

        <input
          type="password"
          placeholder="New Password"
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

        <button className="button" onClick={handleReset} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {msg && <p className="message">{msg}</p>}
      </div>
    </div>
  );
}
