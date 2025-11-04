"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from '../styles/order.module.css';
import Layout from '../../admin/pages/page';

export default function FranchiseOrderPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!searchParams) return;

    // Parse services string from URL
    const servicesString = searchParams.get("services") || "";
    const servicesArray = servicesString.split(",").map(s => s.trim()).filter(Boolean);

    const orderData = {
      id: searchParams.get("id"),
      user_name: searchParams.get("user_name") || "Not Provided",
      order_number: searchParams.get("order_number") || "-",
      amount: searchParams.get("total_amount") || "-",
      order_date: searchParams.get("date") || "-",
      payment_method: searchParams.get("payment") || "-",
      payment_status: searchParams.get("status") || "-",
      city: searchParams.get("city") || "-",
      services: servicesArray.map(serviceName => ({
        service_name: serviceName,
        price: searchParams.get("total_amount") || "-",
        professional: "Not Assigned",
        status: searchParams.get("status") || "pending",
        start_time: "-",
        end_time: "-",
      })),
    };

    setOrder(orderData);
  }, [searchParams]);

  if (!order) return <p>Loading...</p>;

  return (
    <Layout>
    <div className={styles.franchisecontainer}>
      <h2 className={styles.pageTitle}>Franchise Order Details</h2>

      <div className={styles.franchiseName}>
        Franchise Name: <span className={styles.viewvalue}>{order.user_name}</span>
      </div>

      {/* Order Details */}
      <div className={styles.franchisecard}>
        <h3 className={styles.cardHeader}>Order Details</h3>
        <div className={styles.rowItem}>
          <span className={styles.viewlabel}>Order Number:</span>
          <span className={styles.viewvalue}>{order.order_number}</span>
        </div>
        <div className={styles.rowItem}>
          <span className={styles.viewlabel}>Amount:</span>
          <span className={styles.viewvalue}>{order.amount}</span>
        </div>
        <div className={styles.rowItem}>
          <span className={styles.viewlabel}>Order Date:</span>
          <span className={styles.viewvalue}>{order.order_date}</span>
        </div>
        <div className={styles.rowItem}>
          <span className={styles.viewlabel}>Payment Method:</span>
          <span className={styles.viewvalue}>{order.payment_method}</span>
        </div>
        <div className={styles.rowItem}>
          <span className={styles.viewlabel}>Payment Status:</span>
          <span className={styles.viewvalue}>{order.payment_status}</span>
        </div>
       
      </div>

      {/* Services Ordered */}
      <div className={styles.viewcard1}>
        <h3 className={styles.cardHeader}>Services Ordered</h3>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Professional</th>
              <th>Status</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {order.services.map((srv, idx) => (
              <tr key={idx}>
                <td>{srv.service_name}</td>
                <td>{srv.price}</td>
                <td>{srv.professional}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      srv.status.toLowerCase() === "pending"
                        ? styles.pending
                        : srv.status.toLowerCase() === "completed"
                        ? styles.completed
                        : styles.declined
                    }`}
                  >
                    {srv.status}
                  </span>
                </td>
                <td>{srv.start_time}</td>
                <td>{srv.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
}
