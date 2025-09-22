"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser, verifyEmail, verifyPhone } from "../api/auth/signup";
import "./main.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    city: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpStep, setOtpStep] = useState(0); // 0 = signup, 1 = email OTP, 2 = phone OTP
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 0: Signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await signupUser(formData);
      await verifyEmail(formData.email); // send email OTP
      setOtpStep(1); // show email OTP form
      setMessage("OTP sent to your email!");
    } catch (err) {
      console.error("Signup Error:", err);
      setMessage(err.data?.message || err.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Email OTP verification
  const handleEmailOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Here you can call your API to verify email OTP
      // await verifyEmailOtp(formData.email, otp)
      console.log("Email OTP entered:", otp);
      setOtpStep(2); // move to phone OTP
      setOtp(""); // clear previous OTP
      setMessage("Email verified! Now enter OTP sent to your phone.");
    } catch (err) {
      console.error("Email OTP verification failed:", err);
      setMessage("Email OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Phone OTP verification
  const handlePhoneOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Here you can call your API to verify phone OTP
      // await verifyPhoneOtp(formData.phonenumber, otp)
      console.log("Phone OTP entered:", otp);
      setMessage("Phone verified! Signup complete.");
      router.push("/"); // redirect after verification
    } catch (err) {
      console.error("Phone OTP verification failed:", err);
      setMessage("Phone OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="signup-page">
      <iframe
        src="/"
        className="iframe-bg"
        frameBorder="0"
        title="Homepage Background"
      ></iframe>

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
                <input
                  name="username"
                  type="text"
                  placeholder="Your Name"
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  onChange={handleChange}
                  required
                />
                <input
                  name="phonenumber"
                  type="tel"
                  placeholder="Your Mobile No"
                  onChange={handleChange}
                  required
                />
                <select name="city" onChange={handleChange} required>
                  <option value="">Select City</option>
                  <option value="Jamnagar">Jamnagar</option>
                  <option value="Rajkot">Rajkot</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
                <input
                  name="password"
                  type="password"
                  placeholder="Your Password"
                  onChange={handleChange}
                  required
                />
                <input
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
            </>
          )}

          {/* Step 1: Email OTP Form */}
          {otpStep === 1 && (
            <>
              <h2>Verify Email</h2>
              <form onSubmit={handleEmailOtpSubmit} className="otp-form">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="Enter Email OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="otp-input"
                />
                <button type="submit" className="otp-btn">
                  Verify Email OTP
                </button>
              </form>
            </>
          )}

          {/* Step 2: Phone OTP Form */}
          {otpStep === 2 && (
            <>
              <h2>Verify Phone</h2>
              <form onSubmit={handlePhoneOtpSubmit} className="otp-form">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="Enter Phone OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="otp-input"
                />
                <button type="submit" className="otp-btn">
                  Verify Phone OTP
                </button>
              </form>
            </>
          )}

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
