"use client";

import styles from "../styles/income.module.css";
import Layout from "../pages/page";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
      <div className={styles.container}>
        {/* Header (breadcrumb) */}
        <div className={styles.headerContainer}> <div> 
          <span className={styles.breadcrumb}style={{ cursor: "pointer"}}>Income</span> 
           <span className={styles.separator}> | </span>
               <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
           <span> &gt; </span>
        <span className={styles.breadcrumbActive}>Income</span> </div> </div>

        {/* Page Title */}
        <div className={styles.titleSection}>
          <h3>Income</h3>
        </div>

        {/* Income Box */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>Income Details</div>

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
    </Layout>
  );
}
