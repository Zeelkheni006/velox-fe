'use client';
import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { FaPhoneAlt, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaShoppingCart ,FaMapMarkerAlt, FaSearch, FaTimes} from 'react-icons/fa';
import Image from 'next/image';
import '../app/main.css'; 
import "./media.css";
export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Show sticky header after 50px of scrolling
    if (scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
   const [isMenuOpen, setIsMenuOpen] = useState(false );
  const [isMobile, setIsMobile] = useState(false);

  // Toggle menu function
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 840);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
    
  return (
    <>
       <header className="relative z-50">
      {/* Top Bar */}
      <div className="header-top bg-black text-white text-xs px-4 py-2 flex justify-between items-center">
        <div className="left flex flex-col sm:flex-row sm:gap-4">
          <span>💻 24 Hour Service - 7 Days a Week</span>
          <span><FaPhoneAlt className="inline mr-1" /> +91 9714 883 884</span>
          <span><FaPhoneAlt className="inline mr-1" /> +91 90818 81889</span>
        </div>
        <div className="right flex gap-3 text-sm">
          <FaTwitter />
          <FaFacebookF />
          <FaLinkedinIn />
          <FaInstagram />
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main flex items-center justify-between px-4 py-3 bg-white relative">
        {/* Logo */}
        <div className="logo">
          <Image src="/images/logo.png" alt="Velox Logo" width={180} height={40}  className="md:w-[120px] md:h-[35px]" />
        </div>

        {/* Cart + Auth + Hamburger */}
    <nav className={`hidden md:flex gap-6`}>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
    <Link href="/registerprofessional">Register as a Professional</Link>
    <Link href="/blogs">Blogs</Link>
    <Link href="/contact">Contact Us</Link>
  </nav>

  {/* Cart */}
  <div className="cart relative">
    <FaShoppingCart className="text-xl" />
    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
  </div>

  {/* Auth links for desktop (hidden on small) */}
 

  {/* Mobile only: Auth + Hamburger */}

    <div className=" auth-links ">
      <Link href="/login">Login</Link> / <Link href="/signup">Sign Up</Link>
    </div>
     {isMobile && (
            <button 
              className="hamburger "
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          )}  
  
</div>

{/* Mobile menu */}
{isMobile && isMenuOpen && (

     <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
    <Link href="/" onClick={toggleMenu}>Home</Link>
    <Link href="/about" onClick={toggleMenu}>About</Link>
    <Link href="/registerprofessional" onClick={toggleMenu}>Register as a Professional</Link>
    <Link href="/blogs" onClick={toggleMenu}>Blogs</Link>
    <Link href="/contact" onClick={toggleMenu}>Contact Us</Link>
  </div>
)}
    </header>
      {isSticky && (
           <div className="sticky-header fixed top-0 left-0 right-0 z-50 w-full bg-black text-white px-4 py-3 flex items-center justify-between">
            <div className="logo">
              <Image src="/images/logo_text1.png" alt="Logo" width={150} height={35} />
            </div>
            
          <nav className="sticky-nav">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/registerprofessional">Register as a Professional</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/contact">Contact Us</Link>
              </nav>

          <div className="search-group">
    {/* Location Input */}
    <div className="location-input">
      <input type="text" placeholder="Enter Location" />
      <span className="input-icon"><FaMapMarkerAlt /></span>
    </div>

    {/* Search Input */}
    <div className="search">
      <input type="text" placeholder="Search for services..." />
      <span className="input-search"><FaSearch /></span>
    </div>
  </div>
  <div className="cart-sticky">
              <FaShoppingCart />
              <span>0</span>
            </div>

            <div className="auth-links">
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
      )}
      {isSticky && isMobile && (
  <div className="mobile-sticky-header fixed top-0 left-0 right-0 w-full bg-black text-white shadow z-50 px-4 py-3 flex items-center justify-between">
    <div className="logo">
      <Image src="/images/logo_text1.png" alt="Logo" width={120} height={30} />
    </div>

    <div className="flex items-center gap-3">
      <div className="relative">
        <FaShoppingCart className="text-xl" />
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
      </div>

      <div className="auth-links text-orange-600 text-sm gap-2 hidden sm:flex">
        <Link href="/login">Login</Link> / <Link href="/signup">Sign Up</Link>
      </div>

      <button 
        className="hamburger text-2xl ml-2"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </div>

    {/* Mobile Menu */}
   { isMenuOpen && (
       <div className="sticky-mobile-nav fixed top-[60px] left-0 right-0 bg-white text-black w-full px-4 py-2 z-40 shadow">
       <Link href="/" onClick={toggleMenu} className="block py-2 border-b">Home</Link>
        <Link href="/about" onClick={toggleMenu} className="block py-2 border-b">About</Link>
        <Link href="/registerprofessional" onClick={toggleMenu} className="block py-2 border-b">Register as a Professional</Link>
        <Link href="/blogs" onClick={toggleMenu} className="block py-2 border-b">Blogs</Link>
        <Link href="/contact" onClick={toggleMenu} className="block py-2">Contact Us</Link>
      </div>
    )}
  </div>
)}


    </>
  );
} 