'use client';

import React, { useState } from 'react';
import styles from '../styles/paymet.module.css';
import Layout from '../pages/page'; // Adjust path if needed
import { useRouter } from 'next/navigation';

export default function AddPaymentPage() {
  const router = useRouter();

  const [paymentType, setPaymentType] = useState('');
  const [franchise, setFranchise] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [remarks, setRemarks] = useState('');

  const franchises = [
    'Shree Auto Care',
    'Meena Car Service',
    'AutoFix Hub',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      paymentType,
      franchise,
      amount,
      paymentDate,
      remarks,
    };
    console.log('Payment Submitted:', formData);
    // Here you can call your API to save the payment
    alert('Payment added successfully!');
    router.push('/admin/payment'); // redirect back to Payment page
  };

  return (
    <Layout>
      <div className={styles.addcontainer}>
           <div className={styles.headerContainer}>
            <div>
                                <span className={styles.breadcrumb}>Payment</span> &gt;{' '}
                                <span className={styles.breadcrumbActive}>Add Payment</span>
                              </div>
         
        </div>

        <div className={styles.addcard}>
          <h1 className={styles.addtitle}>Add Payment</h1>
          <form className={styles.addform} onSubmit={handleSubmit}>
            <div className={styles.addformGroup}>
              <label>Payment Type</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
            </div>

            <div className={styles.addformGroup}>
              <label>Franchise</label>
              <select
                value={franchise}
                onChange={(e) => setFranchise(e.target.value)}
                required
              >
                <option value="">Select Franchise</option>
                {franchises.map((f, i) => (
                  <option key={i} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div className={styles.addformGroup}>
              <label>Amount</label>
              <input
                
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>

            <div className={styles.addformGroup}>
              <label>Payment Date</label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>

            <div className={styles.addformGroup}>
              <label>Remarks</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks"
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
