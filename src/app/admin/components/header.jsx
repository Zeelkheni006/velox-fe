"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Sidebar.module.css';
import { useRouter } from "next/navigation";
import { VscBell } from "react-icons/vsc";
import { fetchNotifications,clearNotification} from "../../api/admin-dashboard/header"
import { AiOutlineUser } from "react-icons/ai"; // Edit profile icon
import { IoMdLock } from "react-icons/io";      // Change password icon
import { SlPower } from "react-icons/sl";       // Logout icon

const Header = ({ toggleMenu }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [notificationCount, setNotificationCount] = useState(0); 
  const [notifications, setNotifications] = useState({});

  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 375);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();
      setNotifications(data?.message || {});
      const total = data?.message
        ? Object.values(data.message).reduce((sum, val) => sum + val, 0)
        : 0;
      setNotificationCount(total);
    };
    loadNotifications();

    const interval = setInterval(loadNotifications, 50000);
    return () => clearInterval(interval);
  }, []);
const handleNotificationClick = async (type) => {
  try {
    await clearNotification(); // call API

    // UI update
    setNotificationCount(0);
    setNotifications({});
  } catch (error) {
    console.error("Error clearing notification:", error);
  }
};

  return (
    <header className={styles.header}>
      {isMobile && (
        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>
      )}

      <div className={styles.rightSection}>

        {/* Notification Bell */}
        <div className={styles.notificationWrapper}>
          <div
            className={styles.animatedBell}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <VscBell />
           
          </div>
 <span className={styles.badge}>{notificationCount}</span>
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              {notificationCount > 0 ? (
                Object.entries(notifications).map(([type, count]) => (
 <p
  key={type}
  className={styles.notification}
  onClick={() => handleNotificationClick(type)}
>
  {count} {type} notification{count > 1 ? "s" : ""}
</p>

                ))
              ) : (
                <p>No Notifications</p>
              )}
            </div>
          )}
        </div>

        <span className={styles.adminText}>Admin</span>

        {/* Profile */}
        <div
          className={styles.profileWrapper}
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          <Image
            src="/icon/image-1.png"
            alt="User"
            className={styles.profilePic}
            width={32}
            height={32}
          />
        </div>

        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div className={styles.dropdownMenu}>
            <div
              className={styles.dropdownItem}
              onClick={() => router.push("/admin/edit-profile")}
            >
              <AiOutlineUser className={styles.dropdownIcon} />
              <span>EDIT PROFILE</span>
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() => router.push("/admin/change-password")}
            >
              <IoMdLock className={styles.dropdownIcon} />
              <span>CHANGE PASSWORD</span>
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() => router.push("/admin")}
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
