'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "./main.css"; 
import ForgotPasswordModal from '../../components/ForgotPasswordModal';
import { loginInitiate, loginWithPassword, sendOtp } from '../api/auth/user-login';

export default function CustomerLogin() {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [mode, setMode] = useState('otp'); 
  const [loginType, setLoginType] = useState('');
  const [userId, setUserId] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const router = useRouter();

  const handleClose = () => router.push('/');

  // Helper: detect email vs phone
  const isEmail = (value) => /\S+@\S+\.\S+/.test(value);

  // Step 1: Initiate login
  const handleContinue = async () => {
    if (!loginValue.trim()) return alert("Enter phone or email.");
    try {
      const res = await loginInitiate(loginValue.trim());
      if (res.success) {
        setShowSuccess(true);
        setLoginType(res.data.login_type);
        setUserId(res.data.user_id);
      } else {
        alert(res.message || "Login failed.");
      }
    } catch (err) {
      alert(err.message || "API call failed.");
    }
  };

  // Step 2: Login with OTP
  const handleOtpLogin = async () => {
    if (!loginValue.trim()) return alert("Enter your phone or email.");

    try {
      const res = await sendOtp(loginValue.trim()); // Call OTP API

      if (res.success) {
        alert(res.message?.message || "OTP sent successfully!");

        // Redirect to OTP page with correct query param
        if (isEmail(loginValue.trim())) {
          router.push(`/otp?email=${encodeURIComponent(loginValue.trim())}`);
        } else {
          router.push(`/otp?mobile=${loginValue.trim()}`);
        }
      } else {
        alert(res.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "API call failed.");
    }
  };

  // Step 3: Login with password
  const handlePasswordLogin = async () => {
    if (!password) return alert("Enter your password.");

    try {
      const res = await loginWithPassword(loginValue.trim(), password);

      if (res.success) {
        localStorage.setItem("access_token", res.data.access_token);
        alert(res.message || "Logged in successfully!");
        router.push("/dashboard");
      } else {
        alert(res.message || "Password login failed.");
      }
    } catch (err) {
      alert(err.message || "API call failed.");
    }
  };

  return (
    <div className="login-account-page">
      <iframe src="/" className="iframe-bg" frameBorder="0" title="Homepage Background"></iframe>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-overlay ">
        <div className="bg-white rounded-lg shadow-lg p-6 relative modal-box">
          <button className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl close-btn" onClick={handleClose}>&times;</button>

          <h2 className="text-center text-xl font-medium mb-4">Login to your account</h2>

          <input
            type="text"
            placeholder="Enter your phone or email"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
          />

          {showSuccess && mode === 'password' && (
            <input
              type="password"
              placeholder="Your password"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {showSuccess && (
            <div className="link-row">
              {mode === 'otp' && (
                <a href="#" className="link-left" onClick={(e) => { e.preventDefault(); setMode('password'); }}>
                  Login with password
                </a>
              )}
              <a href="#" className="link-right" onClick={(e) => { e.preventDefault(); setShowResetModal(true); }}>
                Forgot Password?
              </a>
              {showResetModal && <ForgotPasswordModal onClose={() => setShowResetModal(false)} />}
            </div>
          )}

          {!showSuccess ? (
            <button className="continue-btn" onClick={handleContinue}>Continue</button>
          ) : mode === 'password' ? (
            <button className="otp-btn" onClick={handlePasswordLogin}>Login</button>
          ) : (
            <button className="otp-btn" onClick={handleOtpLogin}>Login with OTP</button>
          )}
        </div>
      </div>
    </div>
  );
}
