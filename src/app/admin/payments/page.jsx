'use client';

import React, { useState } from 'react';
import styles from '../styles/paymet.module.css';
import Layout from '../pages/page';
import { useRouter } from 'next/navigation';

export default function PaymentPage({ data }) {
  const router = useRouter();

  // Sample fallback data
  const sampleData = [
    { id: 1, franchise: 'Shree Auto Care', paymentType: 'Online', paymentDate: '2025-10-05', amount: '₹12,000' },
    { id: 2, franchise: 'Meena Car Service', paymentType: 'Offline', paymentDate: '2025-09-30', amount: '₹8,500' },
    { id: 3, franchise: 'AutoFix Hub', paymentType: 'UPI', paymentDate: '2025-09-25', amount: '₹10,000' },
  ];

  const rows = Array.isArray(data) && data.length ? data : sampleData;

  // 🔹 States
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Filter rows
  const filteredRows = rows.filter(
    (r) =>
      r.franchise.toLowerCase().includes(search.toLowerCase()) ||
      r.paymentType.toLowerCase().includes(search.toLowerCase()) ||
      r.amount.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Pagination
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, filteredRows.length);
  const paginatedRows = filteredRows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredRows.length / entries);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1); };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Payment</span> &gt;{' '}
            <span className={styles.breadcrumbActive}>Payment</span>
          </div>
        </div>

        {/* Card Section */}
        <div className={styles.card}>
          {/* Title + Add Button */}
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Payment</h1>
            <button
              className={styles.addBtn}
              onClick={() => router.push('/admin/add-payment')}
            >
              + Add New
            </button>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <label>
              Show{' '}
              <select
                className={styles.select}
                value={entries}
                onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{' '}
              entries
            </label>

            <label className={styles.searchLabel}>
              Search:{' '}
              <input
                type="text"
                placeholder="Search..."
                className={styles.search}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
            </label>
          </div>

          {/* Table */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Franchise</th>
                  <th>Payment Type</th>
                  <th>Payment Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map(r => (
                  <tr key={r.id}>
                    <td>{r.franchise}</td>
                    <td>{r.paymentType}</td>
                    <td>{r.paymentDate}</td>
                    <td>{r.amount}</td>
                    <td>
                       <button
    className={styles.editBtn}
    onClick={() => {
      // Save selected payment to localStorage
      localStorage.setItem('selectedPayment', JSON.stringify(r));
      router.push(`/admin/edit-payment?id=${r.id}`);
    }}
  >
    Edit
  </button>
                    </td>
                  </tr>
                ))}
                {paginatedRows.length === 0 && (
                  <tr>
                    <td colSpan="5" className={styles.noData}>No matching records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {filteredRows.length === 0
                ? 'No entries found'
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredRows.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button className={styles.paginationButton} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
