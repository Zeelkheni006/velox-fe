"use client";
import React, { useState, useEffect } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import Layout from "../pages/page";
import { SlHome } from "react-icons/sl";
import styles from "../styles/Franchises.module.css";
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { handleCopy } from "../components/popup";
import { getFranchiseOwners ,getFranchiseOwnersData,searchFranchiseOwners} from "../../api/manage_users/franchise";

export default function FranchisesPage() {
 const router = useRouter();
const searchParams = useSearchParams(); 
const adminId = searchParams.get("admin_id");
const { popupMessage, popupType, showPopup } = usePopup();
  const [franchises, setFranchises] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
const [hasFranchise, setHasFranchise] = useState(1);

  //  Fetch data from API
useEffect(() => {
  const fetchData = async () => {
    const res = await getFranchiseOwners(
      currentPage,
      entriesPerPage,
      hasFranchise 
    );

    if (res.success) {
      setFranchises(res.data);
      setTotalEntries(res.total);
    } else {
      setFranchises([]);
      setTotalEntries(0);
    }
  };

  fetchData();
}, [currentPage, entriesPerPage, hasFranchise]);


  //  Sorting logic
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

 

  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
 
  
useEffect(() => {
  const delayDebounce = setTimeout(async () => {
    if (search.trim() === "") {
      const res = await getFranchiseOwners(
        currentPage,
        entriesPerPage,
        hasFranchise
      );

      if (res.success) {
        setFranchises(res.data);
        setTotalEntries(res.total);
      }
      return;
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

  const res = await searchFranchiseOwners(search, token);

if (res.success && Array.isArray(res.data?.franchise_owners)) {
  setFranchises(res.data.franchise_owners); // proper array
  setTotalEntries(res.data.total); // total entries
  setCurrentPage(1); // page reset
} else {
  setFranchises([]);
  setTotalEntries(0);
}


  }, 500);

  return () => clearTimeout(delayDebounce);
}, [search, currentPage, entriesPerPage, hasFranchise]);


const displayedData = franchises.slice(startIndex, startIndex + entriesPerPage);
  return (
    <Layout>
            <PopupAlert message={popupMessage} type={popupType} />
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
<div className={styles.topActions}>
  <button
    className={styles.btntrue}
    onClick={() => {
      setHasFranchise((prev) => (prev === 1 ? 0 : 1)); 
      setCurrentPage(1);
    }}
  >
    {hasFranchise === 1 ? "Show False Data" : "Show True Data"}
  </button>
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
  {displayedData.map((item) => (
    <tr
      key={item.admin_id}
      onDoubleClick={() => {
        // Current row na data store karo
        localStorage.setItem("franchiseOwnersData", JSON.stringify(item));
        // Edit page redirect
        router.push(`/admin/edit-franchise?admin_id=${item.admin_id}`);
      }}
      style={{ cursor: "pointer" }} // UX improvement: show pointer
    >
      <td onClick={(e) => handleCopy(e, item.owner_name, "name", showPopup)}>{item.owner_name}</td>
      <td onClick={(e) => handleCopy(e, item.owner_email, "email", showPopup)}>{item.owner_email}</td>
      <td onClick={(e) => handleCopy(e, item.owner_phone, "phone", showPopup)}>{item.owner_phone}</td>
      <td>
        <button
          className={styles.editButton}
          onClick={() => {
            localStorage.setItem("franchiseOwnersData", JSON.stringify(item));
            router.push(`/admin/edit-franchise?admin_id=${item.admin_id}`);
          }}
        >
          Edit
        </button>

        {item.make_franchise_button_visible && (
          <button
            className={styles.createButton}
            onClick={async () => {
              const res = await getFranchiseOwnersData(item.admin_id);
              if (res.success) {
                localStorage.setItem("franchiseOwnersData", JSON.stringify(res.data));
                router.push(`/admin/create-franchise?admin_id=${item.admin_id}`);
                showPopup("Franchise owner data fetched successfully ✔", "success");
              } else {
                showPopup(res.message || "Failed to fetch data", "error");
              }
            }}
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
          Showing {startIndex + 1} to {Math.min(startIndex + displayedData.length, totalEntries)} of {totalEntries} entries

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
