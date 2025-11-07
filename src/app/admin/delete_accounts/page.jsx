"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/managecustomer.module.css";
import Layout from "../pages/page";
import { getCustomer, recoverCustomer } from "../../api/manage_users/manage_customer";
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { handleCopy } from "../components/popup";
import { SlHome } from "react-icons/sl";
export default function DeletedAccountsPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
const { popupMessage, popupType, showPopup } = usePopup();
  // Fetch deleted accounts
  useEffect(() => {
    const fetchDeletedAccounts = async () => {
      try {
        const res = await getCustomer({ user: "deleted" });
        setCustomers(res);
      } catch (err) {
        console.error("Error fetching deleted accounts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeletedAccounts();
  }, []);

  // Recover account handler
const handleRecoverAccount = async (id) => {
  if (!id) return alert("Customer ID missing!");

  try {
    await recoverCustomer(id);
    showPopup("✅ Account recovered successfully!");
    setCustomers(customers.filter(c => (c._id || c.id) !== id)); // remove from deleted list
  } catch (err) {
    showPopup("❌ " + err.message);
  }
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

  // Filter + Sort
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter((cust) => {
      const matchesSearch =
        (cust.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (cust.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (cust.mobile || "").includes(search);
      const matchesCity = selectedCity ? cust.city === selectedCity : true;
      return matchesSearch && matchesCity;
    });

    if (!sortConfig.key || !sortConfig.direction) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [customers, search, selectedCity, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const uniqueCities = [...new Set(customers.map((c) => c.city))];
     const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/customer"); // Customer page
  };
  return (
    <Layout>
          <PopupAlert message={popupMessage} type={popupType} />
      <div className={styles.container}>
        <div className={styles.topCard}>
          <div>
            <span
               className={styles.breadcrumb}
               style={{ cursor: "pointer"}}
               onClick={goToManageCustomer}
             >
               Manage Customer
             </span>
                     <span className={styles.separator}> | </span>
                      <SlHome
                             style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                             onClick={goToDashboard}
                             title="Go to Dashboard"
                           />
                  <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Deleted Accounts</span>
          </div>
        </div>

        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Deleted Accounts</h3>

          <div className={styles.tableControls}>
            <div>
              Show{" "}
              <select className={styles.select} value={entriesPerPage} onChange={handleEntriesChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "}
              entries
            </div>

            <div>
              <label>City: </label>
              <select
                className={styles.select}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Select City</option>
                {uniqueCities.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Search: </label>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search by name, email or mobile"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>Loading deleted accounts...</div>
          ) : (
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
                    Phone <SortArrow direction={sortConfig.key === "mobile" ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort("city")} style={{ cursor: "pointer" }}>
                    City <SortArrow direction={sortConfig.key === "city" ? sortConfig.direction : null} />
                  </th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((cust) => (
                    <tr key={cust.id}>
                      <td onClick={(e) => handleCopy(e, cust.name, "name", showPopup)}>{cust.name}</td>
                      <td onClick={(e) => handleCopy(e, cust.email, "Email", showPopup)}>{cust.email}</td>
                      <td onClick={(e) => handleCopy(e, cust.mobile, "mobile", showPopup)}>{cust.mobile}</td>
                      <td onClick={(e) => handleCopy(e, cust.city, "City", showPopup)}>{cust.city}</td>
                      <td>
                        <button
                          className={styles.deletebtn}
                          onClick={() => handleRecoverAccount(cust.id)}
                        >
                          Recover Account
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No deleted accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          <div className={styles.pagination}>
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomers.length)} of{" "}
              {filteredCustomers.length} entries
            </span>
            <div className={styles.paginationControls}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
