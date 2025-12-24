"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Layout from "../pages/page";
import styles from "../styles/Franchises.module.css";
import dynamic from "next/dynamic";
import { SlHome } from "react-icons/sl";
 import usePopup from "../components/popup";
    import PopupAlert from "../components/PopupAlert";
import {fetchFranchises,fetchFranchiseById ,updateFranchiseStatus } from "../../api/manage_users/franchise"
import Image from "next/image";

const jsPDF = dynamic(() => import("jspdf").then(mod => mod.jsPDF), { ssr: false });

export default function FranchisesPage() {
  const router = useRouter();
const [franchises, setFranchises] = useState([]);
  const { popupMessage, popupType, showPopup } = usePopup();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState(null);

useEffect(() => {
  const loadFranchises = async () => {
    try {
      const res = await fetchFranchises();   // API call

      const apiData = res?.data?.franchise_data || [];

  const mappedData = apiData.map(franchise => ({
  id: franchise.franchise_id || '',
  name: franchise.franchise_name || '',
  country: franchise.country || '',
  state: franchise.state || '',
  city: franchise.city || '',
  commission: franchise.commission_rate ? `${franchise.commission_rate}%` : '',
  status: franchise.status ? "Active" : "Inactive",
  ownerName: franchise.owner_name || '',
  email: franchise.email || '',
  mobile: franchise.phone || '',
  worker: franchise.worker_count || '',
}));

      setFranchises(mappedData);
    } catch (error) {
      console.error("Franchise fetch error:", error);
      setFranchises([]);
    }
  };

  loadFranchises();
}, []);


  // Sorting
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

  // Filtered and Sorted Franchises
  const filteredFranchises = useMemo(() => {
    let filtered = franchises.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
    if (sortConfig.key && sortConfig.direction) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [franchises, search, sortConfig]);

  const totalPages = Math.ceil(filteredFranchises.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, filteredFranchises.length);
  const currentFranchises = filteredFranchises.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handleEntriesChange = (e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); };

const toggleStatus = async (id) => {
  try {
    const res = await updateFranchiseStatus(id);

    if (res?.success) {
      setFranchises(prev =>
        prev.map(f =>
          f.id === id
            ? {
                ...f,
                status: f.status === "Active" ? "Inactive" : "Active",
              }
            : f
        )
      );

      // ✅ SUCCESS MESSAGE
      showPopup(res?.message || "Status updated successfully");
    } else {
      showPopup(res?.message || "Status update failed");
    }
  } catch (error) {
    console.error("Status update error:", error);
    showPopup("Something went wrong while updating status");
  }
};



 const handleMoreInfo = async (franchise) => {
  try {
    const res = await fetchFranchiseById(franchise.id);

    const owner = res?.data?.owner_info || {};
    const info = res?.data?.franchise_info || {};

    const mappedDetail = {
      // Owner
      ownerName: owner.owner_name || "",
      ownerEmail: owner.owner_email || "",
      ownerMobile: owner.owner_phone || "",
      ownerAddress: owner.owner_address || "",
      ownerPincode: owner.owner_pincode || "",
       ownerPhoto: owner.owner_photo || "", 
      // Franchise
      name: info.franchise_name || "",
      email: info.franchise_email || "",
      mobile: info.franchise_phone || "",
      city: info.city || "",
      state: info.state || "",
      pincode: info.pincode || "",
      message: info.message || "",
      services: info.services || [],
      worker: info.worker_count || "",
      commission: info.commission_rate || "",
      status: info.status ? "Active" : "Inactive",
    };

    setSelectedFranchise(mappedDetail);
    setShowModal(true);
  } catch (error) {
    console.error("More info error:", error);
  }
};

  const handleCloseModal = () => { setShowModal(false); setSelectedFranchise(null); };

  const handlePrintClick = () => { localStorage.setItem("franchisesToPrint", JSON.stringify(franchises)); router.push("/admin/print-franchises"); };

  const handlePDFDownload = async () => {
    const { jsPDF: JsPDF } = await import("jspdf");
    await import("jspdf-autotable");
    const doc = new JsPDF();
    doc.text("Franchises (Current Page)", 14, 20);
    const tableBody = currentFranchises.map(f => [f.id, f.name, f.country, f.state, f.city, f.commission, f.status]);
    doc.autoTable({ head: [["ID","Name","Country","State","City","Commission","Status"]], body: tableBody, startY: 30 });
    doc.save("franchises.pdf");
  };
        const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
       <PopupAlert message={popupMessage} type={popupType} />
    <div className={styles.container}>
        <div className={styles.headerContainer}>
            <div>
                <span className={styles.breadcrumb}  style={{ cursor: "pointer"}}>Franchise</span>
                 <span className={styles.separator}> | </span>
                   <SlHome
                     style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                                      />
                   <span> &gt; </span>
                    <span className={styles.breadcrumbActive}>Franchise</span>
            </div>
            </div>
               <div className={styles.card}>
      <h1 className={styles.title}>Franchises</h1>
             <div className={styles.showEntries}>
                      Show{" "}
                     <select className={styles.select1} value={entriesPerPage} onChange={handleEntriesChange}>
                     <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
                      </select>{" "}
                      entries
                  </div>
                   <div className={styles.controls}>
                <div>
             <button className={styles.buttonPrimary} onClick={handlePDFDownload}>
  PDF
</button>

       <button className={styles.buttonSecondary} onClick={handlePrintClick}>
  Print
</button>

                </div>

                <div className={styles.dropdownGroup}>
                <select className={styles.select}>
                
                    <option>Select Skill</option>
                </select>
                <select className={styles.select}>
                    <option>Select City</option>
                </select>
                </div>
<label className={styles.searchLabel}>
  Search:{" "}
                <input
                className={styles.searchBox}
                type="text"
                placeholder="Search"
                
                onChange={(e) => setSearch(e.target.value)}
                />
                </label>
            </div>
            <div className="printableArea"></div>
              <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
               <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Id <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                <th>Owner name</th>
              <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Franchise Name <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                <th>phone number</th>
                <th>Email</th>
              {/* <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Country <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th> */}
              <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  State <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
              <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  City <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
               <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Commission <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                <th>Worker Count</th>
            <th>More Information</th>
               <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Status <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
            <th>Action</th>
          </tr>
        </thead>
       <tbody>
  {currentFranchises.map((franchise, index) => (
    <tr key={startIndex + index}>
      <td>{franchise.id}</td>
      <td>{franchise.ownerName}</td>
      <td>{franchise.name}</td>
      <td>{franchise.mobile}</td>
      <td>{franchise.email}</td>
      {/* <td>{franchise.country}</td> */}
      <td>{franchise.state}</td>
      <td>{franchise.city}</td>
      <td>{franchise.commission}</td>
      <td>{franchise.worker}</td>

      <td>
        <a
          href="#"
          className={styles.moreInfo}
          onClick={(e) => {
            e.preventDefault();
            handleMoreInfo(franchise);
          }}
        >
          More Information...
        </a>
      </td>

      <td className={styles.status}>{franchise.status}</td>

      <td>
       <button
  className={styles.editBtn}
  onClick={() => router.push(`/admin/franchises-edit?id=${franchise.id}`)}
>
  Edit
</button>

        <button
          onClick={() => toggleStatus(franchise.id)}
          className={
            franchise.status === "Active"
              ? styles.activeBtn
              : styles.inactiveBtn
          }
        >
          {franchise.status}
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>  
      </div>
                <div className={styles.pagination}>
              <span>
                {franchises.length === 0 ? (
                  "No entries found"
                ) : (
                  <>
                    Showing {startIndex + 1} to {endIndex} of {franchises.length} entries
                  </>
                )}
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
    {showModal && selectedFranchise && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalBox}>
      <div className={styles.modalHeader}>
        <h2>More Information</h2>
        <button className={styles.modalCloseBtn} onClick={handleCloseModal}>
          ×
        </button>
      </div>
      <hr />
      <div className={styles.modalSection}>
        <h4>Owner Info</h4>
        {selectedFranchise.ownerPhoto && (
  <div className={styles.ownerPhotoWrapper}>
    <img
      src={selectedFranchise.ownerPhoto}
      alt="Owner"
      className={styles.ownerPhoto}
    />
  </div>
)}

        <div className={styles.modalRow}>
          <span className={styles.label}>User Name</span>
          <span className={styles.separator}>:</span>
           <span className={styles.value}>{selectedFranchise.ownerName}</span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.label}>Email</span>
          <span className={styles.separator}>:</span>
              <span className={styles.value}>{selectedFranchise.email}</span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.label}>Mobile</span>
          <span className={styles.separator}>:</span>
           <span className={styles.value}>{selectedFranchise.mobile}</span>
        </div>
          <div className={styles.modalRow}>
          <span className={styles.label}>Address</span>
          <span className={styles.separator}>:</span>
           <span className={styles.value}>{selectedFranchise.ownerAddress}</span>
        </div>
         <div className={styles.modalRow}>
          <span className={styles.label}>Pincode</span>
          <span className={styles.separator}>:</span>
           <span className={styles.value}>{selectedFranchise.ownerPincode}</span>
        </div>
      </div>
      <hr />
      <div className={styles.modalSection}>
        <h4>Franchise Info</h4>
        <div className={styles.modalRow}>
          <span className={styles.label}>Name</span>
          <span className={styles.separator}>:</span>
          <span className={styles.value}>{selectedFranchise.name}</span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.label}>Email</span>
          <span className={styles.separator}>:</span>
             <span className={styles.value}>{selectedFranchise.email}</span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.label}>Mobile</span>
          <span className={styles.separator}>:</span>
           <span className={styles.value}>{selectedFranchise.mobile}</span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.label}>Pincode</span>
          <span className={styles.separator}>:</span>
         <span className={styles.value}>{selectedFranchise.pincode}</span>
        </div>
         <div className={styles.modalRow}>
          <span className={styles.label}>City</span>
          <span className={styles.separator}>:</span>
         <span className={styles.value}>{selectedFranchise.city}</span>
        </div>
         <div className={styles.modalRow}>
          <span className={styles.label}>State</span>
          <span className={styles.separator}>:</span>
         <span className={styles.value}>{selectedFranchise.state}</span>
        </div>
       
         <div className={styles.modalRow}>
          <span className={styles.label}>Services</span>
          <span className={styles.separator}>:</span>
         <span className={styles.value}>{selectedFranchise.services}</span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.label}>Worker Count</span>
          <span className={styles.separator}>:</span>
         <span className={styles.value}>{selectedFranchise.worker}</span>
        </div>
          <div className={styles.modalRow}>
          <span className={styles.label}> Commission</span>
          <span className={styles.separator}>:</span>
         <span className={styles.value}>{selectedFranchise.commission}%</span>
        </div>
      </div>
      <div className={styles.modalFooter}>
        <button className={styles.modalCloseBtnFooter} onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  </div>
)}

    </Layout>
  );
}
