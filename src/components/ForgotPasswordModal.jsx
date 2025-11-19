'use client';
import { useState } from 'react';
import '../app/login/main.css'; 
import { initiateForgotPassword } from '../app/api/auth/user-login'; // ✅ ADD THIS

export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }

    setLoading(true);

    try {
      const res = await initiateForgotPassword(email); // ✅ CALL API HERE

      if (res.success) {
        alert(`✔ Password reset link has been sent to ${email}`);
        onClose(); // Close modal
      } else {
        alert(res.message || "Something went wrong!");
      }

    } catch (err) {
      alert("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="login-account-page">
      <iframe
        src="/"
        className="iframe-bg"
        frameBorder="0"
        title="Homepage Background"
      ></iframe>

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-overlay">
        <div className="bg-white rounded-lg shadow-lg w-[320px] p-6 relative modal-box">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl close-btn"
            onClick={onClose}
          >
            &times;
          </button>

          <h2 className="text-center text-xl font-medium mb-4">Reset Password</h2>

          <input
            type="email"
            placeholder="Your email"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full confirm"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Password Reset Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
