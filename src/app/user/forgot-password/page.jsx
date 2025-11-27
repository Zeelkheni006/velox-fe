"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./reset.css";
import { FaLock } from "react-icons/fa";
import { verifyResetPassword } from "../../api/auth/user-login";
import usePopup from '../../admin/components/popup';
  import PopupAlert from "../../admin/components/PopupAlert";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
const { popupMessage, popupType, showPopup } = usePopup();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword)
      return showPopup("Please enter both fields.","error");

    if (password !== confirmPassword)
      return showPopup("Passwords do not match.","error");

    setLoading(true);
    showPopup("");

    const data = await verifyResetPassword(token, password);

    if (data.success) {
      showPopup("Password reset successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      showPopup(data.message || "Failed to reset password","error");
    }

    setLoading(false);
  };

  return (
    <div className="container">
        <PopupAlert message={popupMessage} type={popupType} />
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
