'use client';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/order.module.css';
import Layout from '../pages/page';

export default function OrderViewPage({ params }) {
  const searchParams = useSearchParams();
  const { id } = params;

  const user_name = searchParams.get('user_name');

  const order = {
    id,
    user_name,
    order_number: searchParams.get('order_number'),
    services: searchParams.get('services'),
    total_quantity: searchParams.get('total_quantity'),
    total_amount: searchParams.get('total_amount'),
    city: searchParams.get('city'),
    status: searchParams.get('status'),
    payment: searchParams.get('payment'),
    amount: searchParams.get('amount'),
    email: searchParams.get('email'),
    date: searchParams.get('date'),
    billing_name: searchParams.get('billing_name') || user_name,
    billing_address: searchParams.get('billing_address') || "Not Provided",
    billing_contact: searchParams.get('billing_contact') || "Not Provided",
  };

  return (
    <Layout>
      <div className={styles.viewcontainer}>
        <h2 className={styles.viewtitle}>Orders View</h2>

        {/* Order + Billing side by side */}
        <div className={styles.row}>
          {/* Order Details */}
     <div className={styles.viewcard}>
  <h3 className={styles.cardHeader}>Order Details</h3>
  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Order Number :</span>
    <span className={styles.viewvalue}>{order.order_number}</span>
  </p>
  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Total Quantity :</span>
    <span className={styles.viewvalue}>{order.total_quantity}</span>
  </p>
  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Amount :</span>
    <span className={styles.viewvalue}>{order.total_amount}</span>
  </p>
  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Order Date :</span>
    <span className={styles.viewvalue}>{order.date}</span>
  </p>
  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Payment Method :</span>
    <span className={styles.viewvalue}>{order.payment}</span>
  </p>
  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Payment Status :</span>
    <span className={styles.viewvalue}>{order.status}</span>
  </p>
</div>

          {/* Billing Details */}
       <div className={styles.billingcard}>
  <h3 className={styles.cardHeader}>Billing Details</h3>

  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Name :</span>
    <span className={styles.viewvalue}>{order.billing_name}</span>
  </p>

  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Email :</span>
    <span className={styles.viewvalue}>{order.email}</span>
  </p>

  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Phone :</span>
    <span className={styles.viewvalue}>{order.billing_contact}</span>
  </p>

  <p className={styles.rowItem}>
    <span className={styles.viewlabel}>Address :</span>
    <span className={styles.viewvalue}>{order.billing_address}</span>
  </p>
</div>
        </div>

        {/* Services Ordered */}
        <div className={styles.viewcard1}>
          <h3 className={styles.cardHeader}>Service Ordered</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.services}</td>
                <td>{order.total_amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
