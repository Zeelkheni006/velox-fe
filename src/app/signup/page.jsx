"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- Import router
import "./main.css"; 

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    password: "",
    confirm: "",
  });
   const router = useRouter();   
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };  


  const handleClose = () => {
    router.push("/"); // <-- Redirect to home (or change to your desired route)
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
          <h2>Sign up to your account</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Your Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Your Email" onChange={handleChange} required />
            <input name="mobile" type="tel" placeholder="Your Mobile No" onChange={handleChange} required />
            <select name="city" onChange={handleChange} required>
              <option value="">Select City</option>
              <option value="Jamnagar">Jamnagar</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>
            <input name="password" type="password" placeholder="Your Password" onChange={handleChange} required />
            <input name="confirm" type="password" placeholder="Confirm Password" onChange={handleChange} required />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
