"use client";

import { useState, useMemo } from "react";
import Layout from "../pages/page";
import styles from "../styles/request.module.css";

export default function RequestPage() {
  const [requestType, setRequestType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMessage, setModalMessage] = useState(""); // modal content
  const [isModalOpen, setIsModalOpen] = useState(false); // modal visibility

  const requests = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St",
      message: "I need a quote for service A.",
      visitDate: "2025-10-07",
      visitTime: "10:30 AM",
      status: "New",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      address: "456 Elm St",
      message: "Requesting service B details.",
      visitDate: "2025-10-08",
      visitTime: "2:00 PM",
      status: "Pending",
    },
  ];

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesType =
        requestType === "" ||
        req.message.toLowerCase().includes(requestType.toLowerCase());
      const matchesStatus = status === "" || req.status === status;
      const matchesSearch =
        search === "" ||
        req.name.toLowerCase().includes(search.toLowerCase()) ||
        req.email.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [requests, requestType, status, search]);

  const totalPages = Math.ceil(filteredRequests.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, filteredRequests.length);
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleDelete = (id) => {
    alert(`Delete request with ID: ${id}`);
  };

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Request</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Request</span>
          </div>
        </div>

        <div className={styles.card}>
          {/* Title & Filters */}
          <div className={styles.header}>
            <h2>Request Quotes</h2>
            <div className={styles.filters}>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Request Type</option>
                <option value="New">New</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Table Controls */}
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
                className={styles.search}
                placeholder="Search..."
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Request Message</th>
                <th>Visit Date & Time</th>
                <th>Status</th>
                <th>View Logs</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.name}</td>
                  <td>{req.email}</td>
                  <td>{req.phone}</td>
                  <td>{req.address}</td>
                  <td>
                    <button
                      className={styles.viewMsgBtn}
                      onClick={() => openModal(req.message)}
                    >
                      View Message
                    </button>
                  </td>
                  <td>
                    {req.visitDate} {req.visitTime}
                  </td>
                  <td>
                    <span className={styles.statusBtn}>{req.status}</span>
                  </td>
                  <td>
                    <button className={styles.viewLogsBtn}>View Logs</button>
                  </td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(req.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {filteredRequests.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredRequests.length} entries`}
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

        {/* Modal */}
     {isModalOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      {/* Modal Header */}
      <div className={styles.modalHeader}>
        <h3>Message</h3>
        <button className={styles.closeBtn} onClick={closeModal}>
          &times;
        </button>
      </div>

      {/* Modal Body */}
      <div className={styles.modalBody}>{modalMessage}</div>

      {/* Optional Close Button at Bottom */}
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <button className={styles.closeBtnBottom} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </Layout>
  );
}
