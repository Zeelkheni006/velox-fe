    // pages/leads.js
    "use client";
    import React, { useState } from "react";
    import Layout from "../pages/page"; // Replace with your actual layout path
    import styles from "../styles/Leads.module.css";
    import { useRouter } from 'next/navigation';
    import dynamic from "next/dynamic";



    const leadsData = [
    {
        name: "imran",
        email: "imranvohra333@gmail.com",
        mobile: "9712613556",
        skill: "I m female hairstylist",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        status: "PENDING",
    },
    {
        name: "Shabnam I vohra",
        email: "shabnamvohra30987@gmail.com",
        mobile: "9825196202",
        skill: "Beautician",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        status: "PENDING",
    },
    {
        name: "MOHAMMAD ANAS QURESHI",
        email: "aquacool2004@gmail.com",
        mobile: "7574896226",
        skill: "AC TECHNICIAN",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        status: "PENDING",
    },
    {
        name: "Bhavin",
        email: "info.kbenterprise.jmr@gmail.com",
        mobile: "7984725205",
        skill: "Washing machine technician",
        country: "India",
        state: "Gujarat",
        city: "Jamnagar",
        status: "PENDING",
    },
    {
        name: "JEET TECHNO",
        email: "jeet.techno1@gmail.com",
        mobile: "8511862134",
        skill: "Home appliance service",
        country: "India",
        state: "Gujarat",
        city: "Jamnagar",
        status: "PENDING",
    },
    {
        name: "Pavan Gangtani",
        email: "pavangangtani@gmail.com",
        mobile: "9664819058",
        skill: "2-wheeler mechanic",
        country: "India",
        state: "Gujarat",
        city: "Jamnagar",
        status: "PENDING",
    },
    {
        name: "Honey Takhtani",
        email: "honey1234@gmail.com",
        mobile: "9825737456",
        skill: "Makeup artist",
        country: "India",
        state: "Gujarat",
        city: "Jamnagar",
        status: "PENDING",
    },
     
    ];
const jsPDF = dynamic(() => import("jspdf").then(mod => mod.jsPDF), { ssr: false });
    export default function LeadsPage() {
    const [search, setSearch] = useState("");
    const [leads, setLeads] = useState(leadsData);
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
const [activeLeadIndex, setActiveLeadIndex] = useState(null);
const [showSuccess, setShowSuccess] = useState(false);

const handlePrintClick = () => {
  const leadsString = encodeURIComponent(JSON.stringify(leads));
  console.log("Navigating to:", `/admin/print-leads?leads=${leadsString}`);
  router.push(`/admin/print-leads?leads=${leadsString}`);
};

  const handlePdfClick = async () => {
    const { jsPDF: JsPDF } = await import("jspdf");
    await import("jspdf-autotable");

    const doc = new JsPDF();

    doc.text("Leads (Current Page)", 14, 20);

    // Prepare table head and body
    const tableColumn = [
      "Name",
      "Email",
      "Mobile",
      "Skill",
      "Country",
      "State",
      "City",
      "Status",
    ];

    const tableBody = currentLeads.map(lead => [
      lead.name,
      lead.email,
      lead.mobile,
      lead.skill,
      lead.country,
      lead.state,
      lead.city,
      lead.status,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableBody,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] }, // teal-ish color for header
    });

    doc.save("leads.pdf");
  };

    // ✅ Toggle status from PENDING to ACCEPT
    const handleStatusClick = (index) => {
        const updatedLeads = [...leads];
        updatedLeads[index].status =
        updatedLeads[index].status === "PENDING" ? "ACCEPT" : "PENDING";
        setLeads(updatedLeads);
    };

  const [currentPage, setCurrentPage] = useState(1);
const [entriesPerPage, setEntriesPerPage] = useState(10);

const filteredLeads = leads.filter((lead) =>
  lead.name.toLowerCase().includes(search.toLowerCase())
);

const totalPages = Math.ceil(filteredLeads.length / entriesPerPage);
const startIndex = (currentPage - 1) * entriesPerPage;
const endIndex = Math.min(startIndex + entriesPerPage, filteredLeads.length);
const currentLeads = filteredLeads.slice(startIndex, endIndex);

const handlePrevPage = () => {
  setCurrentPage((prev) => Math.max(prev - 1, 1));
};

const handleNextPage = () => {
  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
};

const handleEntriesChange = (e) => {
  setEntriesPerPage(Number(e.target.value));
  setCurrentPage(1);
};
const handleManageStatusClick = (index) => {
  setActiveLeadIndex(index);
  setShowModal(true);
};

const handleAccept = () => {
  const updated = [...leads];
  updated[activeLeadIndex].status = "ACCEPT";
  setLeads(updated);
  setShowModal(false);

  // Show success message
  setShowSuccess(true);

  // Auto-close after 2.5 seconds (optional)
  setTimeout(() => {
    setShowSuccess(false);
  }, 2500);
};

const handleDecline = () => {
  const updated = [...leads];
  updated[activeLeadIndex].status = "DECLINE"; // Change from PENDING to DECLINE
  setLeads(updated);
  setShowModal(false);

  // Show success message
  setShowSuccess(true);

  setTimeout(() => {
    setShowSuccess(false);
  }, 2500);
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
                </select>{" "}
                entries
            </div>

            <div className={styles.controls}>
                <div>
             <button className={styles.buttonPrimary} onClick={handlePdfClick}>PDF</button>

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                </label>

            </div>
<div className="printableArea"></div>
           <div className={styles.tableWrapper}>
                <table className={styles.table}>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Skill</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                      {currentLeads.map((lead, index) => (
                        <tr key={startIndex + index}>

                        <td>{lead.name}</td>
                        <td>{lead.email}</td>
                        <td>{lead.mobile}</td>
                        <td>{lead.skill}</td>
                        <td>{lead.country}</td>
                        <td>{lead.state}</td>
                        <td>{lead.city}</td>
                        <td>
                    <span
  className={`${styles.badge} ${
    lead.status === "PENDING"
      ? styles.pending
      : lead.status === "ACCEPT"
      ? styles.accept
      : styles.decline
  }`}
>
  {lead.status}
</span>
                        </td>
                        <td>
    <button
    className={styles.editBtn}
    onClick={() => {
        router.push(
        `/admin/edit?name=${encodeURIComponent(lead.name)}&email=${encodeURIComponent(
            lead.email
        )}&mobile=${encodeURIComponent(lead.mobile)}&skill=${encodeURIComponent(
            lead.skill
        )}&country=${encodeURIComponent(lead.country)}&state=${encodeURIComponent(
            lead.state
        )}&city=${encodeURIComponent(lead.city)}`
        );
    }}
    >
    Edit
    </button>
                        <button className={styles.statusBtn} onClick={() => handleManageStatusClick(startIndex + index)}>
  Manage Status
</button>
                        {lead.status === "ACCEPT" && (
                            <button className={styles.franchiseBtn}>
                            Add To Franchises
                            </button>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>  
                </table>
     <div className={styles.pagination}>
  <span>
    Showing {startIndex + 1} to {endIndex} of {filteredLeads.length} entries
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
        </Layout>
    );
    }
