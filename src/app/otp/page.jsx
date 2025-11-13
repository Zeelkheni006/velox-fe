'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import "./main.css"; 
import { verifyOtp } from '../api/auth/user-login'; // import helper

export default function OtpLoginPage() {
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile') || '';
  const email = searchParams.get('email') || '';
  const credential = mobile || email; // whichever exists
  const router = useRouter();

  const [otp, setOtp] = useState('');
const handleLogin = async () => {
  if (!otp) {
    alert("Please enter OTP");
    return;
  }

  try {
    const res = await verifyOtp(credential, otp); // Call API

    if (res.success) {
      // Save access token
      localStorage.setItem("access_token", res.data.access_token);

      // Optionally save user_id
      localStorage.setItem("user_id", res.data.user_id);

      alert(res.message || "OTP verified successfully!");
      router.push("/dashboard"); // redirect after login
    } else {
      alert(res.message || "Invalid OTP, please try again.");
    }
  } catch (err) {
    console.error(err);
    alert(err.message || "OTP verification failed.");
  }
};


  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="login-account-page">
      <iframe
        src="/"
        className="iframe-bg"
        frameBorder="0"
        title="Homepage Background"
      ></iframe>
      <div className="otp-page">
        <div className="modal">
          <button onClick={handleClose} className="close">&times;</button>
          <h2 className="title">Login to your account</h2>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
          />

          <button onClick={handleLogin} className="submit-btn">Login</button>
        </div>
      </div>
    </div>
  );
}
