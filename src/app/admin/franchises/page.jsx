"use client";
import React, { useState,useEffect } from "react";
import { useRouter } from 'next/navigation'; 
import styles from "../styles/Franchises.module.css";
 import Layout from "../pages/page";
import { jsPDF } from "jspdf";
import dynamic from "next/dynamic";


const franchiseData = [
  {
    id: 34,
    name: "ABC ENTERPRICE JAM",
    country: "India",
    state: "Gujarat",
    city: "Jamnagar",
    commission: "20%",
    status: " Active",
  },
  {
    id: 33,
    name: "Velox Ahmedabad",
    country: "India",
    state: "Gujarat",
    city: "Ahmedabad",
    commission: "0%",
    status: " Active",
  },
  {
    id: 32,
    name: "Spark Services",
    country: "India",
    state: "Gujarat",
    city: "Morbi",
    commission: "0%",
    status: " Active",
  },
  {
    id: 31,
    name: "Execelent Management",
    country: "India",
    state: "Gujarat",
    city: "Rajkot",
    commission: "0%",
    status: " Active",
  },
  {
    id: 30,
    name: "Jony Rathod",
    country: "India",
    state: "Gujarat",
    city: "Surat",
    commission: "10%",
    status: "Active",
  },
  {
    id: 29,
    name: "Manisha Beauty Care",
    country: "India",
    state: "Gujarat",
    city: "Jamnagar",
    commission: "10%",
    status: "Active",
  },
  {
    id: 28,
    name: "MP MANAGEMENT",
    country: "India",
    state: "Gujarat",
    city: "Surat",
    commission: "10%",
    status: " Active",
  },
  {
    id: 27,
    name: "XYZ Car Service",
    country: "India",
    state: "Gujarat",
    city: "Surat",
    commission: "10%",
    status: "Active",
  },
    {
    id: 30,
    name: "Manisha Beauty Care",
    country: "India",
    state: "Gujarat",
    city: "Jamnagar",
    commission: "10%",
    status: "Active",
  },
  {
    id: 31,
    name: "MP MANAGEMENT",
    country: "India",
    state: "Gujarat",
    city: "Surat",
    commission: "10%",
    status: " Active",
  },
  {
    id: 32,
    name: "XYZ Car Service",
    country: "India",
    state: "Gujarat",
    city: "Surat",
    commission: "10%",
    status: "Active",
  },
];

export default function FranchisesPage() {
      const [franchises, setFranchises] = useState(franchiseData);
       const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const router = useRouter();

const handlePrintClick = () => {
  localStorage.setItem("franchisesToPrint", JSON.stringify(franchises));
  router.push("/admin/print-franchises");  // Adjust route as per your project structure
};
  const toggleStatus = (id) => {
    const updated = franchises.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === "Active" ? "In Active" : "Active",
          }
        : item
    );
    setFranchises(updated);
  };
 const totalPages = Math.ceil(franchises.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, franchises.length);
  const currentFranchises = franchises.slice(startIndex, endIndex);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
const [showModal, setShowModal] = useState(false);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to first page
  };

 
const handlePrevPage = () => {
  setCurrentPage((prev) => Math.max(prev - 1, 1));
};

const handleNextPage = () => {
  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
};
const handleMoreInfo = (franchise) => {
  setSelectedFranchise(franchise);
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setSelectedFranchise(null);
};

  const jsPDF = dynamic(() => import("jspdf").then(mod => mod.jsPDF), { ssr: false });

  useEffect(() => {
    import("jspdf-autotable");
  }, []);

  const handlePDFDownload = async () => {
    const { jsPDF: JsPDF } = await import("jspdf");
    await import("jspdf-autotable");

    const doc = new JsPDF();

    doc.text("Franchises (Current Page)", 40, 40);
      const tableBody = franchiseData.map(f => [
    f.id,
    f.name,
    f.country,
    f.state,
    f.city,
    f.commission,
    f.status.trim(),
  ]);
  console.log(tableBody);
    doc.autoTable({
      head: [["ID", "Name", "Country", "State", "City", "Commission", "Status"]],
      body: tableBody,
      startY: 60,
    });

    doc.save("franchises.pdf");
  };

  return (
    <Layout>
    <div className={styles.container}>
        <div className={styles.headerContainer}>
            <div>
                <span className={styles.breadcrumb}>Franchise</span> &gt; <span className={styles.breadcrumbActive}>Franchise</span>
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
            <th>ID</th>
            <th>Franchise Name</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Commission</th>
            <th>More Information</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
             {currentFranchises.map((franchise,index) => (
          <tr key={startIndex + index}>
              <td>{franchise.id}</td>
              <td>{franchise.name}</td>
              <td>{franchise.country}</td>
              <td>{franchise.state}</td>
              <td>{franchise.city}</td>
              <td>{franchise.commission}</td>
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
 onClick={() => router.push(`/admin/franchises-edit/${franchise.id}`)}
>
  Edit
</button>

        <button
          onClick={() => toggleStatus(franchise.id)}
          className={
            franchise.status.trim() === "Active"
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
          <span className={styles.label}>Time</span>
          <span className={styles.separator}>:</span>
         <span className={styles.value}>{selectedFranchise.time}</span>
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
