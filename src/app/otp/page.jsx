'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import "./main.css"; 

export default function OtpLoginPage() {
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile') || '';
  const router = useRouter();

  const [otp, setOtp] = useState('');

  const handleLogin = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    alert(`Logging in with mobile ${mobile} and OTP ${otp}`);
    // Do real OTP login logic here
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
