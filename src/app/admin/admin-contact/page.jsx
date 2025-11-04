"use client";

import { useState, useMemo } from "react";
import Layout from "../pages/page";
import styles from "../styles/contactus.module.css";

export default function ContactUsPage() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Dhruvi Mendapara", email: "dhruvi@example.com", phone: "9876543210", comment: "Need more details about cleaning services." },
    { id: 2, name: "Ravi Patel", email: "ravi@gmail.com", phone: "9123456780", comment: "Looking for AC maintenance plan." },
    { id: 3, name: "Nidhi Sharma", email: "nidhi@yahoo.com", phone: "9998887777", comment: "Please call me regarding solar panel setup." },
  ]);

  const [selectedComment, setSelectedComment] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(10);

  // 🔹 Sorting function
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

  // 🔹 Sorted contacts
  const sortedContacts = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return contacts;
    return [...contacts].sort((a, b) => {
      const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [contacts, sortConfig]);

  // 🔹 Pagination
  const totalPages = Math.ceil(sortedContacts.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, sortedContacts.length);
  const currentContacts = sortedContacts.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Contact Us</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Contact Us</span>
          </div>
        </div>

        {/* Table */}
        <div className={styles.card}>
          <h2 className={styles.pageTitle}>Contact Us</h2>

          <div className={styles.controls}>
            <label>
              Show{" "}
              <select
                value={entries}
                onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
                className={styles.select}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "} entries
            </label>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                  Id <SortArrow direction={sortConfig.key === "id" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                  Name <SortArrow direction={sortConfig.key === "name" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                  Email <SortArrow direction={sortConfig.key === "email" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("phone")} style={{ cursor: "pointer" }}>
                  Phone <SortArrow direction={sortConfig.key === "phone" ? sortConfig.direction : null} />
                </th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <span
                      className={styles.viewText}
                      onClick={() => setSelectedComment(contact.comment)}
                    >
                      View Comment...
                    </span>
                  </td>
                </tr>
              ))}
              {currentContacts.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.noData}>No records found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {sortedContacts.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${sortedContacts.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button className={styles.paginationButton} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>

        {/* Comment Modal */}
        {selectedComment && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
              <div className={styles.modalHeader}>
                <h3>Comment</h3>
              </div>
              <div className={styles.modalBody}>
                <p>{selectedComment}</p>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.closeBtn} onClick={() => setSelectedComment(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
