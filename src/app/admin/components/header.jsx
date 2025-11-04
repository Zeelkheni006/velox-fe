"use client";
import { useState, useEffect } from 'react'; // ✅ Make sure to import useEffect
import Image from 'next/image';
import styles from '../styles/Sidebar.module.css';
import { FaBell } from 'react-icons/fa';

const Header = ({ toggleMenu }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 375); // or 375 if you're targeting small phones only
    };

    checkMobile(); // initial check
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header className={styles.header}>
      {/* ✅ Conditionally show hamburger on mobile */}
      {isMobile && (
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      )}

      <div className={styles.rightSection}>
        <div className={styles.notification}>
          <FaBell />
          <span className={styles.badge}>0</span>
        </div>
        <span className={styles.adminText}>Admin</span>
        <Image
          src="/icon/image-1.png"
          alt="User"
          className={styles.profilePic}
          width={32}
          height={32}
        />
      </div>
    </header>
  );
};

export default Header;
