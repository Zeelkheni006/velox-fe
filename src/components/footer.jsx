"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Image from "next/image";
import "../app/main.css";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitNewsletter = async () => {
    if (!email.trim()) {
      setMessage("Email address is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/home-page-footer/news-letter/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      console.log("NEWSLETTER RESPONSE:", data);

      if (data.success) {
        setMessage(data.message);
        setEmail(""); 
      } else {
        const err =
          typeof data.message === "object"
            ? Object.values(data.message)[0][0]
            : data.message;
        setMessage(err);
      }
    } catch (error) {
      setMessage("Network error");
    }

    setLoading(false);
  };

  return (
    <footer className="footer" style={{ position: "relative", zIndex: 20 }}>
      <div className="topSection">
        
        {/* LOGO + SOCIAL */}
        <div className="column">
          <Image
            src="/images/logo_text1.png"
            alt="Velox Logo"
            width={200}
            height={50}
            priority
          />

          <p className="description">
            We provide better home service by professionals you’ve never seen
            before.
          </p>

          <div className="socialIcons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* CONTACT */}
        <div className="column">
          <h4>Contact Us</h4>
          <ul className="contactList">
            <li><FaMapMarkerAlt /> S-06, 2nd Floor, Momai Complex, Near Blue Club, Khodiyar Colony, Jamnagar 361001</li>
            <li><FaPhoneAlt /> +91 9714 883 884</li>
            <li><FaPhoneAlt /> +91 90 818 818 89</li>
            <li><FaEnvelope /> veloxsolutionpvtltd@gmail.com</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="column">
          <h4>Newsletters</h4>
          <p>Sign up to receive more tips and coupons for our services.</p>

          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={submitNewsletter}
              disabled={loading}
              style={{ position: "relative", zIndex: 50 }}
            >
              {loading ? "Submitting..." : "Subscribe"}
            </button>
          </div>

          {message && (
            <p style={{ marginTop: "10px", color: "orange" }}>{message}</p>
          )}
        </div>

      </div>

      <hr className="divider" />

      {/* CITIES */}
      <div className="serving">
        <p>Serving in</p>
        <div className="cities">
          {[
            "India",
            "Surat",
            "Jamnagar",
            "Ahmedabad",
            "Rajkot",
            "Porbandar",
            "Chiloda",
            "Morbi",
            "Adalaj",
          ].map((city) => (
            <button key={city}>{city}</button>
          ))}
        </div>
      </div>

      {/* LINKS */}
      <div className="bottomLinks">
        <a href="#">Terms & Conditions</a>
        <a href="#">Return & Refund Policy</a>
        <a href="#">Privacy Policy</a>
        <a href="#">End-User License Agreement</a>
        <a href="#">Disclaimer</a>
        <a href="#">Cookie Policy</a>
      </div>

      <div className="copyright">
        Copyright © 2021 All Rights Reserved
      </div>
    </footer>
  );
}
