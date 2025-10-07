'use client';

import React, { useState } from 'react';
import styles from '../styles/franchiseFees.module.css';
import Layout from '../pages/page'; // Adjust path if needed

export default function FranchiseOutstandingPage({ data }) {
  // Sample fallback data
  const sampleData = [
    { id: 1, franchiseName: 'Shree Auto Care', outstanding: '0 CREDIT' },
    { id: 2, franchiseName: 'Meena Car Service', outstanding: '0 CREDIT' },
    { id: 3, franchiseName: 'AutoFix Hub', outstanding: '0 CREDIT' },
  ];

  const rows = Array.isArray(data) && data.length ? data : sampleData;

  // 🔹 States for search, entries, and pagination
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Filter logic (only filters by franchiseName and outstanding)
  const filteredRows = rows.filter(
    (r) =>
      r.franchiseName.toLowerCase().includes(search.toLowerCase()) ||
      r.outstanding.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Pagination logic
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, filteredRows.length);
  const paginatedRows = filteredRows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredRows.length / entries);

  // 🔹 Handlers for pagination buttons
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Home</span> &gt;{' '}
            <span className={styles.breadcrumbActive}>Franchise Outstandings</span>
          </div>
        </div>

        {/* Main Card */}
        <div className={styles.card}>
          <h1 className={styles.title}>Franchise Outstandings</h1>

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
                  <th>Franchise Name</th>
                  <th>Outstanding Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.franchiseName}</td>
                    <td>
                      <span className={styles.amountBadge}>{r.outstanding}</span>
                    </td>
                  </tr>
                ))}
                {paginatedRows.length === 0 && (
                  <tr>
                    <td colSpan="2" className={styles.noData}>
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
              {filteredRows.length === 0
                ? 'No entries found'
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredRows.length} entries`}
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
