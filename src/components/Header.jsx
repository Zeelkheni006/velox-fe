// import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaPhoneAlt, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import '../app/main.css'; 
export default function Header() {

  return (
    <header>
      {/* Top Bar */}
      <div className="header-top">
        <div className="left">
          <span>💻 24 Hour Service - 7 Days a Week</span>
          <span><FaPhoneAlt /> +91 9714 883 884</span>
          <span><FaPhoneAlt /> +91 90818 81889</span>
        </div>
        <div className="right">
          <FaTwitter />
          <FaFacebookF />
          <FaLinkedinIn />
          <FaInstagram />
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="logo">
          <Image
            src="/images/logo.png"
            alt="Velox Logo"
            width={200}
            height={50}
            priority
          />
        </div>

        <div className="nav-right">
          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/register">Register as a Professional</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
        </div>

        <div className="right-section">
          <div className="cart">
            <FaShoppingCart />
            <span>0</span>
          </div>
          <div className="auth-links" >
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </div>
          
            
         
        </div>
      </div>
    </header>
  );
}
