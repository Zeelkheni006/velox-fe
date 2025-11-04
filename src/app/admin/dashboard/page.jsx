"use client";
import Layout from "../pages/page";
import styles from '../styles/dashboard.module.css';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  const handleCardClick = (path) => {
    router.push(path); // Navigate to desired page
  };

  return (
    <Layout className={styles.main}>
      <Card 
        title="Total Users" 
        value="2110" 
        icon="👤" 
        onClick={() => handleCardClick('/admin/customer')} 
      />
      <Card 
        title="Total Franchise" 
        value="9" 
        icon="🏪" 
        onClick={() => handleCardClick('/admin/franchises')} 
      />
      <Card 
        title="Total Service" 
        value="187" 
        icon="🔧" 
        onClick={() => handleCardClick('/admin/services')} 
      />
      <Card 
        title="Total Completed Orders" 
        value="619" 
        icon="🛒" 
        onClick={() => handleCardClick('/admin/orders')} 
      />
    </Layout>
  );
};

export default Dashboard;

// Card component
const Card = ({ title, value, icon, onClick }) => (
  <div className={styles.card} onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="cardIcon">{icon}</div>
    <div className="cardTitle">{title}</div>
    <div className="cardValue">{value}</div>
  </div>
);
