"use client";
import React, { useState, useEffect, useMemo } from "react";
import Layout from "../pages/page"; 
import styles from "../styles/Leads.module.css";
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import { getLeads, updateLeadStatus } from "../../api/manage_users/lead";

const jsPDF = dynamic(() => import("jspdf").then(mod => mod.jsPDF), { ssr: false });

export default function LeadsPage() {
  const router = useRouter();

  const [leads, setLeads] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [activeLead, setActiveLead] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Fetch leads
  const fetchLeadsData = async () => {
    try {
      const { leads, total } = await getLeads(currentPage, entriesPerPage);
      setLeads(leads);
      setTotalLeads(total);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => { fetchLeadsData(); }, [currentPage, entriesPerPage]);

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

  // Filter + Sort
  const filteredLeads = useMemo(() => {
    let filtered = leads.filter(lead =>
      lead.name.toLowerCase().includes(search.toLowerCase())
    );
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
  }, [leads, search, sortConfig]);

  const totalPages = Math.ceil(totalLeads / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, filteredLeads.length);
  const currentLeads = filteredLeads.slice(0, entriesPerPage);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handleEntriesChange = (e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); };

  // Status Management
  const handleManageStatusClick = (lead) => {
    // Map backend _id to id for API call
    setActiveLead({ ...lead, id: lead._id || lead.id });
    setShowModal(true);
  };

const handleAccept = async () => {
  if (!activeLead?.id) return alert("Lead ID is missing!");
  try {
    const res = await updateLeadStatus(activeLead.id, 1); // ✅ numeric for backend
    if (res.success) {
      // ✅ Update UI immediately
      setLeads(prev =>
        prev.map(l =>
          String(l._id || l.id) === String(activeLead.id)
            ? { ...l, status: "ACCEPT" }
            : l
        )
      );
      setShowModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      alert(res.message || "Failed to update status");
    }
  } catch (err) {
    alert(err.message);
  }
};

const handleDecline = async () => {
  if (!activeLead?.id) return alert("Lead ID is missing!");
  try {
    const res = await updateLeadStatus(activeLead.id, 2); // ✅ numeric for backend
    if (res.success) {
      setLeads(prev =>
        prev.map(l =>
          String(l._id || l.id) === String(activeLead.id)
            ? { ...l, status: "DECLINE" }
            : l
        )
      );
      setShowModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      alert(res.message || "Failed to update status");
    }
  } catch (err) {
    alert(err.message);
  }
};

  // PDF
  const handlePdfClick = async () => {
    const { jsPDF: JsPDF } = await import("jspdf");
    await import("jspdf-autotable");
    const doc = new JsPDF();
    doc.text("Leads (Current Page)", 14, 20);
    const tableColumn = ["Name", "Email", "phone", "message", "Country", "State", "City", "Status"];
    const tableBody = currentLeads.map(l => [
      l.name, l.email, l.mobile, l.skill, l.country, l.state, l.city, l.status
    ]);
    doc.autoTable({ head: [tableColumn], body: tableBody, startY: 30, styles: { fontSize: 8 }, headStyles: { fillColor: [22,160,133] } });
    doc.save("leads.pdf");
  };

  const handlePrintClick = () => {
    const leadsString = encodeURIComponent(JSON.stringify(leads));
    router.push(`/admin/print-leads?leads=${leadsString}`);
  };

  return (
    <Layout>
      <div className={styles.pageWrapper}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Lead</span> &gt; <span className={styles.breadcrumbActive}>Lead</span>
          </div>
        </div>
        <div className={styles.card}>
          <h1 className={styles.heading}>Leads</h1>

          <div className={styles.showEntries}>
            Show{" "}
            <select className={styles.select1} value={entriesPerPage} onChange={handleEntriesChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>{" "} entries
          </div>

          <div className={styles.controls}>
            <div>
              <button className={styles.buttonPrimary} onClick={handlePdfClick}>PDF</button>
              <button className={styles.buttonSecondary} onClick={handlePrintClick}>Print</button>
            </div>
            <div className={styles.dropdownGroup}>
              <select className={styles.select}><option>Select Skill</option></select>
              <select className={styles.select}><option>Select City</option></select>
            </div>
            <label className={styles.searchLabel}>
              Search:{" "}
              <input className={styles.searchBox} type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </label>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {["name","email","mobile","skill","country","state","city","status"].map((key) => (
                    <th key={key} onClick={() => handleSort(key)} style={{ cursor: "pointer" }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} <SortArrow direction={sortConfig.key===key ? sortConfig.direction : null} />
                    </th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead, index) => (
                  <tr key={startIndex + index}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.message}</td>
                    <td>{lead.country}</td>
                    <td>{lead.state}</td>
                    <td>{lead.city}</td>
                    <td>
                      <span className={`${styles.badge} ${
                        lead.status === "PENDING" ? styles.pending :
                        lead.status === "ACCEPT" ? styles.accept : styles.decline
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>
                     <button
  className={styles.editBtn}
  onClick={() =>
    router.push(
      `/admin/edit?id=${lead._id || lead.id}&name=${encodeURIComponent(lead.name)}&email=${encodeURIComponent(lead.email)}&mobile=${encodeURIComponent(lead.phone)}&skill=${encodeURIComponent(lead.message)}&country=${encodeURIComponent(lead.country)}&state=${encodeURIComponent(lead.state)}&city=${encodeURIComponent(lead.city)}`
    )
  }
>
  Edit
</button>

                      <button className={styles.statusBtn} onClick={() => handleManageStatusClick(lead)}>Manage Status</button>

                      {lead.status === "ACCEPT" && <button className={styles.franchiseBtn}>Add To Franchises</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <span>Showing {startIndex + 1} to {endIndex} of {filteredLeads.length} entries</span>
              <div className={styles.paginationControls}>
                <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span className={styles.pageNumber}>{currentPage}</span>
                <button className={styles.paginationButton} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>×</button>
              <h2 className={styles.h2}>What you want to do?</h2>
              <p className={styles.p}>Click Below Button To Manage Lead</p>
              <div className={styles.modalActions}>
                <button className={styles.acceptBtn} onClick={handleAccept}>Accept</button>
                <button className={styles.declineBtn} onClick={handleDecline}>Decline</button>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className={styles.modalOverlay}>
            <div className={styles.successPopup}>
              <div className={styles.checkmarkWrapper}>
                <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
                  <path className={styles.checkmarkCheck} fill="none" d="M14 27l7 7 16-16" />
                </svg>
              </div>
              <h2 className={styles.h2}>Success</h2>
              <p className={styles.p}>Status changed successfully</p>
              <button className={styles.okBtn} onClick={() => setShowSuccess(false)}>OK</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
