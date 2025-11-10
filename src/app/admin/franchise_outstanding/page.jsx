'use client';

import React, { useState } from 'react';
import styles from '../styles/franchiseFees.module.css';
import Layout from '../pages/page'; // Adjust path if needed
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";

export default function FranchiseOutstandingPage({ data }) {
  const sampleData = [
    { id: 1, franchiseName: 'Shree Auto Care', outstanding: '0 CREDIT' },
    { id: 2, franchiseName: 'Meena Car Service', outstanding: '0 CREDIT' },
    { id: 3, franchiseName: 'AutoFix Hub', outstanding: '0 CREDIT' },
  ];
  const router = useRouter();

  const rows = Array.isArray(data) && data.length ? data : sampleData;

  // 🔹 States
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // 🔹 Sorting handler
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

  // 🔹 Filter rows
  const filteredRows = rows.filter(
    (r) =>
      r.franchiseName.toLowerCase().includes(search.toLowerCase()) ||
      r.outstanding.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Sort filtered rows
  let sortedRows = [...filteredRows];
  if (sortConfig.key && sortConfig.direction) {
    sortedRows.sort((a, b) => {
      let aVal = a[sortConfig.key]?.toString().toLowerCase() || '';
      let bVal = b[sortConfig.key]?.toString().toLowerCase() || '';

      // Optional: for Outstanding, convert numbers if needed
      if (sortConfig.key === 'outstanding') {
        const parseAmount = (v) => parseFloat(v) || 0;
        aVal = parseAmount(aVal);
        bVal = parseAmount(bVal);
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
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
   const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}style={{ cursor: "pointer"}}>Franchise Outstandings</span>
                  <span className={styles.separator}> | </span>
               <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
           <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Franchise Outstandings</span>
          </div>
        </div>

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
                  <th onClick={() => handleSort('franchiseName')} style={{ cursor: 'pointer' }}>
                    Franchise Name{' '}
                    <SortArrow direction={sortConfig.key === 'franchiseName' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('outstanding')} style={{ cursor: 'pointer' }}>
                    Outstanding Amount{' '}
                    <SortArrow direction={sortConfig.key === 'outstanding' ? sortConfig.direction : null} />
                  </th>
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
