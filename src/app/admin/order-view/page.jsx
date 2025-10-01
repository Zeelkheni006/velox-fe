'use client';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/order.module.css';
import Layout from '../pages/page';

export default function OrderViewPage({ params }) {
  const searchParams = useSearchParams();
  const { id } = params;

  const user_name = searchParams.get('user_name'); // store first

  const order = {
    id,
    user_name,
    order_number: searchParams.get('order_number'),
    services: searchParams.get('services'),
    total_quantity: searchParams.get('total_quantity'),
    total_amount: searchParams.get('total_amount'),
    city: searchParams.get('city'),
    status: searchParams.get('status'),
    payment:searchParams.get('payment'),
    amount:searchParams.get('amount'),
    
    date:searchParams.get('date'),
    billing_name: searchParams.get('billing_name') || user_name, // use stored variable
    billing_address: searchParams.get('billing_address') || "Not Provided",
    billing_contact: searchParams.get('billing_contact') || "Not Provided",
  };

  return (
    <Layout>
      <div className={styles.viewcontainer}>
        <h2 className={styles.viewtitle}>Order Details</h2>

        {/* Order Details */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Order Details</h3>
          <p><span className={styles.viewlabel}>Order Number:</span> {order.order_number}</p>
          <p><span className={styles.viewlabel}>Total Quantity :</span> {order.total_quantity}</p>
          <p><span className={styles.viewlabel}>Amount :</span> {order.amount}</p>
          <p><span className={styles.viewlabel}>Order Date:</span> {order.date}</p>
          <p><span className={styles.viewlabel}>Payment Method:</span> {order.payment}</p>
          <p><span className={styles.viewlabel}>Payment Status:</span> {order.status}</p>
        </div>

        {/* Billing Details */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Billing Details</h3>
          <p><span className={styles.viewlabel}>Name:</span> {order.billing_name}</p>
          <p><span className={styles.viewlabel}>Address:</span> {order.billing_address}</p>
          <p><span className={styles.viewlabel}>Contact:</span> {order.billing_contact}</p>
          <p><span className={styles.viewlabel}>Total Amount:</span> ₹{order.total_amount}</p>
        </div>

        {/* Services Ordered */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Services Ordered</h3>
          <p><span className={styles.viewlabel}>Services:</span> {order.services}</p>
          <p><span className={styles.viewlabel}>Total Quantity:</span> {order.total_quantity}</p>
        </div>
      </div>
    </Layout>
  );
}
