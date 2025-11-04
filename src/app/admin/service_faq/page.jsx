"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/services.module.css';
import Layout from "../pages/page";

export default function Specification() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Placeholder empty array (replace with actual data later)
  const specifications = [];

  // 🔍 Filter by search input
  const filtered = specifications.filter(spec =>
    spec.title?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔃 Sort based on sortConfig
  const sortedSpecifications = [...filtered];
  if (sortConfig.key) {
    sortedSpecifications.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'status') {
        aVal = aVal === 'ACTIVE' ? 1 : 0;
        bVal = bVal === 'ACTIVE' ? 1 : 0;
      } else {
        aVal = aVal?.toString().toLowerCase() || '';
        bVal = bVal?.toString().toLowerCase() || '';
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // 📄 Pagination
  const totalPages = Math.ceil(sortedSpecifications.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, sortedSpecifications.length);
  const currentItems = sortedSpecifications.slice(startIndex, endIndex);

  // ⬆️ Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
    else direction = 'asc';

    setSortConfig({ key: direction ? key : null, direction });
  };

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: '5px', fontSize: '12px' }}>
      {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕'}
    </span>
  );

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Service Faq</span> &gt;{" "}
            <span className={styles.breadcrumb}>Service</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Service Faq</span>
          </div>
        </div>

        <div className={styles.card}>
          <h5 className={styles.title}>Service Faq</h5>

          <button
            className={styles.addbtn}
            onClick={() => router.push('/admin/admin-add/add-service_faq')}
          >
            + Add new
          </button>

          <div className={styles.showEntries}>
            <label>
              Show{" "}
              <select
                className={styles.select1}
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "}
              entries
            </label>

            <label className={styles.searchLabel}>
              Search:{" "}
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

          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Questions
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
               <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Answer
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Status
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
               
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Action
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className={styles.icon}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>{item.description || "—"}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          item.status === "ACTIVE" ? styles.active : styles.inactive
                        }`}
                      >
                        {item.status || "INACTIVE"}
                      </span>
                    </td>
                    <td>
                      {/* Action buttons or icons go here */}
                      Actions
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No specifications added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className={styles.pagination}>
            <span>
              {filtered.length === 0 ? (
                "No entries found"
              ) : (
                `Showing ${startIndex + 1} to ${endIndex} of ${filtered.length} entries`
              )}
            </span>

            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className={styles.pageNumber}>{currentPage}</span>

              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
