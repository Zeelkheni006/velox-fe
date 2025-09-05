'use client';

import Image from 'next/image';
import Link from 'next/link';
import './admin-login.css'; // ✅ Import the CSS file

export default function AdminLoginPage() {
  return (
    
      <div className="admin-login-wrapper">
         <div className="pill-shape pill1"></div>
      <div className="pill-shape pill2"></div>
       <div className="pill-shape pill3"></div>
      <div className="pill-shape pill4"></div>
      <div className="pill-shape pill5"></div>
      <div className="pill-shape pill6"></div>
        <div className="admin-login-card">

        {/* Left: Login Form */}
         <div className="admin-login-form">
          <h2 className="text-2xl font-semibold text-center mb-2">Login Now</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Welcome Back, Please Sign In Below
          </p>

          <label className="block mb-1 text-sm font-medium text-gray-700">EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="Type Email Address"
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:border-blue-400"
          />

          
          <div className="forgot-link">
            <span></span>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex justify-center items-center gap-2 transition">
            Login
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* Right: Logo */}
         <div className="admin-login-logo">
          <Image
            src="/images/logo.png" // put this in public/images/
            alt="Velox Logo"
            width={300}
            height={70}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
