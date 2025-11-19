"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Sidebar.module.css';
import { FaBell } from 'react-icons/fa';
import { useRouter } from "next/navigation";

// 🔵 Icons
import { AiOutlineUser } from "react-icons/ai"; // Edit profile icon
import { IoMdLock } from "react-icons/io";      // Change password icon
import { SlPower } from "react-icons/sl";       // Logout icon

const Header = ({ toggleMenu }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 375);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header className={styles.header}>
      {isMobile && (
        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>
      )}

      <div className={styles.rightSection}>
        <div className={styles.notification}>
          <FaBell />
          <span className={styles.badge}>0</span>
        </div>

        <span className={styles.adminText}>Admin</span>

        {/* Profile */}
        <div
          className={styles.profileWrapper}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Image
            src="/icon/image-1.png"
            alt="User"
            className={styles.profilePic}
            width={32}
            height={32}
          />
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className={styles.dropdownMenu}>
            
            {/* EDIT PROFILE */}
            <div
              className={styles.dropdownItem}
              onClick={() => router.push("/edit-profile")}
            >
              <AiOutlineUser className={styles.dropdownIcon} />
              <span>EDIT PROFILE</span>
            </div>

            {/* CHANGE PASSWORD */}
            <div
              className={styles.dropdownItem}
              onClick={() => router.push("/admin/change-password")}
            >
              <IoMdLock className={styles.dropdownIcon} />
              <span>CHANGE PASSWORD</span>
            </div>

            {/* LOGOUT */}
            <div
              className={styles.dropdownItem}
              onClick={() => router.push("/logout")}
            >
              <SlPower className={styles.dropdownIcon} />
              <span>LOGOUT</span>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
