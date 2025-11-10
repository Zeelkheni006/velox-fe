'use client';

import { useState, useMemo } from "react";
import Layout from "../pages/page"; 
import styles from "../styles/newsletter.module.css";
import { useRouter } from "next/navigation";
import { SlHome } from "react-icons/sl";

export default function NewsletterPage() {
  const router = useRouter();

  const [subscribers, setSubscribers] = useState([
    { id: 1, email: "example1@gmail.com" },
    { id: 2, email: "example2@gmail.com" },
    { id: 3, email: "example3@gmail.com" },
    { id: 4, email: "example4@gmail.com" },
    { id: 5, email: "example5@gmail.com" },
    { id: 6, email: "example6@gmail.com" },
    { id: 7, email: "example7@gmail.com" },
  ]);

  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleDelete = (id) => setSubscribers(subscribers.filter(sub => sub.id !== id));

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    else if (sortConfig.key === key && sortConfig.direction === "desc") direction = null;
    setSortConfig({ key: direction ? key : null, direction });
  };

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: "5px", fontSize: "12px" }}>
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}
    </span>
  );

  // Filter subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter(sub =>
      sub.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [subscribers, search]);

  // Sort subscribers
  const sortedSubscribers = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredSubscribers;

    return [...filteredSubscribers].sort((a, b) => {
      const aVal = a[sortConfig.key].toLowerCase();
      const bVal = b[sortConfig.key].toLowerCase();

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredSubscribers, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedSubscribers.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, sortedSubscribers.length);
  const paginatedSubscribers = sortedSubscribers.slice(startIndex, endIndex);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
   const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb} style={{ cursor: "pointer"}}>News Letter</span>
                <span className={styles.separator}> | </span>
                           <SlHome
                                  style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                  onClick={goToDashboard}
                                  title="Go to Dashboard"
                                />
                       <span> &gt; </span>
            <span className={styles.breadcrumbActive}>News Letter</span>
          </div>
        </div>

        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <h2>News Letter</h2>
            <button className={styles.sendBtn} onClick={() => router.push("/admin/admin-add/add-newsletter")}>
              Send News Letter
            </button>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <label>
              Show{" "}
              <select
                className={styles.select}
                value={entries}
                onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
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
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
            </label>
          </div>

          {/* Table */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                  Email <SortArrow direction={sortConfig.key === "email" ? sortConfig.direction : null} />
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubscribers.map(sub => (
                <tr key={sub.id}>
                  <td>{sub.email}</td>
                  <td>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(sub.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {paginatedSubscribers.length === 0 && (
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>No subscribers found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {sortedSubscribers.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${sortedSubscribers.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button className={styles.paginationButton} onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
