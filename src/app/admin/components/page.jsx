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
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
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
         <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/roles'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
>
        <FaUserCog /><span>Manage Roles</span> 
      </div>
  

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
    </div><div onClick={() => {
      router.push('/admin/franchises-user'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
      Franchise-user
    </div></div>}

      <div className={styles.sectionTitle}>MANAGE SERVICE</div>
       <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/categories'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
><FaList /><span>Category</span></div>
          <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/ambassador'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
><FaTags /><span>Our Brand Ambassador</span></div>
       <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/sub-categories'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
><FaProjectDiagram /><span>Sub Category</span></div>

      <div className={styles.menuItem} onClick={() => toggleMenu('services')}>
        <FaWrench /><span>Services</span>{openMenus.services ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.services && <div className={styles.subMenu}> <div onClick={() => {
      router.push('/admin/services'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
      Services
    </div> <div onClick={() => {
      router.push('/admin/best-service'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
Best Services
    </div></div>}

          <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/package'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
>
  <FaList /><span>Package</span></div>

      <div className={styles.menuItem} onClick={() => toggleMenu('orders')}>
        <FaTags /><span>Orders</span>{openMenus.orders ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.orders && <div className={styles.subMenu}><div onClick={() => {
      router.push('/admin/orders'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
      Orders
    </div> <div onClick={() => {
      router.push('/admin/unallocated-order'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
      Unallocated Orders
    </div></div>}

      <div className={styles.menuItem} onClick={() => toggleMenu('offers')}>
        <FaGift /><span>Offers</span>{openMenus.offers ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.offers && <div className={styles.subMenu}><div onClick={() => {
      router.push('/admin/offer'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
      Offer
    </div><div onClick={() => {
      router.push('/admin/best-offer'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
    Best Offer
    </div></div>}

               <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/gift'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
><FaGift /><span>Gift</span></div>

      <div className={styles.menuItem} onClick={() => toggleMenu('rating')}>
        <FaStar /><span>Rating</span>{openMenus.rating ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.rating && <div className={styles.subMenu}><div onClick={() => {
      router.push('/admin/service-rating'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>
      Service Rating
    </div><div onClick={() => {
      router.push('/admin/testimonial'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Testimonial</div></div>}

      <div className={styles.sectionTitle}>ACCOUNTS</div>
      <div className={styles.menuItem} onClick={() => toggleMenu('accounts')}>
        <FaChartBar /><span>Accounts</span>{openMenus.accounts ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.accounts && <div className={styles.subMenu}><div onClick={() => {
      router.push('/admin/income'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Income</div><div onClick={() => {
      router.push('/admin/franchise_fees'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Franchices Fees</div><div onClick={() => {
      router.push('/admin/franchise_outstanding'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Franchise Outstanding</div></div>}

      <div className={styles.sectionTitle}>PAYMENTS</div>
      <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/payments'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
><FaCreditCard /><span>Payments</span></div>
      <div className={styles.menuItem} onClick={() => toggleMenu('credit')}>
        <FaCreditCard /><span>Credit</span>{openMenus.credit ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.credit && <div className={styles.subMenu}><div onClick={() => {
      router.push('/admin/credit-plan'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Credit Plans</div><div onClick={() => {
      router.push('/admin/custome-plan'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Custome plans</div></div>}

      <div className={styles.sectionTitle}>MANAGE CONTENT</div>
           <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/news-latter'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
><FaNewspaper /><span>News Letter</span></div>
      <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/slider'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
><FaImage /><span>Slider</span></div>
            <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/referral-program'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
><FaExchangeAlt /><span>Referral Program</span></div>

      <div className={styles.menuItem} onClick={() => toggleMenu('quotes')}>
        <FaQuoteRight /><span>Request Quotes</span>{openMenus.quotes ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.quotes && <div className={styles.subMenu}><div onClick={() => {
      router.push('/admin/request'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Request</div><div onClick={() => {
      router.push('/admin/followup'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Followups</div></div>}

      <div className={styles.menuItem} onClick={() => toggleMenu('pages')}>
        <FaGlobe /><span>Manage Pages</span>{openMenus.pages ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.pages && <div className={styles.subMenu}><div onClick={() => {
      router.push('/admin/admin-about'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>About Us</div><div onClick={() => {
      router.push('/admin/admin-blog'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Blogs</div><div onClick={() => {
      router.push('/admin/admin-contact'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Contact Us</div></div>}

      <div className={styles.sectionTitle}>OTHERS</div>
      <div className={styles.menuItem} onClick={() => toggleMenu('settings')}>
        <FaCog /><span>General Settings</span>{openMenus.settings ? (
          <FaChevronDown className={styles.arrow} />  // Show up arrow when open
        ) : (
          <FaChevronUp className={styles.arrow} />  // Show down arrow when closed
        )}
      </div>
      {openMenus.settings && <div className={styles.subMenu}><div onClick={() => {
      router.push('/admin/general-settings-logo'); // 🔁 change this path to your actual staff page
      onClose(); // optional: close sidebar on mobile
    }}>Logo</div></div>}

       <div
  className={styles.menuItem}
  onClick={() => {
    router.push('/admin/dashboard'); // or '/dashboard' depending on your routing structure
    onClose(); // this closes the sidebar if it's on mobile
  }}
><FaTrash /><span>Clear Cache</span></div>
      
    </div>
  );
};

export default Sidebar;
