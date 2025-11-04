'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/paymet.module.css'; // reuse add-payment styles
import Layout from '../pages/page';
import { useRouter } from 'next/navigation';

export default function EditPaymentPage() {
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

  // 🔹 Load selected payment from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selectedPayment');
    if (saved) {
      const payment = JSON.parse(saved);
      setPaymentType(payment.paymentType || '');
      setFranchise(payment.franchise || '');
      setAmount(payment.amount || '');
      setPaymentDate(payment.paymentDate || '');
      setRemarks(payment.remarks || '');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      paymentType,
      franchise,
      amount,
      paymentDate,
      remarks,
    };
    console.log('Updated Payment:', formData);
    alert('Payment updated successfully!');
    router.push('/admin/payment'); // redirect back
  };

  return (
    <Layout>
      <div className={styles.addcontainer}>
          <div className={styles.headerContainer}>
            <div>
                                <span className={styles.breadcrumb}>Payment</span> &gt;{' '}
                                <span className={styles.breadcrumbActive}>Edit Payment</span>
                              </div>
         
        </div>

        <div className={styles.addcard}>
          <h1 className={styles.addtitle}>Edit Payment</h1>
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
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="UPI">UPI</option>
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
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
