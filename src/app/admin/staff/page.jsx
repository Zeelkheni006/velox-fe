"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/manageuser.module.css"; 
import { FaEye, FaEdit } from "react-icons/fa";
import Layout from "../pages/page";

const dummyStaff = [
  { email: "support@gmail.com", phone: "7485965874", role: "support" },
  { email: "hradmin@gmail.com", phone: "7485965874", role: "hr" },
  { email: "mvr13jalpa@gmail.com", phone: "8141124260", role: "GENERAL MANAGER" },
  { email: "anjanarana@gmail.com", phone: "9012345678", role: "Computer Operator" },
  { email: "veloxkamal@gmail.com", phone: "9427980836", role: "Creative Team" },
  { email: "veloxnishawankhade@gmail.com", phone: "9325600062", role: "support" },
  { email: "veloxabhirathod@gmail.com", phone: "7698864504", role: "District Manager" },
  { email: "veloxrathodankita@gmail.com", phone: "9723842312", role: "GENERAL MANAGER" },
];

const ManageStaff = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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

  // Filtered + sorted staff
  const filteredStaff = useMemo(() => {
    let filtered = dummyStaff.filter((staff) =>
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!sortConfig.key || !sortConfig.direction) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[sortConfig.key]?.toLowerCase() || "";
      const bVal = b[sortConfig.key]?.toLowerCase() || "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredStaff.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentStaffPage = filteredStaff.slice(startIndex, endIndex);

  // Modal handlers
  const handleEdit = (staff) => {
    // your edit logic
    setShowModal(true);
  };

  const handleView = (staff) => {
    setSelectedStaff(staff);
    setViewModal(true);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <span className={styles.breadcrumb}>Manage Staff</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Manage Staff</span>
          </div>
          <button className={styles.addButton} onClick={() => setShowModal(true)}>
            + Add New Staff
          </button>
        </div>

        <div className={styles.card}>
          <h2>Manage Staff</h2>
          <div className={styles.tableControls}>
            <div>
              Show{" "}
              <select
                className={styles.select}
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
            </div>
            <div>
              <label>Search: </label>
              <input
                type="text"
                className={styles.search}
                placeholder="Search by email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                  Email<SortArrow direction={sortConfig.key === "email" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("phone")} style={{ cursor: "pointer" }}>
                  Phone<SortArrow direction={sortConfig.key === "phone" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("role")} style={{ cursor: "pointer" }}>
                  Role<SortArrow direction={sortConfig.key === "role" ? sortConfig.direction : null} />
                </th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {currentStaffPage.map((staff, index) => (
                <tr key={index}>
                  <td>{staff.email}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.role}</td>
                  <td className={styles.actions}>
                    <button className={styles.viewBtn} onClick={() => handleView(staff)}>
                      <FaEye />
                    </button>
                    <button className={styles.editBtn} onClick={() => handleEdit(staff)}>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan="4" className={styles.noData}>
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className={styles.paginationInfo}>
            <div>
              Showing {filteredStaff.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(endIndex, filteredStaff.length)} of {filteredStaff.length} entries
            </div>
            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.activePage : ""}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

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
};

export default ManageStaff;
