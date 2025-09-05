'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "./main.css"; 
import ForgotPasswordModal from '../../components/ForgotPasswordModal';
     // adjust path as needed

    

export default function CustomerLogin() {
    const [showSuccess, setShowSuccess] = useState(false);
     const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
   const [mode, setMode] = useState('mobile'); 
  const router = useRouter();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleContinue = () => {
    if (mobile.length === 10) {
      setShowSuccess(true);
      // TODO: Navigate to OTP or password screen
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };
   const handleOtpLogin = () => {
    // Navigate to OTP page and pass mobile as query param
    router.push(`/otp?mobile=${mobile}`);
  };

  const handleClose = () => {
    router.push('/'); // back to homepage
  };
    const handlePasswordLogin = () => {
    if (!password) return alert("Enter your password.");
    alert(`Logging in with mobile: ${mobile} and password: ${password}`);
  };

  const renderSuccessMessage = () =>
    showSuccess && (
      <div className="success-message">
        <span>Success !</span>
        <button className="dismiss" onClick={() => setShowSuccess(false)}>
          ×
        </button>
      </div>
    );
      const handleLogin = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    alert(`Logging in with mobile ${mobile} and OTP ${otp}`);
    // Do real OTP login logic here
  };

  return (
    <div className="login-account-page">
    <iframe
        src="/"
        className="iframe-bg"
        frameBorder="0"
        title="Homepage Background"
      ></iframe>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-overlay ">
      <div className="bg-white rounded-lg shadow-lg p-6 relative modal-box">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl close-btn"
          onClick={handleClose}
        >
          &times;
        </button>

        <h2 className="text-center text-xl font-medium mb-4">Login to your account</h2>
             {renderSuccessMessage()}
 {/* Success Message */}

        <input
          type="tel"
          placeholder="Enter your mobile number"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          maxLength={10}
        />
 {showSuccess && mode === 'password' && (
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
       {showSuccess && (
          <div className="link-row">
            {mode === 'mobile' && (
              <a
                className="link-left"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMode('password');
                }}
              >
                Login with password
              </a>
            )}
        <a
  href="#"
  className="link-right"
  onClick={(e) => {
    e.preventDefault();
    setShowResetModal(true);
  }}
>
  Forgot Password?
</a>
{showResetModal && (
  <ForgotPasswordModal onClose={() => setShowResetModal(false)} />
)}
          </div>
        )}
               {!showSuccess ? (
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
        ) : mode === 'password' ? (
          <button className="otp-btn" onClick={handlePasswordLogin}>
            Login
          </button>
        ) : (
          <button className="otp-btn" onClick={handleOtpLogin}>
            Login with OTP
          </button>
        )}
      </div>
    </div>
    </div>
  );
}
