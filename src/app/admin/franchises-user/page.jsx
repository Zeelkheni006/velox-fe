"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../pages/page";
import { SlHome } from "react-icons/sl";
import styles from "../styles/Franchises.module.css";
import { getFranchiseOwners } from "../../api/manage_users/franchise";
import {fetchRequestedServices} from "../../api/manage_users/lead"
export default function FranchisesPage() {
  const router = useRouter();

  const [franchises, setFranchises] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // ✅ Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const res = await getFranchiseOwners(currentPage, entriesPerPage);
      if (res.success) {
        setFranchises(res.data);
        setTotalEntries(res.total);
      } else {
        setFranchises([]);
        setTotalEntries(0);
      }
    };
    fetchData();
  }, [currentPage, entriesPerPage]);

  // ✅ Sorting logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";

    const sorted = [...franchises].sort((a, b) => {
      const valA = a[key]?.toString().toLowerCase() || "";
      const valB = b[key]?.toString().toLowerCase() || "";
      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFranchises(sorted);
  };

  const filtered = franchises.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase()) ||
      f.phone.includes(search)
  );

  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, filtered.length);
const handleCreateFranchise = async (leadId) => {
  try {
    // Call API with the correct leadId
    const res = await fetchRequestedServices(leadId);

    if (res.success) {
      router.push(`/admin/create-franchise?leadId=${leadId}`);
    } else {
      console.error("Lead not found or API error:", res.message);
      // Optionally show a toast/popup to user
    }
  } catch (err) {
    console.error("Error fetching requested services:", err);
  }
};

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb} style={{ cursor: "pointer" }}>Franchise User</span>
            <span className={styles.separator}> | </span>
            <SlHome
              style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
              onClick={() => router.push("/admin/dashboard")}
              title="Go to Dashboard"
            />
            <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Franchise User</span>
          </div>
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>Franchise User</h1>

          <div className={styles.showEntries}>
            Show{" "}
            <select
              className={styles.select1}
              value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
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
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Name</th>
                <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>Email</th>
                <th onClick={() => handleSort("phone")} style={{ cursor: "pointer" }}>Mobile</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button
                      className={styles.editButton}
                      onClick={() =>
                        router.push(
                          `/admin/edit-franchise?id=${item.id}`
                        )
                      }
                    >
                      Edit
                    </button>
                    {item.make_franchise && (
               <button
  className={styles.createButton}
  onClick={() => router.push(`/admin/create-franchise?leadId=${item.id}`)}
>
  Create Franchise
</button>

                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>
              Showing {startIndex + 1} to {Math.min(startIndex + filtered.length, totalEntries)} of {totalEntries} entries
            </span>
           
             <div className={styles.paginationControls}>
              <button   className={styles.paginationButton} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button   className={styles.paginationButton} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
