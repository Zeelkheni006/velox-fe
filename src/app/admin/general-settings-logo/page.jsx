"use client";

import { useState } from "react";
import Layout from "../pages/page";
import styles from "../styles/logo.module.css";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";

export default function LogoPage() {
  const [headerLogo, setHeaderLogo] = useState(null);
  const [footerLogo, setFooterLogo] = useState(null);
  const [invoiceLogo, setInvoiceLogo] = useState(null);
  const router = useRouter();

  const handleSubmit = (type) => {
    alert(`${type} uploaded successfully!`);
  };
  const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
       <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}style={{ cursor: "pointer"}}>Logo</span> 
               <span className={styles.separator}> | </span>
                           <SlHome
                                  style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                  onClick={goToDashboard}
                                  title="Go to Dashboard"
                                />
                       <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Logo</span>
          </div>
        </div>
      <div className={styles.container}>
     
        <div className={styles.card}>

          <span className={styles.cardTitle}>HEADER LOGO</span>
          <input
            type="file"
            className={styles.fileInput}
            onChange={(e) => setHeaderLogo(e.target.files[0])}
          />
          <hr className={styles.line} />
          <button
            className={styles.submitBtn}
            onClick={() => handleSubmit("Header Logo")}
          >
            Submit
          </button>
        </div>

        <div className={styles.card}>
          <span className={styles.cardTitle}>FOOTER LOGO</span>
          <input
            type="file"
            className={styles.fileInput}
            onChange={(e) => setFooterLogo(e.target.files[0])}
          />
          <hr className={styles.line} />
          <button
            className={styles.submitBtn}
            onClick={() => handleSubmit("Footer Logo")}
          >
            Submit
          </button>
        </div>

        <div className={styles.card}>
          <span className={styles.cardTitle}>INVOICE LOGO</span>
          <input
            type="file"
            className={styles.fileInput}
            onChange={(e) => setInvoiceLogo(e.target.files[0])}
          />
          <hr className={styles.line} />
          <button
            className={styles.submitBtn}
            onClick={() => handleSubmit("Invoice Logo")}
          >
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
}
