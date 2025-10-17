"use client";

import styles from "../styles/Franchises.module.css";
import Layout from "../pages/page";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const franchisesdata = [
  { name: "test FRANCHISE", email: "pinal@gmail.com", mobile: "1234567890" },
  { name: "sanjana", email: "sonarana889@gmail.com", mobile: "4567891230" },
  { name: "kruti Miyani", email: "krutimiyani14@gmail.com", mobile: "6352726445", createFranchise: true },
  { name: "Mitbhai", email: "mitsachani7878@gmail.com", mobile: "7202030606" },
  { name: "for testing", email: "rushitsutariyya999@gmail.com", mobile: "7410235685", createFranchise: true },
  { name: "ravi vaghela", email: "sagathiyamanish008@gmail.com", mobile: "7859810498" },
  { name: "Manisha Solanki", email: "manisha7006sol@gmail.com", mobile: "8141314127" },
  { name: "HIREN D RATHOD", email: "hirenrathod738@gmail.com", mobile: "8160271457" },
  { name: "MP ENTERPRISE", email: "mpenterprisesurat123@gmail.com", mobile: "8200048822" },
  { name: "MITESH JADAV", email: "ravisagathiya2811@gmail.com", mobile: "8320326470" },
  { name: "New Franchise", email: "newone@gmail.com", mobile: "9999999999" },
];

// 🔽 small helper component for up/down arrows
  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: "5px", fontSize: "12px" }}>
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}
    </span>
  );

export default function FranchisesPage() {
  const router = useRouter();

  const [franchises, setFranchises] = useState(franchisesdata);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ Sorting logic (works for any column)
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...franchises].sort((a, b) => {
      const valueA = a[key]?.toString().toLowerCase() || "";
      const valueB = b[key]?.toString().toLowerCase() || "";
      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFranchises(sorted);
  };

  // ✅ Search filter
  const filtered = franchises.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase()) ||
      f.mobile.includes(search)
  );

  // ✅ Pagination
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, filtered.length);
  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const currentFranchises = filtered.slice(startIndex, endIndex);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Franchise User</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Franchise User</span>
          </div>
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>Franchise User</h1>

          <div className={styles.showEntries}>
            Show{" "}
            <select className={styles.select1} value={entriesPerPage} onChange={handleEntriesChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>{" "}
            entries
          </div>

          <div className={styles.controls}>
            <label className={styles.searchLabel}>
              Search:{" "}
              <input
                className={styles.searchBox}
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                  Name <SortArrow direction={sortConfig.key === "name" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                  Email <SortArrow direction={sortConfig.key === "email" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("mobile")} style={{ cursor: "pointer" }}>
                  Mobile <SortArrow direction={sortConfig.key === "mobile" ? sortConfig.direction : null} />
                </th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {currentFranchises.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.editButton}
                      onClick={() =>
                        router.push(
                          `/admin/edit-franchise?name=${encodeURIComponent(item.name)}&email=${encodeURIComponent(
                            item.email
                          )}&mobile=${encodeURIComponent(item.mobile)}`
                        )
                      }
                    >
                      Edit
                    </button>
                    {item.createFranchise && (
                      <button
                        className={styles.createButton}
                        onClick={() =>
                          router.push(
                            `/admin/add-franchise?name=${encodeURIComponent(item.name)}&email=${encodeURIComponent(
                              item.email
                            )}&mobile=${encodeURIComponent(item.mobile)}`
                            )
                        }
                      >
                        Create Franchise
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Pagination Controls */}
          <div className={styles.pagination}>
            <span>
              {filtered.length === 0 ? (
                "No entries found"
              ) : (
                <>
                  Showing {startIndex + 1} to {endIndex} of {filtered.length} entries
                </>
              )}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>
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
