"use client";

import { useState, useMemo, useEffect } from "react";
import Layout from "../pages/page";
import styles from "../styles/request.module.css";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";

export default function Followup() {
  // ---------- States ----------
  const [requests, setRequests] = useState([
    
  ]);

  const [requestType, setRequestType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // ---------- Filtering ----------
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

  // ---------- Pagination ----------
  const totalPages = Math.ceil(filteredRequests.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, filteredRequests.length);
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // ---------- JSX ----------

     const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb} style={{ cursor: "pointer"}}>Followup</span>
                    <span className={styles.separator}> | </span>
                           <SlHome
                                  style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                  onClick={goToDashboard}
                                  title="Go to Dashboard"
                                />
                       <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Followup</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Followup</h2>
          </div>

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

          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Visit Date & Time</th>
                 <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.length === 0 ? (
                <tr>
                  <td colSpan="8" className={styles.noData}>
                    No entries found
                  </td>
                </tr>
              ) : (
                currentRequests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.id}</td>
                    <td>{req.name}</td>
                    <td>{req.email}</td>
                    <td>{req.phone}</td>
                    <td>{req.address}</td>
                    <td>{req.dateTime}</td>
                    <td>{req.message}</td>
                    <td>{req.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

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
      </div>
    </Layout>
  );
}
