'use client';

import { useState, useEffect } from 'react';
import { initiateAdminLogin, loginWithPassword, sendOtp, loginWithOtp } from '../api/auth/admin-login';
import Image from 'next/image';
import Link from "next/link";
import './admin-login.css';
import { useRouter } from "next/navigation";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function AdminLoginPage() {
  const router = useRouter();  
  const [email, setEmail] = useState("");
  const [isValidEmailFormat, setIsValidEmailFormat] = useState(false);
  const [step, setStep] = useState(""); // "" | "password" | "otpInput"
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(""); // "success" | "error" | ""
  const [popupMessage, setPopupMessage] = useState(""); 
  const [popupType, setPopupType] = useState("");
  const [id, setOtpId] = useState(""); // store OTP session ID

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmailFormat(validateEmail(e.target.value));
    setEmailStatus("");
    setStep(""); // reset step
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  // Validate email with API
  useEffect(() => {
    if (!isValidEmailFormat) return;
    setLoading(true);
    initiateAdminLogin(email)
      .then(data => {
        if(data.success){
          setEmailStatus("success");
          setPopupMessage("✅ Success! Email exists.");
          setPopupType("success");
        } else {
          setEmailStatus("error");
          setPopupMessage("❌ Email not found.");
          setPopupType("error");
        }
      })
      .catch(()=> {
        setEmailStatus("error");
        setPopupMessage("❌ email is Incorect!");
        setPopupType("error");
      })
      .finally(()=> setLoading(false));
  }, [email, isValidEmailFormat]);

  // Popup auto-hide
  useEffect(() => {
    if (!popupMessage) return;
    const timer = setTimeout(() => {
      setPopupType(prev => prev + " hide"); 
      setTimeout(() => {
        setPopupMessage("");
        setPopupType("");
      }, 400);
    }, 4000);
    return () => clearTimeout(timer);
  }, [popupMessage]);

  // Handle sending OTP
const handleSendOtp = async () => {
  setLoading(true);
  try {
    const data = await sendOtp(email);
    console.log("sendOtp response:", data);

    if (data.success) {
      setOtpId(data.data.admin_id); // ← use admin_id
      setPopupMessage("✅ OTP sent to your email.");
      setPopupType("success");
      setStep("otpInput");
    } else {
      setPopupMessage("❌ Failed to send OTP.");
      setPopupType("error");
    }
  } catch (err) {
    console.error(err);
    setPopupMessage("❌ Failed to send OTP.");
    setPopupType("error");
  } finally {
    setLoading(false);
  }
};

  // Handle OTP verification
const handleVerifyOtp = async () => {
  if (!id || !otp) {
    setPopupMessage("❌ OTP or session missing. Send OTP again.");
    setPopupType("error");
    return;
  }

  setLoading(true);
  try {
    const data = await loginWithOtp(email, id, otp); // email, admin_id, otp
    console.log("loginWithOtp response:", data);

   if (data.ok && data.success && data.data?.access_token) {
      // ✅ Store access token
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("admin_id", data.data.admin_id);
      setPopupMessage("✅ OTP verified successfully!");
      setPopupType("success");
      router.push("/admin/dashboard");
    } else {
      setPopupMessage(`❌ ${data.message || "Invalid OTP"}`);
      setPopupType("error");
    }
  } catch (err) {
    console.error("OTP verify error:", err);
    setPopupMessage("❌ OTP verification failed. Try again.");
    setPopupType("error");
  } finally {
    setLoading(false);
  }
};



  // Main button handler
  const handleButtonClick = async () => {
  if(step === "otpInput") {
    await handleVerifyOtp();
  } else if(step === "password") {
    setLoading(true);
    try {
      const data = await loginWithPassword(email, password);
        if(data.success && data.data?.access_token) {
      // ✅ Store access token
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("admin_id", data.data.admin_id);
        setPopupMessage("✅ Password is valid! Logging in...");
        setPopupType("success");

        // Small delay so user sees the success message
        setTimeout(() => {
          router.push("../admin/dashboard");
        }, 800); // 0.8 seconds
      } else {
        setPopupMessage("❌ Invalid password. Try again.");
        setPopupType("error");
      }
    } catch(err){
      console.error(err);
      setPopupMessage("❌ Login failed. Try again.");
      setPopupType("error");
    } finally {
      setLoading(false);
    }
  } else {
    await handleSendOtp(); // default click → send OTP
  }
};


  return (
    <div className="admin-login-wrapper">
      {[...Array(6)].map((_, i) => <div key={i} className={`pill-shape pill${i+1}`}></div>)}
      <div className="admin-login-card">
        <div className="admin-login-form">
          <h2 className="text-2xl font-semibold text-center mb-2">Login Now</h2>
          <p className="text-sm text-gray-500 text-center mb-6">Welcome Back, Please Sign In Below</p>

          {/* Popup */}
          {popupMessage && (
            <div className={`email-popup ${popupType} show flex items-center gap-2`}>
              {popupType==="success" ? 
                <AiOutlineCheckCircle className="text-green-500 text-lg"/> : 
                <AiOutlineCloseCircle className="text-red-500 text-lg"/>}
              <span>{popupMessage.replace(/^✅ |^❌ /,"")}</span>
            </div>
          )}

          {/* Email input */}
          <label className="block mb-1 text-sm font-medium text-gray-700">EMAIL ADDRESS</label>
          <input type="email" placeholder="Type Email Address" value={email} onChange={handleEmailChange} className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:border-blue-400" />
    
          {/* Links after email verification */}
          {emailStatus === "success" && step === "" && (
            <div className="login-password flex justify-between mb-4 px-2">
              <div className='login-password'>
              <a href="#" onClick={(e) => { e.preventDefault(); setStep("password"); }} className="login-password text-sm text-blue-600 hover:underline cursor-pointer">
                Login With Password
              </a>
              </div>
       
            </div>

          )}

          {/* Password input */}
          {step==="password" && (
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">PASSWORD</label>
              <input type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange} className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:border-blue-400"/>
            </div>
          )}
    
          {/* OTP input */}
          {step==="otpInput" && (
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">OTP</label>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:border-blue-400"/>
            </div>
          )}
<div className='forgot-link'>
           <Link 
  href={`/admin/forgot-password?email=${encodeURIComponent(email)}`} 
  className="login-password text-sm text-blue-600 hover:underline"
>
  Forgot Password?
</Link>
            </div> 
          {/* Main login button */}
          <button type="button" onClick={handleButtonClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex justify-center items-center gap-2 transition"
            disabled={loading || (step==="password" && password==="") || (step==="otpInput" && otp==="") || (emailStatus!=="success")}
          >
            {loading ? "Processing..." : step==="otpInput" ? "Login with OTP" : step==="password" ? "Login" : "Login with OTP"}
            <span className="text-xl">→</span>
          </button>

        </div>

        <div className="admin-login-logo">
          <Image src="/images/logo.png" alt="Velox Logo" width={300} height={70} className="object-contain"/>
        </div>
      </div>
    </div>
  );
}

function validateEmail(email){ 
  return /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/.test(email);
}
