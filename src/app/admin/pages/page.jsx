"use client";
import { useState } from "react";
import Sidebar from "../components/page";
import Header from "../components/Header";
import Footer from "../components/footer";
import styles from "../styles/dashboard.module.css";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    
    <div className={styles.container}>
      <Sidebar isOpen={menuOpen} onClose={closeMenu} />
      {menuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

      <div className={styles.content}>
        <Header toggleMenu={toggleMenu} />
        <main className={styles.main}>
        {children}  
        </main>
       
      </div>
       <div className={styles.footer}>
        <Footer/>
        </div>
    </div>
  );
}
