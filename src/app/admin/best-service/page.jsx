"use client";
import { useState } from "react";
import styles from "../styles/bestservice.module.css";
import { useRouter } from "next/navigation"; 
import Layout from "../pages/page";

export default function BestServices() {
  const router = useRouter();  

  const [services, setServices] = useState([
    { id: 1, name: "Velox AC Care+ Plan", status: "INACTIVE" },
    { id: 2, name: "Velox FreshGuard Home Plan", status: "INACTIVE" },
    { id: 3, name: "Velox CoolCare AMC Plan", status: "INACTIVE" },
    { id: 4, name: "Velox CoolCare AMC Plan", status: "INACTIVE" },
    { id: 5, name: "Velox FreshGuard Home Plan", status: "INACTIVE" },
    { id: 6, name: "Velox AC Care+ Plan", status: "INACTIVE" },
    { id: 7, name: "Velox Bronze Beauty Package – Fresh Look, Fresh Feel!", status: "INACTIVE" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const toggleStatus = (id) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : s
      )
    );
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Sorting
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

  // Filter and sort
  let filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (sortConfig.key) {
    filteredServices.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Layout>
      <div className={styles.container}>
              <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Service</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Edit Service</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Best Services</h3>
            <button
              className={styles.addBtn}
              onClick={() => router.push("/admin/admin-add/add-bestservice")}
            >
              + Add new
            </button>
          </div>

          <div className={styles.controls}>
            <div>
              <label>Show </label>
              <select className={styles.select} value={entriesPerPage} onChange={handleEntriesChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span> entries</span>
            </div>
            <div>
              <label>Search: </label>
              <input
                type="text"
                className={styles.search}
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                  Service
                  <SortArrow direction={sortConfig.key === "name" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status
                  <SortArrow direction={sortConfig.key === "status" ? sortConfig.direction : null} />
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        service.status === "ACTIVE"
                          ? styles.activeStatus
                          : styles.inactiveStatus
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles.editBtn}
                      onClick={() =>
                        router.push(`/admin/edit-bestservice?best-service=${encodeURIComponent(service.name)}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleStatus(service.id)}
                      className={`${styles.actionBtn} ${
                        service.status === "ACTIVE"
                          ? styles.deactivateBtn
                          : styles.activateBtn
                      }`}
                    >
                      {service.status === "ACTIVE" ? "Inactive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredServices.length)} of {filteredServices.length} entries
            </span>
            <div className={styles.paginationControls}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
