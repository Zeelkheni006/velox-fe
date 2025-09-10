"use client";
import { useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import { useRouter } from 'next/navigation'; // for App Router (Next.js 13+)


import {
  FaUserCog, FaUsers, FaProjectDiagram, FaStore,
  FaTags, FaList, FaWrench, FaGift, FaStar,
  FaCreditCard, FaChartBar, FaHome, FaChevronDown,
  FaNewspaper, FaImage, FaExchangeAlt, FaQuoteRight, FaGlobe, FaChevronUp,
  FaCog, FaTrash
} from 'react-icons/fa';
const Sidebar = ({ isOpen, onClose }) => {
  
 const router = useRouter()
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };


  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
     
      <div className={styles.logo}>
        <img src="/images/logo_text1.png" alt="Logo" className={styles.logoImg} />
        <span className={styles.logoText}></span>
           <span className={styles['close-btn']} onClick={onClose}>×</span>
      </div>

      <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/dashboard'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
>
        <FaHome /><span>Dashboard</span>
      </div>

      <div className={styles.sectionTitle}>MANAGE USERS</div>
      <div className={styles.menuItem} onClick={() => toggleMenu('roles')}>
        <FaUserCog /><span>Manage Roles</span> {openMenus.roles ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
     {openMenus.roles && (
  <div className={styles.subMenu}>
    <div onClick={() => {
      router.push('/admin/roles');
      onClose();
    }}>
      Roles
    </div>
  </div>
)}

      <div className={styles.menuItem} onClick={() => toggleMenu('users')}>
        
        <FaUsers /><span>Manage Users</span>{openMenus.users ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
     {openMenus.users && (
  <div className={styles.subMenu}>
    <div onClick={() => {
      router.push('/admin/staff'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
      Manage Staff
    </div>

    <div onClick={() => {
      router.push('/admin/customer'); // 🔁 change this path to your customer page
      onClose();
    }}>
      Manage Customer
    </div>
  </div>
)}

      <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/lead'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
>
        <FaProjectDiagram /><span>Lead</span>
      </div>

      <div className={styles.menuItem} onClick={() => toggleMenu('franchise')}>
        <FaStore /><span>Manage Franchise</span>{openMenus.franchise ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.franchise && <div className={styles.subMenu}>  <div onClick={() => {
      router.push('/admin/franchises'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
      Franchise
    </div>Franchise user</div>}

      <div className={styles.sectionTitle}>MANAGE SERVICE</div>
      <div className={styles.menuItem}><FaList /><span>Category</span></div>
      <div className={styles.menuItem}><FaTags /><span>Our Brand Ambassador</span></div>
      <div className={styles.menuItem}><FaProjectDiagram /><span>Sub Category</span></div>

      <div className={styles.menuItem} onClick={() => toggleMenu('services')}>
        <FaWrench /><span>Services</span>{openMenus.services ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.services && <div className={styles.subMenu}>Services<br />Best Services</div>}

      <div className={styles.menuItem}><FaList /><span>Package</span></div>

      <div className={styles.menuItem} onClick={() => toggleMenu('orders')}>
        <FaTags /><span>Orders</span>{openMenus.orders ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.orders && <div className={styles.subMenu}>Orders<br />Unallocated Order</div>}

      <div className={styles.menuItem} onClick={() => toggleMenu('offers')}>
        <FaGift /><span>Offers</span>{openMenus.offers ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.offers && <div className={styles.subMenu}>Offer<br />Best Offer</div>}

      <div className={styles.menuItem}><FaGift /><span>Gift</span></div>

      <div className={styles.menuItem} onClick={() => toggleMenu('rating')}>
        <FaStar /><span>Rating</span>{openMenus.rating ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.rating && <div className={styles.subMenu}>Service Rating<br/>Testimonial</div>}

      <div className={styles.sectionTitle}>ACCOUNTS</div>
      <div className={styles.menuItem} onClick={() => toggleMenu('accounts')}>
        <FaChartBar /><span>Accounts</span>{openMenus.accounts ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.accounts && <div className={styles.subMenu}>Income<br />Franchices Fees<br/>Franchise Outstanding</div>}

      <div className={styles.sectionTitle}>PAYMENTS</div>
      <div className={styles.menuItem}><FaCreditCard /><span>Payments</span></div>
      <div className={styles.menuItem} onClick={() => toggleMenu('credit')}>
        <FaCreditCard /><span>Credit</span>{openMenus.credit ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.credit && <div className={styles.subMenu}>Credit Plans<br />Custome plans</div>}

      <div className={styles.sectionTitle}>MANAGE CONTENT</div>
      <div className={styles.menuItem}><FaNewspaper /><span>News Letter</span></div>
      <div className={styles.menuItem}><FaImage /><span>Slider</span></div>
      <div className={styles.menuItem}><FaExchangeAlt /><span>Referral Program</span></div>

      <div className={styles.menuItem} onClick={() => toggleMenu('quotes')}>
        <FaQuoteRight /><span>Request Quotes</span>{openMenus.quotes ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.quotes && <div className={styles.subMenu}>Request<br />Followups</div>}

      <div className={styles.menuItem} onClick={() => toggleMenu('pages')}>
        <FaGlobe /><span>Manage Pages</span>{openMenus.pages ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.pages && <div className={styles.subMenu}>About Us<br />Blogs<br />Contact Us</div>}

      <div className={styles.sectionTitle}>OTHERS</div>
      <div className={styles.menuItem} onClick={() => toggleMenu('settings')}>
        <FaCog /><span>General Settings</span>{openMenus.settings ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.settings && <div className={styles.subMenu}>Logo</div>}

      <div className={styles.menuItem}><FaTrash /><span>Clear Cache</span></div>
      
    </div>
  );
};

export default Sidebar;
