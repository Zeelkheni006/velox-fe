import Layout from "../pages/page";
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
  return (
    
    <Layout className={styles.main}>
      <Card title="Total Users" value="2110" icon="👤" />
      <Card title="Total Franchise" value="9" icon="🏪" />
      <Card title="Total Service" value="187" icon="🔧" />
      <Card title="Total Completed Orders" value="619" icon="🛒" />
    </Layout>
   
    
  );
};

export default Dashboard;

const Card = ({ title, value, icon }) => (
<div className={styles.card}>
    <div className="cardIcon">{icon}</div>
    <div className="cardTitle">{title}</div>
    <div className="cardValue">{value}</div>
  </div>
);
