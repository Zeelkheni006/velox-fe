"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "../styles/managecustomer.module.css";
import Layout from "../pages/page";
import { useRouter } from "next/navigation";
import { deleteCustomer,getCustomers } from "../../api/manage_users/manage_customer";
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { handleCopy } from "../components/popup";
import { SlHome } from "react-icons/sl";

export default function ManageCustomerPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
const { popupMessage, popupType, showPopup } = usePopup();
  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Fetch customers from API
useEffect(() => {
  const fetchCustomers = async () => {
    try {
   const res = await getCustomers(); 
console.log("API Response:", res);

const normalized = res.map(c => ({
  id: c.id,
  username: c.username || "",
  email: c.email || "",
  phonenumber: c.phone || "",
  city: c.city || ""
}));

      console.log("Normalized customers:", normalized);

      setCustomers(normalized);
    } catch (err) {
      showPopup("Error fetching customers: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCustomers();
}, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    else if (sortConfig.key === key && sortConfig.direction === "desc") direction = null;
    setSortConfig({ key: direction ? key : null, direction });
  };

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: "5px", fontSize: "12px" }}>
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : ""}
    </span>
  );

  // Filter + Sort customers
const filteredCustomers = useMemo(() => {
  let filtered = customers
    .filter((cust) => cust) 
    .filter((cust) => {
     const matchesSearch =
  ((cust.username || cust.name) || "").toLowerCase().includes(search.toLowerCase()) ||
  (cust.email || "").toLowerCase().includes(search.toLowerCase()) ||
  ((cust.phonenumber || cust.mobile) || "").includes(search);
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

const handleDelete = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this customer?");
  if (!confirmDelete) return;

  try {
    await deleteCustomer(id); 
    setCustomers((prev) => prev.filter((cust) => cust.id !== id)); 
    showPopup("Customer moved to Deleted Accounts!");
  } catch (err) {
    showPopup("Error deleting customer: " + err.message);
  }
};

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const uniqueCities = [...new Set(customers.map((c) => c.city))];

     const goToDashboard = () => {
    router.push("/admin/dashboard"); 
  };

  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />
      <div className={styles.container}>
        <div className={styles.topCard}>
          <div>
            <span className={styles.breadcrumb}>Customers</span> 
            <span className={styles.separator}> | </span>
             <SlHome
                    style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                    onClick={goToDashboard}
                    title="Go to Dashboard"
                  />
            <span> &gt; </span>
             <span className={styles.breadcrumbActive}>Manage Customers</span>
          </div>
                    <button
  className={styles.deletedAccountBtn}
  onClick={() => router.push('/admin/delete_accounts')}
>
  Deleted Accounts
</button>
          <button className={styles.addBtn} onClick={() => router.push('/admin/create')}>+ Add New</button>
        </div>
        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Manage Customers</h3>

          <div className={styles.tableControls}>
            <div>
              Show{" "}
              <select className={styles.select} value={entriesPerPage} onChange={handleEntriesChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "} entries
            </div>

            <div>
              <label>City: </label>
              <select className={styles.select} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="">Select City</option>
                {uniqueCities.map((city, i) => <option key={i} value={city}>{city}</option>)}
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
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("username")} style={{ cursor: "pointer" }}>
                  Name <SortArrow direction={sortConfig.key === "username" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                  Email <SortArrow direction={sortConfig.key === "email" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("phonenumber")} style={{ cursor: "pointer" }}>
                  Phone <SortArrow direction={sortConfig.key === "phonenumber" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("city")} style={{ cursor: "pointer" }}>
                  City <SortArrow direction={sortConfig.key === "city" ? sortConfig.direction : null} />
                </th>
                <th>Options</th>
              </tr>
            </thead>
          <tbody>
  {loading ? (
    <tr>
      <td colSpan={5} style={{ textAlign: "center", padding: "50px" }}>
        <div className={styles.spinner}></div>
      </td>
    </tr>
  ) : currentCustomers.length > 0 ? (
    currentCustomers.map((cust) => (
      <tr key={cust.id}>
        <td onClick={(e) => handleCopy(e, cust.username, "Username", showPopup)}>
          {cust.username}
        </td>
        <td onClick={(e) => handleCopy(e, cust.email, "Email", showPopup)}>
          {cust.email}
        </td>
        <td onClick={(e) => handleCopy(e, cust.phonenumber, "Phone", showPopup)}>
          {cust.phonenumber}
        </td>
        <td onClick={(e) => handleCopy(e, cust.city, "City", showPopup)}>
          {cust.city}
        </td>
        <td>
          <button
            className={styles.deletebtn}
            onClick={() => handleDelete(cust.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5}>No matching records found.</td>
    </tr>
  )}
</tbody>
          </table>

          <div className={styles.pagination}>
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} entries
            </span>
            <div className={styles.paginationControls}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
