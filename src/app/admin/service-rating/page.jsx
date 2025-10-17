"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../pages/page";
import styles from "../styles/serviceratind.module.css";

export default function ServiceRating() {
  const [ratings, setRatings] = useState([
    { id: 1, user: "divya sagathiya", service: "SOFA CLEANING", rating: 5, description: "Great service!", status: "ACTIVE" },
    { id: 2, user: "HIMAT VADHER", service: "CASSETTE AC CHEMICAL WASH", rating: 5, description: "Excellent work!", status: "ACTIVE" },
    { id: 3, user: "darshan mandanka", service: "CASSETTE AC CHEMICAL WASH", rating: 5, description: "Very satisfied", status: "ACTIVE" },
  ]);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const router = useRouter();

  // Toggle status
  const toggleStatus = (id) => {
    setRatings((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : r
      )
    );
  };

  // Sorting logic
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

  // Filtered based on search
  const filtered = ratings.filter(
    (r) =>
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.service.toLowerCase().includes(search.toLowerCase())
  );

  // Apply sorting
  let sorted = [...filtered];
  if (sortConfig.key && sortConfig.direction) {
    sorted.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // handle numbers
      if (typeof aValue === "number") return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;

      // handle strings
      aValue = aValue?.toString().toLowerCase() || "";
      bValue = bValue?.toString().toLowerCase() || "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sorted.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, sorted.length);
  const currentRatings = sorted.slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Service Rating</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Service Rating</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Services Rating</h2>
            <button className={styles.addBtn} onClick={() => router.push("/admin/admin-add/add-service-rating")}>
              + Add new
            </button>
          </div>

          <div className={styles.controls}>
            <label>
              Show{" "}
              <select className={styles.select} value={entries} onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "}entries
            </label>

            <label>
              Search:{" "}
              <input className={styles.search} type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
            </label>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("user")} style={{ cursor: "pointer" }}>
                  User <SortArrow direction={sortConfig.key === "user" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("service")} style={{ cursor: "pointer" }}>
                  Service <SortArrow direction={sortConfig.key === "service" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("rating")} style={{ cursor: "pointer" }}>
                  Rating <SortArrow direction={sortConfig.key === "rating" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("description")} style={{ cursor: "pointer" }}>
                  Description <SortArrow direction={sortConfig.key === "description" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status <SortArrow direction={sortConfig.key === "status" ? sortConfig.direction : null} />
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRatings.map((r) => (
                <tr key={r.id}>
                  <td>{r.user}</td>
                  <td>{r.service}</td>
                  <td>{Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < r.rating ? styles.filledStar : styles.emptyStar}>★</span>
                  ))}</td>
                  <td>
                    <a href="#!" className={styles.viewDescription} onClick={() => setSelectedDescription(r.description)}>
                      View Description...
                    </a>
                  </td>
                  <td>
                    <span className={`${styles.status} ${r.status === "ACTIVE" ? styles.active : styles.inactive}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.editBtn} onClick={() => router.push(`/admin/edit-service-rating?id=${r.id}`)}>Edit</button>
                    <button className={r.status === "ACTIVE" ? styles.inactiveBtn : styles.activeBtn} onClick={() => toggleStatus(r.id)}>
                      {r.status === "ACTIVE" ? "In Active" : "Active"}
                    </button>
                  </td>
                </tr>
              ))}

              {currentRatings.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>No entries found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>
              {sorted.length === 0 ? "No entries found" : `Showing ${startIndex + 1} to ${endIndex} of ${sorted.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button className={styles.paginationButton} onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedDescription && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>Description</h3>
            <p className={styles.modalText}>{selectedDescription}</p>
            <div className={styles.modalFooter}>
              <button onClick={() => setSelectedDescription(null)} className={styles.closeBtn}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
