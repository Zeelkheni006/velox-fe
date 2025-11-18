"use client";
import React, { useState, useEffect, useMemo ,useRef} from "react";
import Layout from "../pages/page"; 
import styles from "../styles/Leads.module.css";
import { useRouter,useSearchParams } from 'next/navigation';
import dynamic from "next/dynamic";
import { getLeads, updateLeadStatus,getFilterDropdownData} from "../../api/manage_users/lead";
import Select from "react-select";
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { handleCopy } from "../components/popup";
import { SlHome } from "react-icons/sl";
import { FcCancel } from "react-icons/fc";

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
  categories: [],
  city: [],
  status: [],
});
const [selectedCategories, setSelectedCategories] = useState([]);
const [selectedName, setSelectedName] = useState(null);
const [selectedEmail, setSelectedEmail] = useState(null);
const [selectedPhone, setSelectedPhone] = useState(null);
const [selectedCity, setSelectedCity] = useState(null);
const [selectedStatus, setSelectedStatus] = useState(null);
const currentLeads = leads;
const initialized = useRef(false);
const [franchiseMessage, setFranchiseMessage] = useState("");
const fetchLeadsData = async (page = currentPage, perPage = entriesPerPage, filters = {}) => {
  try {
    const { leads, total } = await getLeads(page, perPage, filters);

    const normalizedLeads = leads.map(l => {
   
      const categoryObj = l.categories || l.category_list || {};

      const categoryNames = Array.isArray(categoryObj)
        ? categoryObj
        : Object.values(categoryObj);

      return {
        ...l,
      
        city: l.city || l.city_id || "",
        state: l.state || l.state_id || "",
        country: l.country || l.country_id || "",

      
        categories: categoryNames,
      };
    });

    setLeads(normalizedLeads);
    setTotalLeads(total);
  } catch (err) {
    showPopup(err.message || "Something went wrong!", "error");
  }
};
const [showFranchisePopup, setShowFranchisePopup] = useState(false);

useEffect(() => {
  if (!initialized.current) return; // skip before mount

  // Fetch leads only when user changes filters or pagination
  fetchLeadsData(currentPage, entriesPerPage, {
    name: selectedName,
    email: selectedEmail,
    phone: selectedPhone,
    city_id: selectedCity?.value,
    status: selectedStatus,
    category_list: selectedCategories.map(c => Number(c.value))
  });
}, [
  currentPage,
  entriesPerPage,
  selectedName,
  selectedEmail,
  selectedPhone,
  selectedCity,
  selectedStatus,
  selectedCategories
]);

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(prev => prev + 1);
  }
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(prev => prev - 1);
  }
};
const totalPages = Math.ceil(totalLeads / entriesPerPage);
const handleEntriesChange = (e) => {
  const value = Number(e.target.value);
  setEntriesPerPage(value);
  setCurrentPage(1);
};


  // Sorting
const handleSort = (key) => {
  setSortConfig(prev => {
    if (prev.key === key) {
      if (prev.direction === "asc") return { key, direction: "desc" };
      if (prev.direction === "desc") return { key: null, direction: null };
    }
    return { key, direction: "asc" };
  });
};

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: "5px", fontSize: "12px" }}>
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : ""}
    </span>
  );
const sortedLeads = useMemo(() => {
  if (!sortConfig.key) return leads;

  const sorted = [...leads].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Handle null/undefined
    aValue = aValue ?? "";
    bValue = bValue ?? "";

    // If array (categories), join to string for comparison
    if (Array.isArray(aValue)) aValue = aValue.join(", ");
    if (Array.isArray(bValue)) bValue = bValue.join(", ");

    // If number, compare as numbers
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortConfig.direction === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }

    // Compare strings case-insensitively
    return sortConfig.direction === "asc"
      ? String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase())
      : String(bValue).toLowerCase().localeCompare(String(aValue).toLowerCase());
  });

  return sorted;
}, [leads, sortConfig]);


const handleAddToFranchise = (lead) => {
 
  const isTaken = false; 

  if (isTaken) {
    setFranchiseMessage("⚠️ This Mobile Number Has Already Been Taken");
  } else {
    setFranchiseMessage(" This Mobile Number Has Already Been Taken");
  }

  setShowFranchisePopup(true);
};
 

useEffect(() => {
  setCurrentPage(1);
}, [search]);


 
  const handleManageStatusClick = (lead) => {
    setActiveLead({ ...lead, id: lead._id || lead.id });
    setShowModal(true);
  };

const handleAccept = async () => {
  if (!activeLead?.id) return alert("Lead ID is missing!");

  try {
    const res = await updateLeadStatus(activeLead.id, 1); 

    if (res.success) {
      setLeads(prev =>
        prev.map(l =>
          String(l._id || l.id) === String(activeLead.id)
            ? { ...l, status: "ACCEPTED" }
            : l
        )
      );

      setShowModal(false);

      showPopup(" Status updated to ACCEPT", "success");

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

      showPopup(" Status updated to DECLINE", "error");

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
    l.status || "",
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableBody,
    startY: 30,
    styles: { fontSize: 8, cellPadding: 2, overflow: "linebreak" },
    headStyles: { fillColor: [22, 160, 133] },

   
didParseCell: function(data) {
  if (data.column.index === 8) { 
    const status = data.cell.text[0]?.trim();

    if (status === "ACCEPTED") {
      data.cell.styles.fillColor = [46, 204, 113]; // green
      data.cell.styles.textColor = [255, 255, 255];
    } else if (status === "DECLINE") {
      data.cell.styles.fillColor = [231, 76, 60]; // red
      data.cell.styles.textColor = [255, 255, 255];
    } else if (status === "PENDING") {
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

useEffect(() => {
    if (initialized.current) return; // ✅ prevent double call
  initialized.current = true;

  // Fetch leads
  fetchLeadsData(currentPage, entriesPerPage);
  const fetchDropdownData = async () => {
    try {
      const res = await getFilterDropdownData();

      // If res.name is empty, fallback to unique names from leads
      const namesFromLeads = Array.isArray(leads) 
        ? [...new Set(leads.map(l => l.name).filter(Boolean))]
        : [];

      setDropdownData({
        name: Array.isArray(res?.name) && res.name.length > 0
          ? res.name.map(n => ({ label: n.trim(), value: n.trim() }))
          : namesFromLeads.map(n => ({ label: n, value: n })),
        email: Array.isArray(res?.email) ? res.email.map(e => ({ label: e, value: e })) : [],
        phone: Array.isArray(res?.phone) ? res.phone.map(p => ({ label: p, value: p })) : [],
        categories: res?.categories ? Object.entries(res.categories).map(([id, title]) => ({ label: title, value: id })) : [],
city: res?.city
  ? Object.entries(res.city).map(([id, name]) => ({ label: name, value: Number(id) }))
  : [],
        status: [
          { label: "PENDING", value: "PENDING" },
          { label: "ACCEPTED", value: "ACCEPTED" },
          { label: "DECLINE", value: "DECLINE" },
        ],
      });
    } catch (err) {
      console.error("Dropdown fetch failed:", err);
    }
  };

  fetchDropdownData();
}, []);

const selectStyles = {
  menuPortal: base => ({ ...base, zIndex: 9999 }),
  menu: base => ({ ...base, zIndex: 9999 })
};


   const goToDashboard = () => {
    router.push("/admin/dashboard"); 
  };
  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />
      <div className={styles.pageWrapper}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb} style={{ cursor: "pointer"}}>Lead</span>
            <span className={styles.separator}> | </span>
                <SlHome
                                   style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                   onClick={goToDashboard}
                                   title="Go to Dashboard"
                                 />
                <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Lead</span>
          </div>
        </div>
        <div className={styles.card}>
          <h2 className={styles.heading}>Leads</h2>

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
<Select
  placeholder="Select Name"
  options={dropdownData.name}
  value={selectedName ? { value: selectedName, label: selectedName } : null}
onChange={opt => {
  const selected = opt?.value || null;
  setSelectedName(selected);
  setCurrentPage(1);

  if (selected) {
    fetchLeadsData(1, entriesPerPage, { name: selected });
  } else {
    fetchLeadsData(1, entriesPerPage, {}); 
  }
}}
  className={styles.select}
  isClearable 
/>

<Select
  placeholder="Select Email"
  options={dropdownData.email}
  value={selectedEmail ? { value: selectedEmail, label: selectedEmail } : null}
onChange={opt => {
  const selected = opt?.value || null;
  setSelectedEmail(selected);
  setCurrentPage(1);

  if (selected) {
    fetchLeadsData(1, entriesPerPage, { email: selected });
  } else {
    fetchLeadsData(1, entriesPerPage, {});
  }
}}
  className={styles.select}
    isClearable 
/>

<Select
  placeholder="Select Phone"
  options={dropdownData.phone}
  value={selectedPhone ? { value: selectedPhone, label: selectedPhone } : null}
 onChange={opt => {
  const selected = opt?.value || null;
  setSelectedPhone(selected);
  setCurrentPage(1);

  if (selected) {
    fetchLeadsData(1, entriesPerPage, { phone: selected });
  } else {
    fetchLeadsData(1, entriesPerPage, {});
  }
}}
  className={styles.select}
    isClearable 
/>
<Select
  isMulti
  placeholder="Select Category"
  options={dropdownData.categories}
  value={selectedCategories}
  onChange={opt => {
const values = (opt || []).map(c => Number(c.value));
setSelectedCategories(opt || []);
if (values.length > 0) {
  fetchLeadsData(1, entriesPerPage, { category_list: values });
} else {
  fetchLeadsData(1, entriesPerPage, {});
}
  }}
  className={styles.select}
  isClearable
/>

<Select
  placeholder="Select City"
  options={dropdownData.city} 
  value={selectedCity}
  onChange={opt => {
    setSelectedCity(opt); 
    setCurrentPage(1);

    if (opt) {
      fetchLeadsData(1, entriesPerPage, { city_id: opt.value });
    } else {
      fetchLeadsData(1, entriesPerPage, {});
    }
  }}
  className={styles.select}
  isClearable 
/>

<Select
  placeholder="Select Status"
  options={dropdownData.status}
  value={selectedStatus ? { value: selectedStatus, label: selectedStatus } : null}
  onChange={opt => {
    const selected = opt?.value || null;
    setSelectedStatus(selected);
    setCurrentPage(1);

    if (selected) {
      
      const statusMap = { "PENDING": 0, "ACCEPTED": 1, "DECLINE": 2 };
      fetchLeadsData(1, entriesPerPage, { status: statusMap[selected] });
    } else {
      fetchLeadsData(1, entriesPerPage, {}); // reset filter
    }
  }}
  className={styles.select}
  isClearable 
/>

  </div>
)}

  </div>

 
  <div className={styles.middleRow}>
    <button className={styles.buttonPrimary} onClick={handlePdfClick}>PDF</button>
    <button className={styles.buttonSecondary} onClick={handlePrintClick}>Print</button>
  </div>


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
              {[
 "name","email","phone","message",
 "categories","country","state","city",
 "status"
].map((key) => (
<th key={key} onClick={() => handleSort(key)} style={{ cursor: "pointer" }}>
  {key.charAt(0).toUpperCase() + key.slice(1)}
  <SortArrow direction={sortConfig.key === key ? sortConfig.direction : null} />
</th>
))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {sortedLeads.map((lead, index) => (
                 <tr
  key={index}
onDoubleClick={() => router.push(`/admin/edit?id=${lead._id || lead.id}`)}
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
    {(() => {
      const list = Array.isArray(lead.categories) ? lead.categories : [];
      const isExpanded = expandedMessageIndex === index;
      const limited = list.slice(0, isExpanded ? list.length : 2);

      return (
        <>
          {limited.map((cat, i) => (
            <div
              key={i}
              className={styles.categoryBox} // each category gets its own box
              onClick={(e) => handleCopy(e, cat, "Category", showPopup)}
            >
              {cat}
            </div>
          ))}

          {list.length > 2 && (
            <button
              className={styles.showMoreBtn}
              onClick={(e) => {
                e.stopPropagation();
                setExpandedMessageIndex(isExpanded ? null : index);
              }}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      );
    })()}
  </div>
</td> 


                    <td onClick={(e) => handleCopy(e, lead.country, "country", showPopup)}>{lead.country}</td>
                    <td onClick={(e) => handleCopy(e, lead.state, "state", showPopup)}>{lead.state}</td>
                    <td onClick={(e) => handleCopy(e, lead.city, "city", showPopup)}>{lead.city}</td>
                  <td>
  <span
    className={`${styles.badge} ${
      lead.status === "PENDING" ? styles.pending :
      lead.status === "ACCEPTED" ? styles.accept : styles.decline
    }`}
    onClick={() => handleManageStatusClick(lead)} 
    style={{ cursor: "pointer" }} 
  >
    {lead.status}
  </span>
</td>
                    <td>
<button
  className={styles.editBtn}
 onClick={() => {
  localStorage.setItem("editLeadData", JSON.stringify(lead));
  setTimeout(() => {
    router.push(`/admin/edit?id=${lead._id || lead.id}`);
  }, 100); // small delay avoids React race condition
}}
>
  Edit
</button>

                      <button className={styles.statusBtn} onClick={() => handleManageStatusClick(lead)}>Manage Status</button>

{lead.status?.toUpperCase() === "ACCEPTED" && (
  <button 
    className={styles.franchiseBtn}
    onClick={() => handleAddToFranchise(lead)}
  >
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
Showing {(currentPage - 1) * entriesPerPage + 1} to 
{Math.min(currentPage * entriesPerPage, totalLeads)} 
of {totalLeads} entries
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
      disabled={currentPage >= totalPages}
    >
      Next
    </button>
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
{showFranchisePopup && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button className={styles.closeBtn} onClick={() => setShowFranchisePopup(false)}>×</button>
   <div className={styles.iconWrapper}>
  <FcCancel size={80} className={styles.cancelIcon} />
</div>
      <h2 className={styles.h2}>Danger</h2>
      <p className={styles.p}>{franchiseMessage}</p>
      <div className={styles.modalActions}>
        <button 
          className={styles.acceptBtn}
          onClick={() => setShowFranchisePopup(false)}
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </Layout>
  );
}
