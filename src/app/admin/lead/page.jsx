"use client";
import React, { useState, useEffect, useMemo } from "react";
import Layout from "../pages/page"; 
import styles from "../styles/Leads.module.css";
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import { getLeads, updateLeadStatus,getFilterDropdownData} from "../../api/manage_users/lead";
import Select from "react-select";
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { handleCopy } from "../components/popup";


const jsPDF = dynamic(() => import("jspdf").then(mod => mod.jsPDF), { ssr: false });

export default function LeadsPage() {
  const router = useRouter();
const [showFilter, setShowFilter] = useState(false);
  const [leads, setLeads] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [activeLead, setActiveLead] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
const [expandedMessageIndex, setExpandedMessageIndex] = useState(null);
const { popupMessage, popupType, showPopup } = usePopup();
const [dropdownData, setDropdownData] = useState({
  name: [],
  email: [],
  phone: [],
  categories: {},
  city: {},
  status:[],
});
const [selectedCategories, setSelectedCategories] = useState([]);
const [selectedName, setSelectedName] = useState(null);
const [selectedEmail, setSelectedEmail] = useState(null);
const [selectedPhone, setSelectedPhone] = useState(null);
const [selectedCity, setSelectedCity] = useState(null);
const [selectedStatus, setSelectedStatus] = useState(null);


  // Fetch leads
const fetchLeadsData = async () => {
  try {
    const { leads, total } = await getLeads(); // ✅ remove pagination from API call
    setLeads(leads);
    setTotalLeads(total);
  } catch (err) {
    alert(err.message);
  }
};

useEffect(() => {
  fetchLeadsData();

}, []);

  // Sorting
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

  // Filter + Sort
const filteredLeads = useMemo(() => {
  return leads.filter(lead => {
    return (
      (!selectedName || lead.name?.trim() === selectedName) &&
      (!selectedEmail || lead.email?.trim() === selectedEmail) &&
      (!selectedPhone || lead.phone?.trim() === selectedPhone) &&
      (!selectedCity || lead.city?.trim() === selectedCity.label?.trim()) &&
      (!selectedStatus || lead.status?.trim() === selectedStatus.label) &&
      (selectedCategories.length === 0 ||
        selectedCategories.some(cat =>
          (Array.isArray(lead.categories) ? lead.categories : [lead.categories])
            .map(c => c.toString().trim())
            .includes(cat.label.trim())
        )
      )
    );
  });
}, [leads, selectedName, selectedEmail, selectedPhone, selectedCity, selectedStatus, selectedCategories]);




useEffect(() => {
  setCurrentPage(1);
}, [search]);

const totalPages = Math.ceil(filteredLeads.length / entriesPerPage);
const startIndex = (currentPage - 1) * entriesPerPage;
const endIndex = Math.min(startIndex + entriesPerPage, filteredLeads.length);
const currentLeads = filteredLeads.slice(startIndex, endIndex);

useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages || 1);
  }
}, [totalPages, currentPage]);

 const handlePrevPage = () => setCurrentPage(p => Math.max(p - 1, 1));
const handleNextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));
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
      setLeads(prev =>
        prev.map(l =>
          String(l._id || l.id) === String(activeLead.id)
            ? { ...l, status: "ACCEPTED" }
            : l
        )
      );

      setShowModal(false);

      // ✅ Popup show here
      showPopup("✅ Status updated to ACCEPT", "success");

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
    const res = await updateLeadStatus(activeLead.id, 2);

    if (res.success) {
      setLeads(prev =>
        prev.map(l =>
          String(l._id || l.id) === String(activeLead.id)
            ? { ...l, status: "DECLINE" }
            : l
        )
      );

      setShowModal(false);

      // ✅ Popup show here
      showPopup("❌ Status updated to DECLINE", "error");

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

  const tableColumn = [
    "Name",
    "Email",
    "Phone",
    "Message",
    "category",
    "Country",
    "State",
    "City",
    "Status"
  ];

  const tableBody = currentLeads.map(l => [
    l.name || "",
    l.email || "",
    l.phone || "",
    l.message || "",
    l.category|| "",
    l.country || "",
    l.state || "",
    l.city || "",
    l.status || "PENDING"
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableBody,
    startY: 30,
    styles: { fontSize: 8, cellPadding: 2, overflow: "linebreak" },
    headStyles: { fillColor: [22, 160, 133] },

    // ✅ STATUS COLOR SUPPORT IN PDF
    didParseCell: function(data) {
      if (data.column.index === 7) { // status column index
        const status = data.cell.text[0];

        if (status === "ACCEPT") {
          data.cell.styles.fillColor = [46, 204, 113]; // green
          data.cell.styles.textColor = [255, 255, 255];
        } else if (status === "DECLINE") {
          data.cell.styles.fillColor = [231, 76, 60]; // red
          data.cell.styles.textColor = [255, 255, 255];
        } else { // Default PENDING
          data.cell.styles.fillColor = [243, 156, 18]; // orange
          data.cell.styles.textColor = [255, 255, 255];
        }
      }
    }
  });

  doc.save("leads.pdf");
};

const handlePrintClick = () => {
  sessionStorage.setItem("printLeads", JSON.stringify(leads));
  router.push("/admin/print-leads");
};

function formatMessage(message, wordsPerLine = 11) {
  const words = message.split(" ");
  const lines = [];

  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  }

  return lines.join("\n");
}

const selectStyles = {
  menu: (base) => ({ ...base, zIndex: 9999 }),
  control: (base) => ({
    ...base,
    minHeight: "38px",
    borderColor: "#b3b3b3",
    "&:hover": { borderColor: "#0d6efd" },
    boxShadow: "none"
  }),
};



useEffect(() => {
  const fetchDropdownData = async () => {
  try {
    const api = await getFilterDropdownData();

    setDropdownData({
      name: Array.isArray(api.name) ? api.name.map(n => n.trim()) : [],
      email: Array.isArray(api.email) ? api.email.map(e => e.trim()) : [],
      phone: Array.isArray(api.phone) ? api.phone.map(p => p.trim()) : [],
      status: Array.isArray(api.status) ? api.status.map(p => p.trim()) : [],
      categories: api.categories
        ? Object.entries(api.categories).map(([id, title]) => ({
            value: id,
            label: title.trim(),
          }))
        : [],

      city: api.city
        ? Object.entries(api.city).map(([id, title]) => ({
            value: id,
            label: title.trim(),
          }))
        : [],
    });

  } catch (err) {
    console.error("Dropdown Fetch Error:", err);
    setDropdownData({
      name: [],
      email: [],
      phone: [],
      categories: [],
      city: [],
      status:[],
    });
  }
};


  fetchDropdownData();
}, []);

// ✅ Call only ONCE in useEffect

  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />
      <div className={styles.pageWrapper}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Lead</span> &gt; <span className={styles.breadcrumbActive}>Lead</span>
          </div>
        </div>
        <div className={styles.card}>
          <h1 className={styles.heading}>Leads</h1>

    <div className={styles.controls}>

  {/* ✅ Row 1 */}
  <div className={styles.topRow}>
    <button
      className={styles.filterButton}
      onClick={() => setShowFilter(!showFilter)}
    >
      {showFilter ? "Hide Filter" : "Filter"}
    </button>

    {showFilter && (
  <div className={styles.filterGroup}>
    
    {/* Name Filter */}
{/* Name Filter */}
 <Select
      placeholder="All Names"
      options={[
        { label: "All Names", value: "" },
        ...(dropdownData?.name?.map(n => ({ label: n.trim(), value: n.trim() })) || [])
      ]}
      value={selectedName ? { label: selectedName, value: selectedName } : { label: "All Names", value: "" }}
      onChange={(opt) => setSelectedName(opt?.value || null)}
      className={styles.select}
    />

    {/* Email Filter */}
    <Select
      placeholder="All Emails"
      options={[
        { label: "All Emails", value: "" },
        ...(dropdownData?.email?.map(e => ({ label: e.trim(), value: e.trim() })) || [])
      ]}
      value={selectedEmail ? { label: selectedEmail, value: selectedEmail } : { label: "All Emails", value: "" }}
      onChange={(opt) => setSelectedEmail(opt?.value || null)}
      className={styles.select}
    />

    {/* Phone Filter */}
    <Select
      placeholder="All Phones"
      options={[
        { label: "All Phones", value: "" },
        ...(dropdownData?.phone?.map(p => ({ label: p.trim(), value: p.trim() })) || [])
      ]}
      value={selectedPhone ? { label: selectedPhone, value: selectedPhone } : { label: "All Phones", value: "" }}
      onChange={(opt) => setSelectedPhone(opt?.value || null)}
      className={styles.select}
    />

    {/* Category Filter */}
    <Select
      isMulti
      placeholder="All Categories"
      options={dropdownData?.categories || []}
      value={selectedCategories}
      onChange={(opt) => setSelectedCategories(opt || [])}
      className={styles.select}
    />

    {/* City Filter */}
    <Select
      placeholder="All Cities"
      options={[
        { value: "", label: "All Cities" },
        ...(dropdownData?.city || [])
      ]}
      value={selectedCity?.value ? selectedCity : { value: "", label: "All Cities" }}
      onChange={(opt) => setSelectedCity(opt?.value ? opt : null)}
      className={styles.select}
    />

    {/* Status Filter */}
    <Select
      placeholder="All Status"
      options={[
        { label: "All Status", value: "" },
        { label: "PENDING", value: "PENDING" },
        { label: "ACCEPTED", value: "ACCEPTED" },
        { label: "DECLINE", value: "DECLINE" },
      ]}
      value={selectedStatus?.value ? selectedStatus : { label: "All Status", value: "" }}
      onChange={(opt) => setSelectedStatus(opt?.value ? opt : null)}
      className={styles.select}
    />

  </div>
)}
  </div>

  {/* ✅ Row 2 */}
  <div className={styles.middleRow}>
    <button className={styles.buttonPrimary} onClick={handlePdfClick}>PDF</button>
    <button className={styles.buttonSecondary} onClick={handlePrintClick}>Print</button>
  </div>

  {/* ✅ Row 3 */}
  <div className={styles.bottomRow}>
    Show{" "}
    <select className={styles.select1} value={entriesPerPage} onChange={handleEntriesChange}>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
    </select>{" "}
    entries
  </div>

</div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {["name","email","mobile","skill","categories","country","state","city","status"].map((key) => (
                    <th key={key} onClick={() => handleSort(key)} style={{ cursor: "pointer" }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} <SortArrow direction={sortConfig.key===key ? sortConfig.direction : null} />
                    </th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead, index) => (
                 <tr
  key={startIndex + index}
  onDoubleClick={() =>
    router.push(
      `/admin/edit?id=${lead._id || lead.id}` 
        `&name=${encodeURIComponent(lead.name || "")}` 
        `&email=${encodeURIComponent(lead.email || "")}` 
        `&phone=${encodeURIComponent(lead.phone || "")}` 
        `&message=${encodeURIComponent(lead.message || "")}` 
         `&categories=${encodeURIComponent(lead.categories || "")}` 
        `&country=${encodeURIComponent(lead.country || "")}` 
        `&state=${encodeURIComponent(lead.state || "")}` 
        `&city=${encodeURIComponent(lead.city || "")}`
    )
  }
  style={{ cursor: "pointer" }}
>
                    <td
  onClick={(e) => handleCopy(e, lead.name, "Name", showPopup)}
  className={styles.copyCell}
>
  {lead.name}
</td>
                    <td
 onClick={(e) => handleCopy(e, lead.email, "Email", showPopup)}
  className={styles.copyCell}
>
  {lead.email}
</td>
                    <td
  onClick={(e) => handleCopy(e, lead.phone, "Phone",showPopup )}
  className={styles.copyCell}
>
  {lead.phone}
</td>
<td className={styles.messageCell}onClick={(e) => handleCopy(e, lead.message, "message", showPopup)}>
  <div className={styles.messageContent}>
    {expandedMessageIndex === index
      ? formatMessage(lead.message)
      : formatMessage(lead.message).split("\n").slice(0, 2).join("\n")}
  </div>

  {formatMessage(lead.message).split("\n").length > 2 && (
    <button
      className={styles.showMoreBtn}
      onClick={() =>
        setExpandedMessageIndex(
          expandedMessageIndex === index ? null : index
        )
      }
    >
      {expandedMessageIndex === index ? "Show Less" : "Show More"}
    </button>
  )}
</td>        
<td className={styles.categoryCell}>
  <div className={styles.categoryContent}>
    {(Array.isArray(lead.categories) ? lead.categories : lead.categories?.split(",") || [])
      .slice(0, expandedMessageIndex === index ? lead.categories.length : 2)
      .map((cat, i) => (
        <div
          key={i}
          className={styles.categoryLine}
          onClick={(e) => handleCopy(e, cat, "Category", showPopup)}
        >
          {cat}
        </div>
      ))}

    {Array.isArray(lead.categories) && lead.categories.length > 2 && (
      <button
        className={styles.showMoreBtn}
        onClick={(e) => {
          e.stopPropagation();
          setExpandedMessageIndex(expandedMessageIndex === index ? null : index);
        }}
      >
        {expandedMessageIndex === index ? "Show Less" : "Show More"}
      </button>
    )}
  </div>
</td>
                    <td onClick={(e) => handleCopy(e, lead.country, "country", showPopup)}>{lead.country}</td>
                    <td onClick={(e) => handleCopy(e, lead.state, "state", showPopup)}>{lead.state}</td>
                    <td onClick={(e) => handleCopy(e, lead.city, "city", showPopup)}>{lead.city}</td>
                    <td>
                      <span className={`${styles.badge} ${
                        lead.status === "PENDING" ? styles.pending :
                        lead.status === "ACCEPTED" ? styles.accept : styles.decline
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>
                    <button
  className={styles.editBtn}
  onClick={() =>
    router.push(
      `/admin/edit?id=${lead._id || lead.id}
      &name=${encodeURIComponent(lead.name)}
      &email=${encodeURIComponent(lead.email)}
      &phone=${encodeURIComponent(lead.phone)}
      &categories=${encodeURIComponent(
  Array.isArray(lead.categories)
    ? lead.categories.join(",")
    : ""
)}
      &message=${encodeURIComponent(lead.message)}
      &country=${encodeURIComponent(lead.country)}
      &state=${encodeURIComponent(lead.state)}
      &city=${encodeURIComponent(lead.city)}`
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
                <button disabled={currentPage >= totalPages}>Next</button>

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
