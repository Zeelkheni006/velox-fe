"use client";
import { useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import { useRouter } from 'next/navigation'; 
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
  setOpenMenus((prev) => {
    // If the clicked menu is already open, close it
    if (prev[menu]) {
      return {};
    } else {
      // Open the clicked menu, close all others
      return { [menu]: true };
    }
  });
};

const [collapsed, setCollapsed] = useState(false);

const toggleSidebar = () => {
  setCollapsed(!collapsed);
};

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
     
      <div className={styles.logo}>
        <img src="/images/logo_text1.png" alt="Logo" className={styles.logoImg} />
        <span className={styles.logoText}></span>
           <span className={styles['close-btn']} onClick={onClose}>×</span>
      </div>
  

  <a
  href="/admin/dashboard"
  className={styles.menuItem}
  onClick={onClose}  // mobile sidebar close
>
  <FaHome />
  <span>Dashboard</span>
</a>

      <div className={styles.sectionTitle}>MANAGE USERS</div>
<a
  href="/admin/roles"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaUserCog />
  <span>Manage Roles</span>
</a>
  

      <div className={styles.menuItem} onClick={() => toggleMenu('users')}>
        
        <FaUsers /><span>Manage Users</span>{openMenus.users ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
     {openMenus.users && (
  <div className={styles.subMenu}>
  <a
  href="/admin/staff"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Manage Staff
</a>

   <a
  href="/admin/customer"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Manage Customer
</a>
  </div>
)}

      {/* <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/lead');
    onClose(); 
  }}
>
        <FaProjectDiagram /><span>Lead</span>
      </div> */}
<a href="/admin/lead" className={styles.menuItem} onClick={onClose}>
  <FaProjectDiagram /><span>Lead</span>
</a>
      <div className={styles.menuItem} onClick={() => toggleMenu('franchise')}>
        <FaStore /><span>Manage Franchise</span>{openMenus.franchise ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.franchise && <div className={styles.subMenu}> 
         <a href='/admin/franchises' className={styles.subMenuItem}// 🔁 change this path to your actual staff page
      onClick={onclick}>
      Franchise
    </a>
<a
  href="/admin/franchises-user"
  className={styles.subMenuItem}
  onClick={onClose}
>
  <span>Franchise-user</span>
</a>
    </div>}

      <div className={styles.sectionTitle}>MANAGE SERVICE</div>
<a
  href="/admin/categories"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaList />
  <span>Category</span>
</a>
<a
  href="/admin/ambassador"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaTags />
  <span>Our Brand Ambassador</span>
</a>
   <a
  href="/admin/sub-categories"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaProjectDiagram />
  <span>Sub Category</span>
</a>

      <div className={styles.menuItem} onClick={() => toggleMenu('services')}>
        <FaWrench /><span>Services</span>{openMenus.services ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.services && <div className={styles.subMenu}> 
      <a
  href="/admin/services"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Services
</a> <a
  href="/admin/best-service"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Best Services
</a></div>}

     <a
  href="/admin/package"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaList /><span>Package</span>
</a>

      <div className={styles.menuItem} onClick={() => toggleMenu('orders')}>
        <FaTags /><span>Orders</span>{openMenus.orders ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.orders && <div className={styles.subMenu}>
    <a
  href="/admin/orders"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Orders
</a>  
<a
  href="/admin/unallocated-order"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Unallocated Orders
</a></div>}

      <div className={styles.menuItem} onClick={() => toggleMenu('offers')}>
        <FaGift /><span>Offers</span>{openMenus.offers ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.offers && <div className={styles.subMenu}><a
  href="/admin/offer"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Offer
</a><a
  href="/admin/best-offer"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Best Offer
</a></div>}

<a
  href="/admin/gift"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaGift /><span>Gift</span>
</a>

      <div className={styles.menuItem} onClick={() => toggleMenu('rating')}>
        <FaStar /><span>Rating</span>{openMenus.rating ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.rating && <div className={styles.subMenu}>
        <a
  href="/admin/service-rating"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Service Rating
</a>
    <a
  href="/admin/testimonial"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Testimonial
</a>
    </div>}

      <div className={styles.sectionTitle}>ACCOUNTS</div>
      <div className={styles.menuItem} onClick={() => toggleMenu('accounts')}>
        <FaChartBar /><span>Accounts</span>{openMenus.accounts ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.accounts && <div className={styles.subMenu}>
     <a
  href="/admin/income"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Income
</a><a
  href="/admin/franchise_fees"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Franchices Fees
</a><a
  href="/admin/franchise_outstanding"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Franchise Outstanding
</a></div>}

      <div className={styles.sectionTitle}>PAYMENTS</div>
   <a
  href="/admin/payments"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaCreditCard />
  <span>Payments</span>
</a>
      <div className={styles.menuItem} onClick={() => toggleMenu('credit')}>
        <FaCreditCard /><span>Credit</span>{openMenus.credit ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.credit && <div className={styles.subMenu}><a
  href="/admin/credit-plan"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Credit Plans
</a><a
  href="/admin/custome-plan"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Custome Plans
</a>
</div>}

      <div className={styles.sectionTitle}>MANAGE CONTENT</div>
    <a
  href="/admin/news-latter"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaNewspaper /><span>News Letter</span>
</a>

<a
  href="/admin/slider"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaImage /><span>Slider</span>
</a>
   <a
  href="/admin/referral-program"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaExchangeAlt />
  <span>Referral Program</span>
</a>


      <div className={styles.menuItem} onClick={() => toggleMenu('quotes')}>
        <FaQuoteRight /><span>Request Quotes</span>{openMenus.quotes ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.quotes && <div className={styles.subMenu}><a
  href="/admin/request"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Request
</a>
<a
  href="/admin/followup"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Followups
</a></div>}

      <div className={styles.menuItem} onClick={() => toggleMenu('pages')}>
        <FaGlobe /><span>Manage Pages</span>{openMenus.pages ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.pages && <div className={styles.subMenu}><a
  href="/admin/admin-about"
  className={styles.subMenuItem}
  onClick={onClose}
>
  About Us
</a>
<a
  href="/admin/admin-blog"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Blogs
</a>
<a
  href="/admin/admin-contact"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Contact Us
</a>
</div>}

      <div className={styles.sectionTitle}>OTHERS</div>
      <div className={styles.menuItem} onClick={() => toggleMenu('settings')}>
        <FaCog /><span>General Settings</span>{openMenus.settings ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.settings && <div className={styles.subMenu}><a
  href="/admin/general-settings-logo"
  className={styles.subMenuItem}
  onClick={onClose}
>
  Logo
</a>
</div>}
<a
  href="/admin/dashboard"
  className={styles.menuItem}
  onClick={onClose}
>
  <FaTrash />
  <span>Clear Cache</span>
</a>

      
    </div>
  );
};

export default Sidebar;
