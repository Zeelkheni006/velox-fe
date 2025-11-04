// components/ScrollToTopButton.jsx
"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "../styles/sidebar.module.css"; // Make sure path is correct

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return isVisible ? (
    <button onClick={scrollToTop} className={styles.scrollToTopBtn}>
      <FaArrowUp />
    </button>
  ) : null;
};

export default ScrollToTopButton;
