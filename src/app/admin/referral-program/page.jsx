"use client";

import { useState } from "react";
import Layout from "../pages/page";
import styles from "../styles/referral.module.css";

export default function ReferralProgram() {
  const [referralValue, setReferralValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ referralValue, maxValue, isActive });
    alert("Referral Program submitted!");
  };

  return (
    <Layout>
      <div className={styles.container}>
               <div className={styles.headerContainer}>
                  <div>
                    <span className={styles.breadcrumb}>Credit Plan</span> &gt;{' '}
                    <span className={styles.breadcrumbActive}>Credit Plan</span>
                  </div>
                </div>
                 <div className={styles.card}>
        <h2 className={styles.title}>Referral Program</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Referral Value */}
          <label className={styles.label}>
            Referral Value
            <input
              type="number"
              value={referralValue}
              onChange={(e) => setReferralValue(e.target.value)}
              className={styles.input}
              placeholder="Enter referral value"
            />
          </label>

          {/* Max Value */}
          <label className={styles.label}>
            Max Value
            <input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              className={styles.input}
              placeholder="Enter max value"
            />
          </label>

          {/* Checkbox */}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Please check to activate this program
          </label>

          <button type="submit" className={styles.submitBtn}>
            SUBMIT
          </button>
        </form>
      </div>
      </div>
    </Layout>
  );
}
