"use client";

import styles from "../styles/income.module.css"; // create this CSS file
import Layout from "../pages/page";

export default function IncomePage() {
  const incomeData = {
    totalOnline: 140392.0,
    totalOffline: 15621.0,
    totalRefundable: 563.0,
    totalRefunded: 0.0,
    franchisePayment: 105078.6,
    commission: 9717.0,
    totalIncome: 50371.4,
  };

  return (
    <Layout>
        <div className={styles.Incomepage}>
    <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Income</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Income</span>
          </div>
        </div>
        
      <div className={styles.card}>
        <div className={styles.cardHeader}>Income</div>

        <div className={styles.cardBody}>
          <div className={styles.row}>
            <span>Total Online Payments :</span>
            <span>{incomeData.totalOnline.toLocaleString()}</span>
          </div>
          <div className={styles.row}>
            <span>Total Offline Payments :</span>
            <span>{incomeData.totalOffline.toLocaleString()}</span>
          </div>
          <div className={styles.row}>
            <span>Total Refundable Amount :</span>
            <span>{incomeData.totalRefundable.toLocaleString()}</span>
          </div>
          <div className={styles.row}>
            <span>Total Refunded Amount :</span>
            <span>{incomeData.totalRefunded.toLocaleString()}</span>
          </div>
          <div className={styles.row}>
            <span>Franchises Amount (Overall Payment To Pay) :</span>
            <span>{incomeData.franchisePayment.toLocaleString()}</span>
          </div>
          <div className={styles.row}>
            <span>Commission From Franchises :</span>
            <span>{incomeData.commission.toLocaleString()}</span>
          </div>
          <div className={`${styles.row} ${styles.totalRow}`}>
            <span>Total Income :</span>
            <span>{incomeData.totalIncome.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    </Layout>
  );
}
