"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signupUser, verifyEmail, verifyPhone } from "../api/auth/signup";
import usePopup from '../admin/components/popup';
import PopupAlert from "../admin/components/PopupAlert";
import './main.css';  
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
 const { popupMessage, popupType, showPopup } = usePopup();
  // 🔹 Popup state


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  // Step 0: Signup
 const handleSignupSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirm_password) {
    showPopup("❌ Passwords do not match!", "error"); // Password mismatch
    return;
  }

  setLoading(true);
  try {
    const res = await signupUser(formData);
    console.log("signupUser response:", res);

    const id = res?.data?.user_id || res?.data?.userId || res?.user_id;
    if (!id) {
      // ❌ Backend did not return user id
      showPopup(res?.message || "❌ Signup did not return userId", "error");
      return;
    }

    setUserId(String(id));
    setOtpStep(1);
    setEmailOtp("");

    // ✅ Success message from backend if available
    showPopup(res?.message || "✅ OTP sent to your email!", "success");
  } catch (err) {
    console.error(err);
    // ❌ Catch any API/network errors
    showPopup(err?.response?.data?.message || err?.message || "Signup failed!", "error");
  } finally {
    setLoading(false);
  }
};

  // Step 1: Email OTP
 const handleEmailOtpSubmit = async (e) => {
  e.preventDefault();

  if (!user_id) {
    showPopup("❌ User ID missing. Please signup again.", "error");
    return;
  }
  if (!otp.trim()) {
    showPopup("❌ Please enter the Email OTP.", "error");
    return;
  }

  setLoading(true);
  try {
    const res = await verifyEmail(Number(user_id), Number(otp.trim()));
    console.log("verifyEmail response:", res);

    // ✅ Success message from backend if available
    setOtpStep(2);
    setPhoneOtp("");
    showPopup(res?.message || "✅ Email verified! Now enter OTP sent to your phone.", "success");
  } catch (err) {
    console.error(err);
    // ❌ Show backend error or fallback
    showPopup(err?.response?.data?.message || err?.message || "Email OTP verification failed.", "error");
  } finally {
    setLoading(false);
  }
};

  // Step 2: Phone OTP
const handlePhoneOtpSubmit = async (e) => {
  e.preventDefault();

  if (!user_id) {
    showPopup("❌ User ID missing. Please signup again.", "error");
    return;
  }
  if (!Phoneotp.trim()) {
    showPopup("❌ Please enter the Phone OTP.", "error");
    return;
  }

  setLoading(true);
  try {
    const res = await verifyPhone(Number(user_id), Number(Phoneotp.trim()));
    console.log("verifyPhone response:", res);

    // ✅ Success message from backend if available
    showPopup(res?.message || "✅ Phone verified! Signup complete.", "success");
    router.push("/login");
  } catch (err) {
    console.error(err);
    // ❌ Show backend error or fallback
    showPopup(err?.response?.data?.message || err?.message || "Phone OTP verification failed.", "error");
  } finally {
    setLoading(false);
  }
};


  const handleClose = () => router.push("/");
const handlePhoneChange = (e) => {
  let value = e.target.value;

  // remove +91 if pasted or editing
  const rawNumber = value.replace(/^(\+91)/, '');

  // allow only digits
  if (!/^\d*$/.test(rawNumber)) return;

  // max 10 digits
  if (rawNumber.length > 10) return;

  // auto add +91
  if (rawNumber.length > 0) {
    setFormData({
      ...formData,
      phonenumber: `+91${rawNumber}`,
    });
  } else {
    setFormData({
      ...formData,
      phonenumber: '',
    });
  }
};

  return (
    <div className="signup-page">
       <PopupAlert message={popupMessage} type={popupType} />
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

    

          {/* Step 0: Signup Form */}
          {otpStep === 0 && (
            <>
              <h2>Sign up to your account</h2>
              <form onSubmit={handleSignupSubmit}>
                <input name="username" type="text" placeholder="Your Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Your Email" onChange={handleChange} required />
              <input
  name="phonenumber"
  type="tel"
  placeholder="Your Mobile No"
  value={formData.phonenumber}
  onChange={handlePhoneChange}
  required
/>

              
                <input name="password" type="password" placeholder="Your Password" onChange={handleChange} required />
                <input name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} required />
                <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
              </form>
            </>
          )}
</div>
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
  );
}
