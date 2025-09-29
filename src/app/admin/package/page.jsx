"use client";
import Layout from "../pages/page";
import { useState } from "react";
import styles from "../styles/package.module.css";
import { useRouter } from "next/navigation"; 

export default function PackagesTable() {
  const router = useRouter();  

  const [packages, setPackages] = useState([
    { id: 1, title: "HOLI SPECIAL OFFER", discount: "435flat", owner: "-", status: "INACTIVE" },
    { id: 2, title: "Women Monthly Silver Package", discount: "450flat", owner: "-", status: "INACTIVE" },
    { id: 3, title: "Eyebrow Free", discount: "10%", owner: "-", status: "INACTIVE" },
    { id: 4, title: "Home Cleaning", discount: "200flat", owner: "-", status: "INACTIVE" },
    { id: 5, title: "Deep Cleaning", discount: "500flat", owner: "-", status: "ACTIVE" },
    { id: 6, title: "AC Service", discount: "300flat", owner: "-", status: "INACTIVE" },
    { id: 7, title: "Pest Control", discount: "20%", owner: "-", status: "INACTIVE" },
    { id: 8, title: "Sofa Cleaning", discount: "700flat", owner: "-", status: "ACTIVE" },
    { id: 9, title: "Kitchen Cleaning", discount: "900flat", owner: "-", status: "INACTIVE" },
    { id: 10, title: "Window Cleaning", discount: "15%", owner: "-", status: "ACTIVE" },
    { id: 11, title: "Bathroom Cleaning", discount: "400flat", owner: "-", status: "INACTIVE" },
    { id: 12, title: "Carpet Cleaning", discount: "800flat", owner: "-", status: "ACTIVE" },
  ]);

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const toggleStatus = (id) => {
    setPackages((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : p
      )
    );
  };

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

  // Filter packages by search text
  let filteredPackages = packages.filter((p) =>
    p.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Apply sorting
  if (sortConfig.key) {
    filteredPackages.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(filteredPackages.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentPackages = filteredPackages.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <span className={styles.bold}>Packages</span> &nbsp;&gt;&nbsp;
          <span className={styles.link}>Packages</span>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Packages</h2>
            <button
              className={styles.addBtn}
              onClick={() => router.push("/admin/add-package")}
            >
              + Add new
            </button>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <div>
              <label>Show </label>
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

          {/* Table */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Title
                  <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("discount")} style={{ cursor: "pointer" }}>
                  Discount
                  <SortArrow direction={sortConfig.key === "discount" ? sortConfig.direction : null} />
                </th>
                <th>Owner</th>
                <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status
                  <SortArrow direction={sortConfig.key === "status" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Action
                  <SortArrow direction={sortConfig.key === "status" ? sortConfig.direction : null} />
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPackages.map((pkg) => (
                <tr key={pkg.id}>
                  <td>{pkg.title}</td>
                  <td>{pkg.discount}</td>
                  <td>{pkg.owner}</td>
                  <td>
                    <span
                      className={
                        pkg.status === "ACTIVE" ? styles.activeStatus : styles.inactiveStatus
                      }
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.editBtn}
                      onClick={() =>
                        router.push(
                          `/admin/edit-package?title=${encodeURIComponent(pkg.title)}&discountValue=${encodeURIComponent(pkg.discount)}`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStatus(pkg.id)}
                      className={styles.statusBtn}
                    >
                      {pkg.status === "ACTIVE" ? "Inactive" : "Active"}
                    </button>
                    <button
                      type="button"
                      className={styles.mediaBtn}
                      onClick={() => router.push(`/admin/manage-media-package?id=${pkg.id}`)}
                    >
                      Manage Media
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              Showing {filteredPackages.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(endIndex, filteredPackages.length)} of {filteredPackages.length} entries
            </span>
            <div className={styles.paginationControls}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button
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
