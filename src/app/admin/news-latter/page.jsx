"use client";

import { useState, useMemo } from "react";
import Layout from "../pages/page"; // adjust path if needed
import styles from "../styles/newsletter.module.css";
import { useRouter } from "next/navigation";

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

  const handleDelete = (id) => {
    setSubscribers(subscribers.filter((sub) => sub.id !== id));
  };

  // Filtered subscribers based on search
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) =>
      sub.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [subscribers, search]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubscribers.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, filteredSubscribers.length);

  const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>News Latter</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>News Letter</span>
          </div>
        </div>

        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <h2>News Letter</h2>
            <button className={styles.sendBtn }    
            onClick={() => router.push("/admin/add-newsletter")}>Send News Letter</button>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <label>
              Show{" "}
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

          {/* Table */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubscribers.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.email}</td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(sub.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedSubscribers.length === 0 && (
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {filteredSubscribers.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredSubscribers.length} entries`}
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
                disabled={currentPage === totalPages || totalPages === 0}
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
