'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "./main.css"; 
import ForgotPasswordModal from '../../components/ForgotPasswordModal';
import { loginInitiate, loginWithPassword, sendOtp } from '../api/auth/user-login';
import usePopup from '../admin/components/popup';
import PopupAlert from "../admin/components/PopupAlert";
export default function CustomerLogin() {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [mode, setMode] = useState('otp'); 
  const [loginType, setLoginType] = useState('');
  const [userId, setUserId] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const router = useRouter();
  const { popupMessage, popupType, showPopup } = usePopup();
const isPhoneOnly = (v) => /^\d{0,10}$/.test(v);
const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const handleClose = () => router.push('/');

  // Helper: detect email vs phone
 

  // Step 1: Initiate login
  const handleContinue = async () => {
    if (!loginValue.trim()) return showPopup("Enter phone or email.");
    try {
      const res = await loginInitiate(loginValue.trim());
      if (res.success) {
        setShowSuccess(true);
        setLoginType(res.data.login_type);
        setUserId(res.data.user_id);
      } else {
        showPopup(res.message || "Login failed.","error");
      }
    } catch (err) {
      showPopup(err.message || "API call failed.","error");
    }
  };

  // Step 2: Login with OTP
  const handleOtpLogin = async () => {
    if (!loginValue.trim()) return alert("Enter your phone or email.");

    try {
      const res = await sendOtp(loginValue.trim()); // Call OTP API

      if (res.success) {
        showPopup(res.message?.message || "OTP sent successfully!");

        // Redirect to OTP page with correct query param
        if (isEmail(loginValue.trim())) {
          router.push(`/otp?email=${encodeURIComponent(loginValue.trim())}`);
        } else {
          router.push(`/otp?mobile=${loginValue.trim()}`);
        }
      } else {
        showPopup(res.message || "Failed to send OTP.","error");
      }
    } catch (err) {
      console.error(err);
      showPopup(err.message || "API call failed.","error");
    }
  };

  // Step 3: Login with password
  const handlePasswordLogin = async () => {
    if (!password) return showPopup("Enter your password.");

    try {
      const res = await loginWithPassword(loginValue.trim(), password);

      if (res.success) {
        localStorage.setItem("access_token", res.data.access_token);
        showPopup(res.message || "Logged in successfully!");
        router.push("/dashboard");
      } else {
        showPopup(res.message || "Password login failed.","error");
      }
    } catch (err) {
      showPopup(err.message || "API call failed.","error");
    }
  };

  return (
     
    <div className="login-account-page">
       <PopupAlert message={popupMessage} type={popupType} />
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
  onChange={(e) => {
    let value = e.target.value;

    // 🟢 If starts with letter OR contains '@' → EMAIL MODE
    if (/^[a-zA-Z]/.test(value) || value.includes('@')) {
      setLoginValue(value.replace(/^(\+91)/, '')); // ensure no +91
      return;
    }

    // 🟢 PHONE MODE

    // remove +91 if pasted
    const rawNumber = value.replace(/^(\+91)/, '');

    // allow only digits
    if (!/^\d*$/.test(rawNumber)) return;

    // limit 10 digits
    if (rawNumber.length > 10) return;

    // auto add +91
    if (rawNumber.length > 0) {
      setLoginValue(`+91${rawNumber}`);
    } else {
      setLoginValue('');
    }
  }}
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
                // <a href="#" className="link-left" onClick={(e) => { e.preventDefault(); setMode('password'); }}>
                //   Login with password
                // </a>
                 <a
    href="#"
    className="link-left"
    onClick={(e) => {
      e.preventDefault();
      handleOtpLogin(); // same function
    }}
  >
    Login with OTP
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
            <button
    type="button"
  className="otp-btn"
    onClick={() => setMode('password')}
  >
    Login with password
  </button>
          )}
        </div>
      </div>
    </div>
  );
}
