'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/order.module.css';
import Layout from '../pages/page';

export default function AssignFranchise({ params }) {
  const searchParams = useSearchParams();
  const { id } = params;

  const order = { 
    id, 
    services: searchParams.get('services'),  
    total_amount: searchParams.get('total_amount'), 
    assign: searchParams.get('assign'), 
  };

  // state for modal
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className={styles.assignviewcontainer}>
        <h2 className={styles.assignviewtitle}>Assign Franchise</h2>
        
        <h3 className={styles.assignheader}>Services Details</h3>
        
        <div className={styles.row}>
          <table className={styles.assigntable}>
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.services}</td>
                <td>{order.total_amount}</td>
                <td>
                  <button 
                    className={styles.btnassign} 
                    onClick={() => setShowModal(true)}
                  >
                    Assign Franchise
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={styles.assignheader}>Package Details</h3>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Assign Franchise</h3>

            <div className={styles.modalField}>
              <label>Franchise</label>
              <select>
                <option>Select Franchise</option>
                <option>Franchise A</option>
                <option>Franchise B</option>
              </select>
            </div>

            <div className={styles.modalField}>
              <label>Professional</label>
              <select>
                <option>Select Professional</option>
                <option>Professional A</option>
                <option>Professional B</option>
              </select>
            </div>

           <div className={styles.dateTimeRow}>
  <div className={styles.modalField}>
    <label>Date</label>
    <input type="date" />
  </div>

  <div className={styles.modalField}>
    <label>Time</label>
    <input type="time" />
  </div>
</div>

            <div className={styles.modalActions}>
              <button className={styles.btnsubmit}>Submit</button>
              <button 
                className={styles.btnclose} 
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
