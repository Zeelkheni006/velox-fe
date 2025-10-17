"use client";

import { useState, useMemo, useEffect } from "react";
import Layout from "../pages/page";
import styles from "../styles/request.module.css";

// Sort Arrow Component

export default function RequestPage() {
  const [requestType, setRequestType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openActionId, setOpenActionId] = useState(null);
  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: '5px', fontSize: '12px' }}>
      {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕'}
    </span>
  );

  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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
      type: "Service A",
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
      type: "Service B",
    },
  ];

  // Filter logic
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesType =
        requestType === "" ||
        req.type.toLowerCase().includes(requestType.toLowerCase());
      const matchesStatus = status === "" || req.status === status;
      const matchesSearch =
        search === "" ||
        req.name.toLowerCase().includes(search.toLowerCase()) ||
        req.email.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [requests, requestType, status, search]);

  // Sorted requests
  const sortedRequests = useMemo(() => {
    if (!sortConfig.key) return filteredRequests;

    return [...filteredRequests].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Numeric
      if (sortConfig.key === "id") return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;

      // Date
      if (sortConfig.key === "visitDate") {
        return sortConfig.direction === "asc"
          ? new Date(aVal) - new Date(bVal)
          : new Date(bVal) - new Date(aVal);
      }

      // String
      aVal = aVal ? String(aVal).toLowerCase() : "";
      bVal = bVal ? String(bVal).toLowerCase() : "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRequests, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedRequests.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, sortedRequests.length);
  const currentRequests = sortedRequests.slice(startIndex, endIndex);

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  // Pagination handlers
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Message modal
  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Dropdown
  const toggleActionMenu = (id) => setOpenActionId((prev) => (prev === id ? null : id));
  const handleDropdownClick = (e) => e.stopPropagation();
  useEffect(() => {
    const handleClickOutside = () => setOpenActionId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDelete = (id) => alert(`Delete request with ID: ${id}`);

  // Follow-up
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [followUpMessage, setFollowUpMessage] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const openFollowUpModal = (req) => {
    setSelectedRequest(req);
    setFollowUpMessage("");
    setFollowUpDate("");
    setIsFollowUpOpen(true);
    setOpenActionId(null);
  };
  const closeFollowUpModal = () => setIsFollowUpOpen(false);
  const handleFollowUpSubmit = () => {
    if (!followUpMessage || !followUpDate) return alert("Please fill out both fields");
    alert(`Follow-up submitted for ${selectedRequest.name}\nMessage: ${followUpMessage}\nDate: ${followUpDate}`);
    setIsFollowUpOpen(false);
  };

  // Refer
  const [isReferOpen, setIsReferOpen] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState("");
  const [referMessage, setReferMessage] = useState("");

  const openReferModal = (req) => {
    setSelectedRequest(req);
    setSelectedFranchise("");
    setReferMessage("");
    setIsReferOpen(true);
    setOpenActionId(null);
  };
  const closeReferModal = () => setIsReferOpen(false);
  const handleReferSubmit = () => {
    if (!selectedFranchise || !referMessage) return alert("Please select a franchise and enter a message.");
    alert(`Referred ${selectedRequest.name} to ${selectedFranchise}\nMessage: ${referMessage}`);
    setIsReferOpen(false);
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.headerContainer}>
          <div>
          <span className={styles.breadcrumb}>Request</span> &gt; <span className={styles.breadcrumbActive}>Request</span>
        </div>
        </div>

        <div className={styles.card}>
          {/* Header & Filters */}
          <div className={styles.header}>
            <h2>Request Quotes</h2>
            <div className={styles.filters}>
              <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
                <option value="">Select Request Type</option>
                <option value="Service A">Service A</option>
                <option value="Service B">Service B</option>
              </select>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("id")}>Id <SortArrow direction={sortConfig.key==="id"?sortConfig.direction:null}/></th>
                <th onClick={() => handleSort("name")}>Name <SortArrow direction={sortConfig.key==="name"?sortConfig.direction:null}/></th>
                <th onClick={() => handleSort("email")}>Email <SortArrow direction={sortConfig.key==="email"?sortConfig.direction:null}/></th>
                <th onClick={() => handleSort("phone")}>Phone <SortArrow direction={sortConfig.key==="phone"?sortConfig.direction:null}/></th>
                <th onClick={() => handleSort("address")}>Address <SortArrow direction={sortConfig.key==="address"?sortConfig.direction:null}/></th>
                <th>Request Message</th>
                <th onClick={() => handleSort("visitDate")}>Visit Date & Time <SortArrow direction={sortConfig.key==="visitDate"?sortConfig.direction:null}/></th>
                <th onClick={() => handleSort("status")}>Status <SortArrow direction={sortConfig.key==="status"?sortConfig.direction:null}/></th>
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
                 <td className={styles.actionCell} onClick={handleDropdownClick}>
  <button
    className={styles.deleteBtn}
    onClick={(e) => {
      e.stopPropagation();
      handleDelete(req.id);
    }}
  >
    Delete
  </button>

  <button
    className={styles.viewLogsBtn}
    onClick={(e) => {
      e.stopPropagation();
      toggleActionMenu(req.id);
    }}
  >
    Action ▾
  </button>

  {openActionId === req.id && (
    <div className={styles.actionDropdown}>
      <button onClick={() => openFollowUpModal(req)}>Follow Up</button>
      <button onClick={() => openReferModal(req)}>Refer</button>
      <button onClick={() => handleDelete(req.id)}>Delete</button>
      <button onClick={() => setOpenActionId(null)}>Cancel</button>
    </div>
  )}
</td>
                </tr>
              ))}

              {currentRequests.length === 0 && (
                <tr>
                  <td colSpan="9" className={styles.noData}>
                    No entries found
                  </td>
                </tr>
              )}
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

        {/* Message Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Message</h3>
                <button className={styles.closeBtn} onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className={styles.modalBody}>{modalMessage}</div>
              <div style={{ textAlign: "right", marginTop: "10px" }}>
                <button className={styles.closeBtnBottom} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Follow Up Modal */}
        {isFollowUpOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.followUpModal}>
              <div className={styles.modalHeader}>
                <h3>Follow Up</h3>
              </div>
              <div className={styles.modalBody}>
                <label>Message:</label>
                <textarea
                  className={styles.textArea}
                  value={followUpMessage}
                  onChange={(e) => setFollowUpMessage(e.target.value)}
                  placeholder="Enter follow up message"
                />

                <label>Date:</label>
                <input
                  type="date"
                  className={styles.inputDate}
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={styles.submitBtn}
                  onClick={handleFollowUpSubmit}
                >
                  Submit
                </button>
                <button className={styles.closeBtnBottom} onClick={closeFollowUpModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Refer Modal */}
{isReferOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.referModal}>
      <div className={styles.modalHeader}>
        <h3>Franchise</h3>
      </div>

      <div className={styles.modalBody}>
        {/* Franchise Select */}
        <label>Select Franchise:</label>
        <select
          className={styles.inputSelect}
          value={selectedFranchise}
          onChange={(e) => setSelectedFranchise(e.target.value)}
        >
          <option value="">-- Select Franchise --</option>
          <option value="Franchise A">Franchise A</option>
          <option value="Franchise B">Franchise B</option>
          <option value="Franchise C">Franchise C</option>
        </select>

        {/* Message Box */}
        <label>Message:</label>
        <textarea
          className={styles.textArea}
          placeholder="Enter your message..."
          value={referMessage}
          onChange={(e) => setReferMessage(e.target.value)}
        />
      </div>

      {/* Buttons on right */}
      <div className={styles.modalFooter}>
        <button className={styles.submitBtn} onClick={handleReferSubmit}>
          Submit
        </button>
        <button className={styles.closeBtnBottom} onClick={closeReferModal}>
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
