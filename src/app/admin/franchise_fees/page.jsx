'use client';

import React, { useState } from 'react';
import styles from '../styles/franchiseFees.module.css';
import Layout from '../pages/page'; // adjust path if needed

export default function FranchiseFees({ data }) {
  const sample = [
    { id: 1, user: 'Ravi Patel', franchiseName: 'Shree Auto Care', email: 'ravi@example.com', mobile: '+91-9876543210', commission: '5%' },
    { id: 2, user: 'Meena Shah', franchiseName: 'Meena Car Service', email: 'meena@example.com', mobile: '+91-9123456780', commission: '7.5%' },
    { id: 3, user: 'Jay Desai', franchiseName: 'AutoFix Hub', email: 'jay@example.com', mobile: '+91-9823412390', commission: '6%' },
  ];

  const allRows = Array.isArray(data) && data.length ? data : sample;

  // 🔹 States
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // 🔹 Sort handler
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

  // 🔹 Filter data
  const filteredRows = allRows.filter(
    (r) =>
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.franchiseName.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.mobile.includes(search)
  );

  // 🔹 Sort filtered data
  let sortedRows = [...filteredRows];
  if (sortConfig.key && sortConfig.direction) {
    sortedRows.sort((a, b) => {
      let aValue = a[sortConfig.key]?.toString().toLowerCase() || '';
      let bValue = b[sortConfig.key]?.toString().toLowerCase() || '';
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // 🔹 Pagination
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, sortedRows.length);
  const paginatedRows = sortedRows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedRows.length / entries);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Franchise Fees</span> &gt;{' '}
            <span className={styles.breadcrumbActive}>Franchise Fees</span>
          </div>
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>Franchise Fees</h1>

          {/* Controls */}
          <div className={styles.controls}>
            <label>
              Show{' '}
              <select
                className={styles.select}
                value={entries}
                onChange={(e) => {
                  setEntries(Number(e.target.value));
                  setCurrentPage(1);
                }}
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
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </label>
          </div>

          {/* Table */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => handleSort('user')} style={{ cursor: 'pointer' }}>
                    User <SortArrow direction={sortConfig.key === 'user' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('franchiseName')} style={{ cursor: 'pointer' }}>
                    Franchise Name <SortArrow direction={sortConfig.key === 'franchiseName' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                    Email <SortArrow direction={sortConfig.key === 'email' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('mobile')} style={{ cursor: 'pointer' }}>
                    Mobile Number <SortArrow direction={sortConfig.key === 'mobile' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('commission')} style={{ cursor: 'pointer' }}>
                    Commission <SortArrow direction={sortConfig.key === 'commission' ? sortConfig.direction : null} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.user}</td>
                    <td>{r.franchiseName}</td>
                    <td>{r.email}</td>
                    <td>{r.mobile}</td>
                    <td>{r.commission}</td>
                  </tr>
                ))}
                {paginatedRows.length === 0 && (
                  <tr>
                    <td colSpan="5" className={styles.noData}>
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {sortedRows.length === 0
                ? 'No entries found'
                : `Showing ${startIndex + 1} to ${endIndex} of ${sortedRows.length} entries`}
            </span>

            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button
                className={styles.paginationButton}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
