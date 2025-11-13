"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signupUser, verifyEmail, verifyPhone } from "../api/auth/signup";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./main.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirm_password: "",
  });

  const [user_id, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(0); // 0=signup, 1=email OTP, 2=phone OTP
  const [otp, setEmailOtp] = useState("");
  const [Phoneotp, setPhoneOtp] = useState("");
  const router = useRouter();

  // 🔹 Popup state
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" | "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Popup auto-hide
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

  const showPopup = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
  };

  // Step 0: Signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      showPopup("❌ Passwords do not match!", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await signupUser(formData);
      const id = res?.data?.user_id || res?.data?.userId || res?.user_id;
      if (!id) throw new Error("Signup did not return userId");

      setUserId(String(id));
      setOtpStep(1);
      setEmailOtp("");
      showPopup("✅ OTP sent to your email!", "success");
    } catch (err) {
      console.error(err);
      showPopup(err?.data?.message || err.message || "Signup failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Email OTP
  const handleEmailOtpSubmit = async (e) => {
    e.preventDefault();

    if (!user_id) return showPopup("❌ User ID missing. Please signup again.", "error");
    if (!otp.trim()) return showPopup("❌ Please enter the Email OTP.", "error");

    setLoading(true);
    try {
      await verifyEmail(Number(user_id), Number(otp.trim()));
      setOtpStep(2);
      setPhoneOtp("");
      showPopup("✅ Email verified! Now enter OTP sent to your phone.", "success");
    } catch (err) {
      console.error(err);
      showPopup(err?.data?.message || err.message || "Email OTP verification failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Phone OTP
  const handlePhoneOtpSubmit = async (e) => {
    e.preventDefault();

    if (!user_id) return showPopup("❌ User ID missing. Please signup again.", "error");
    if (!Phoneotp.trim()) return showPopup("❌ Please enter the Phone OTP.", "error");

    setLoading(true);
    try {
      await verifyPhone(Number(user_id), Number(Phoneotp.trim()));
      showPopup("✅ Phone verified! Signup complete.", "success");
      router.push("/login");
    } catch (err) {
      console.error(err);
      showPopup(err?.data?.message || err.message || "Phone OTP verification failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => router.push("/");

  return (
    <div className="signup-page">
      <iframe src="/" className="iframe-bg" frameBorder="0" title="Homepage Background"></iframe>
      <div className="form-overlay">
        <div className="modal">
          <button
            className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black close-btn"
            onClick={handleClose}
            aria-label="Close Sign Up Modal"
          >
            &times;
          </button>

          {/* 🔹 Popup */}
          {popupMessage && (
                   <div className={`email-popup ${popupType} show flex items-center gap-2`}>
                     {popupType==="success" ? 
                       <AiOutlineCheckCircle className="text-green-500 text-lg"/> : 
                       <AiOutlineCloseCircle className="text-red-500 text-lg"/>}
                    <span>
  {typeof popupMessage === "string" ? popupMessage.replace(/^✅ |^❌ /, "") : ""}
</span>
                   </div>
                 )}

          {/* Step 0: Signup Form */}
          {otpStep === 0 && (
            <>
              <h2>Sign up to your account</h2>
              <form onSubmit={handleSignupSubmit}>
                <input name="username" type="text" placeholder="Your Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Your Email" onChange={handleChange} required />
                <input name="phonenumber" type="tel" placeholder="Your Mobile No" onChange={handleChange} required />
              
                <input name="password" type="password" placeholder="Your Password" onChange={handleChange} required />
                <input name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} required />
                <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
              </form>
            </>
          )}

          {/* Step 1: Email OTP */}
          {otpStep === 1 && (
            <>
             <div className="modal-otp">
              <h2>Verify Email</h2>
              <form onSubmit={handleEmailOtpSubmit} className="otp-form">
                <input type="text" maxLength="6" placeholder="Enter Email OTP" value={otp} onChange={(e) => setEmailOtp(e.target.value)} required className="otp-input" disabled={loading} />
                <button type="submit" className="otp-btn" disabled={loading}>{loading ? "Verifying..." : "Verify Email OTP"}</button>
              </form>
              </div>
            </>
          )}

          {/* Step 2: Phone OTP */}
          {otpStep === 2 && (
            <>
             <div className="modal-otp">
              <h2>Verify Phone</h2>
              <form onSubmit={handlePhoneOtpSubmit} className="otp-form">
                <input type="text" maxLength="6" placeholder="Enter Phone OTP"   value={Phoneotp}  onChange={(e) => setPhoneOtp(e.target.value)} required className="otp-input" disabled={loading} />
                <button type="submit" className="otp-btn" disabled={loading}>{loading ? "Verifying..." : "Verify Phone OTP"}</button>
              </form>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
