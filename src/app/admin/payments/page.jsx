'use client';

import React, { useState } from 'react';
import styles from '../styles/paymet.module.css';
import Layout from '../pages/page';
import { useRouter } from 'next/navigation';
import { SlHome } from "react-icons/sl";

export default function PaymentPage({ data }) {
  const router = useRouter();

  const sampleData = [
    { id: 1, franchise: 'Shree Auto Care', paymentType: 'Online', paymentDate: '2025-10-05', amount: '₹12,000' },
    { id: 2, franchise: 'Meena Car Service', paymentType: 'Offline', paymentDate: '2025-09-30', amount: '₹8,500' },
    { id: 3, franchise: 'AutoFix Hub', paymentType: 'UPI', paymentDate: '2025-09-25', amount: '₹10,000' },
  ];

  const rows = Array.isArray(data) && data.length ? data : sampleData;

  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
    setSortConfig({ key: direction ? key : null, direction });
  };

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: '5px', fontSize: '12px' }}>
      {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕'}
    </span>
  );

  // Filter
  const filteredRows = rows.filter(
    (r) =>
      r.franchise.toLowerCase().includes(search.toLowerCase()) ||
      r.paymentType.toLowerCase().includes(search.toLowerCase()) ||
      r.amount.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  let sortedRows = [...filteredRows];
  if (sortConfig.key && sortConfig.direction) {
    sortedRows.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // For amount, remove currency symbol and commas
      if (sortConfig.key === 'amount') {
        aVal = parseFloat(aVal.replace(/[₹,]/g, '')) || 0;
        bVal = parseFloat(bVal.replace(/[₹,]/g, '')) || 0;
      }

      // For dates
      if (sortConfig.key === 'paymentDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      aVal = aVal.toString().toLowerCase();
      bVal = bVal.toString().toLowerCase();

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, sortedRows.length);
  const paginatedRows = sortedRows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedRows.length / entries);
   const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}style={{ cursor: "pointer"}}>Payment</span> 
             <span className={styles.separator}> | </span>
                           <SlHome
                                  style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                  onClick={goToDashboard}
                                  title="Go to Dashboard"
                                />
                       <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Payment</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Payment</h1>
            <button className={styles.addBtn} onClick={() => router.push('/admin/admin-add/add-payment')}>
              + Add New
            </button>
          </div>

          <div className={styles.controls}>
            <label>
              Show{' '}
              <select className={styles.select} value={entries} onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}>
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

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => handleSort('franchise')} style={{ cursor: 'pointer' }}>
                    Franchise <SortArrow direction={sortConfig.key === 'franchise' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('paymentType')} style={{ cursor: 'pointer' }}>
                    Payment Type <SortArrow direction={sortConfig.key === 'paymentType' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('paymentDate')} style={{ cursor: 'pointer' }}>
                    Payment Date <SortArrow direction={sortConfig.key === 'paymentDate' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
                    Amount <SortArrow direction={sortConfig.key === 'amount' ? sortConfig.direction : null} />
                  </th>
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
                        onClick={() => { localStorage.setItem('selectedPayment', JSON.stringify(r)); router.push(`/admin/edit-payment?id=${r.id}`); }}
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

          <div className={styles.pagination}>
            <span>
              {sortedRows.length === 0
                ? 'No entries found'
                : `Showing ${startIndex + 1} to ${endIndex} of ${sortedRows.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button className={styles.paginationButton} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
