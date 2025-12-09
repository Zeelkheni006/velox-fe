"use client";
import React, { useState, useEffect, useMemo ,useRef} from "react";
import Layout from "../pages/page"; 
import styles from "../styles/Leads.module.css";
import { useRouter,useSearchParams } from 'next/navigation';
import dynamic from "next/dynamic";
import { getLeads, updateLeadStatus,getFilterDropdownData,getLeadDetails,fetchKycDocuments,addLeadToFranchise,fetchRequestedServices } from "../../api/manage_users/lead";
import Select from "react-select";
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { handleCopy } from "../components/popup";
import { SlHome } from "react-icons/sl";
import { FcCancel, FcCheckmark ,FcSynchronize } from "react-icons/fc";

const jsPDF = dynamic(() => import("jspdf").then(mod => mod.jsPDF), { ssr: false });

export default function LeadsPage() {
  const router = useRouter();
   const [loading, setLoading] = useState(true);
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
const [showKycPopup, setShowKycPopup] = useState(false);
const [kycData, setKycData] = useState(null);
const [franchiseStatus, setFranchiseStatus] = useState("");
const [dropdownData, setDropdownData] = useState({
  owner_name: [],
  owner_email: [],
  owner_phone: [],
  categories: [],
  franchise_city: [],
  status: [],
});
const [showLeadDetailsPopup, setShowLeadDetailsPopup] = useState(false);
const [leadDetails, setLeadDetails] = useState(null);
const [leadDetailsLoading, setLeadDetailsLoading] = useState(false);
const [selectedCategories, setSelectedCategories] = useState([]);
const [selectedName, setSelectedName] = useState(null);
const [selectedEmail, setSelectedEmail] = useState(null);
const [selectedPhone, setSelectedPhone] = useState(null);
const [selectedCity, setSelectedCity] = useState(null);
const [kycFiles, setKycFiles] = useState(null);
const [selectedStatus, setSelectedStatus] = useState(null);
const currentLeads = leads;
const initialized = useRef(false);
const [selectedLead, setSelectedLead] = useState(null);
const [franchiseMessage, setFranchiseMessage] = useState("");
const [isProcessing, setIsProcessing] = useState(false);
  const [loadingKyc, setLoadingKyc] = useState(false);
const fetchLeadsData = async (page = currentPage, perPage = entriesPerPage, filters = {}) => {
   setLoading(true);
  try {
    const { leads, total } = await getLeads(page, perPage, filters);
    const normalizedLeads = leads.map(l => {
      const categoryObj = l.categories || l.category_list || {};
      const categoryNames = Array.isArray(categoryObj)
        ? categoryObj
        : Object.values(categoryObj);
      return {
        ...l,
        franchise_city: l.franchise_city || l.franchise_city || "",
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
    setLoading(false);
};
const [showFranchisePopup, setShowFranchisePopup] = useState(false);
useEffect(() => {
  if (!initialized.current) return;

  const filters = {
    owner_name: selectedName,
    franchise_email: selectedEmail,
    franchise_phone: selectedPhone,
    franchise_city: selectedCity?.value,
    status: selectedStatus !== "" ? Number(selectedStatus) : undefined,
    category_list: selectedCategories.map(c => Number(c.value)),
  };

  fetchLeadsData(currentPage, entriesPerPage, filters);
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
    aValue = aValue ?? "";
    bValue = bValue ?? "";
    if (Array.isArray(aValue)) aValue = aValue.join(", ");
    if (Array.isArray(bValue)) bValue = bValue.join(", ");
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortConfig.direction === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }
    return sortConfig.direction === "asc"
      ? String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase())
      : String(bValue).toLowerCase().localeCompare(String(aValue).toLowerCase());
  });

  return sorted;
}, [leads, sortConfig]);

const [selectedOwnerEmail, setSelectedOwnerEmail] = useState(null);

const handleAddToFranchise = async (lead) => {
  if (!lead?.id) return showPopup("Lead ID is missing!", "error");

  setSelectedLead(lead);
  setShowFranchisePopup(true);
  setIsProcessing(true);
  setFranchiseMessage("Processing...");
  setFranchiseStatus("");

  try {
    const data = await addLeadToFranchise(lead.id);
    setIsProcessing(false);

    if (data.success) {
      setFranchiseMessage("Admin added successfully!");
      setFranchiseStatus("success");

      // ✅ Save owner_email for modal button
      setSelectedOwnerEmail(data.data.owner_email);
    } else {
      setFranchiseMessage(data.message || "Already created or failed!");
      setFranchiseStatus("error");
    }
  } catch (err) {
    setIsProcessing(false);
    setFranchiseMessage("Already an admin!");
    setFranchiseStatus("error");
  }
};

const handleOkClick = async () => {
  setShowFranchisePopup(false);

  if (franchiseStatus === "success" && selectedLead?.id) {
    await fetchRequestedServices(selectedLead.id);

    // 🔥 ID sathe navigate karo
      //  router.push(`/admin/create-franchise?leadId=${selectedLead.id}`);
  }
};


useEffect(() => {
  setCurrentPage(1);
}, [search]);

  const handleManageStatusClick = (lead) => {
    setActiveLead({ ...lead, id: lead._id || lead.id });
    setShowModal(true);
  };

const handleAccept = async () => {
  if (!activeLead?.id) return showPopup("Lead ID is missing!","error");
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
      showPopup(res.message || "Failed to update status","error");
    }

  } catch (err) {
    showPopup(err.message,"error");
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
      showPopup(res.message || "Failed to update status","error");
    }

  } catch (err) {
    showPopup(err.message);
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
    "State",
    "City",
    "Status"
  ];

const tableBody = currentLeads.map(l => [
  l.owner_name || "",
  l.franchise_email || "",
  l.franchise_phone || "",
  l.message || "",
  Array.isArray(l.categories) ? l.categories.join(", ") : "",
  l.franchise_state?.name || "", 
  l.franchise_city?.name || "",  
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
    if (initialized.current) return; 
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
        owner_name: Array.isArray(res?.owner_name) && res.owner_name.length > 0
          ? res.owner_name.map(n => ({ label: n.trim(), value: n.trim() }))
          : namesFromLeads.map(n => ({ label: n, value: n })),
        franchise_email: Array.isArray(res?.owner_email) ? res.owner_email.map(e => ({ label: e, value: e })) : [],
        franchise_phone: Array.isArray(res?.owner_phone) ? res.owner_phone.map(p => ({ label: p, value: p })) : [],
        categories: res?.categories ? Object.entries(res.categories).map(([id, title]) => ({ label: title, value: id })) : [],
franchise_city: res?.franchise_city
  ? Object.entries(res.franchise_city).map(([id, name]) => ({ label: name, value: Number(id) }))
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

const columnKeyMap = {
  "owner name": "owner_name",
  "franchise email": "franchise_email",
  "franchise phone": "franchise_phone",
  "message": "message",
  "categories": "categories",
  "franchise state": "franchise_state",
  "franchise city": "franchise_city",
  "status": "status",
};
   const goToDashboard = () => {
    router.push("/admin/dashboard"); 
  };
  const fetchLeadDetails = async (leadId) => {
  if (!leadId) return;
  const token = localStorage.getItem("access_token"); // get token
  if (!token) return showPopup("Token missing!","error");

  setLeadDetailsLoading(true);
  setShowLeadDetailsPopup(true);

  try {
    const res = await getLeadDetails(leadId, token);

    if (res.success) {
      setLeadDetails(res.data);
    } else {
      setLeadDetails(null);
      showPopup(res.message || "Failed to fetch lead details","error");
    }
  } catch (err) {
    console.error(err);
    setLeadDetails(null);
    showPopup("Error fetching lead details","error");
  } finally {
    setLeadDetailsLoading(false);
  }
};

const handleViewKyc = async (lead) => {
  setShowKycPopup(true);
  setLoadingKyc(true);

  try {
    const id = lead.lead_id || lead.id;  
    const response = await fetchKycDocuments(id);

    if (response && response.data) {
      setKycData(response.data); // ✅ ensure correct key
    } else {
      setKycData(null);
      showPopup("Failed to fetch KYC documents", "error");
    }
  } catch (err) {
    setKycData(null);
    showPopup("Something went wrong while fetching KYC documents", "error");
  } finally {
    setLoadingKyc(false);
  }
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
  options={dropdownData.owner_name}
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
  options={dropdownData.franchise_email}
  value={selectedEmail ? { value: selectedEmail, label: selectedEmail } : null}
onChange={opt => {
  const selected = opt?.value || null;
  setSelectedEmail(selected);
  setCurrentPage(1);

  if (selected) {
    fetchLeadsData(1, entriesPerPage, {email: selected });
  } else {
    fetchLeadsData(1, entriesPerPage, {});
  }
}}
  className={styles.select}
    isClearable 
/>

<Select
  placeholder="Select Phone"
  options={dropdownData.franchise_phone}
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
  options={dropdownData.franchise_city} 
  value={selectedCity}
  onChange={opt => {
    setSelectedCity(opt); 
    setCurrentPage(1);
    if (opt) {
      fetchLeadsData(1, entriesPerPage, { franchise_city: opt.value });
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
      "owner name","franchise email","franchise phone","message",
      "categories","franchise state","franchise city","status"
    ].map((displayName) => (
      <th
        key={displayName}
        onClick={() => handleSort(columnKeyMap[displayName])} // use mapped key
        style={{ cursor: "pointer" }}
      >
        {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
        <SortArrow direction={sortConfig.key === columnKeyMap[displayName] ? sortConfig.direction : null} />
      </th>
    ))}
    <th>Action</th>
  </tr>
</thead>
             <tbody>
  {loading ? (
    <tr>
      <td colSpan={9} style={{ textAlign: "center", padding: "50px" }}>
        <div className={styles.spinner}></div>
      </td>
    </tr>
  ) : sortedLeads.length === 0 ? (
    <tr>
      <td colSpan={9} style={{ textAlign: "center" }}>
        No leads found
      </td>
    </tr>
  ) : (
    sortedLeads.map((lead, index) => (
      <tr
        key={index}
        onDoubleClick={() =>
          router.push(`/admin/lead/edit?id=${lead._id || lead.id}`)
        }
        style={{ cursor: "pointer" }}
      >
        <td
          onClick={(e) => handleCopy(e, lead.owner_name, "Owner Name", showPopup)}
          className={styles.copyCell}
        >
          {lead.owner_name}
        </td>

        <td
          onClick={(e) =>
            handleCopy(
              e,
              lead.franchise_email,
              "Franchise Email",
              showPopup
            )
          }
          className={styles.copyCell}
        >
          {lead.franchise_email}
        </td>

        <td
          onClick={(e) =>
            handleCopy(
              e,
              lead.franchise_phone,
              "Franchise Phone",
              showPopup
            )
          }
          className={styles.copyCell}
        >
          {lead.franchise_phone}
        </td>

        {/* message */}
        <td
          className={styles.messageCell}
          onClick={(e) => handleCopy(e, lead.message, "message", showPopup)}
        >
          <div className={styles.messageContent}>
            {expandedMessageIndex === index
              ? formatMessage(lead.message)
              : formatMessage(lead.message)
                  .split("\n")
                  .slice(0, 2)
                  .join("\n")}
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

        {/* categories */}
        <td className={styles.categoryCell}>
          <div className={styles.categoryContent}>
            {(() => {
              const list = Array.isArray(lead.categories)
                ? lead.categories
                : [];
              const isExpanded = expandedMessageIndex === index;
              const limited = list.slice(
                0,
                isExpanded ? list.length : 2
              );

              return (
                <>
                  {limited.map((cat, i) => (
                    <div
                      key={i}
                      className={styles.categoryBox}
                      onClick={(e) =>
                        handleCopy(e, cat, "Category", showPopup)
                      }
                    >
                      {cat}
                    </div>
                  ))}

                  {list.length > 2 && (
                    <button
                      className={styles.showMoreBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedMessageIndex(
                          isExpanded ? null : index
                        );
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

        <td
          onClick={(e) =>
            handleCopy(e, lead.state, "Franchise state", showPopup)
          }
        >
          {lead.franchise_state?.name}
        </td>

        <td
          onClick={(e) =>
            handleCopy(e, lead.city, "Franchise city", showPopup)
          }
        >
          {lead.franchise_city?.name}
        </td>

        <td>
          <span
            className={`${styles.badge} ${
              lead.status === "PENDING"
                ? styles.pending
                : lead.status === "ACCEPTED"
                ? styles.accept
                : styles.decline
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
            onClick={() =>
              router.push(`/admin/lead/edit?id=${lead._id || lead.id}`)
            }
          >
            Edit
          </button>

          <button
            className={styles.statusBtn}
            onClick={() => handleManageStatusClick(lead)}
          >
            Manage Status
          </button>

          <button
            className={styles.statusBtn}
            onClick={() => fetchLeadDetails(lead._id || lead.id)}
          >
            View All Details
          </button>

          <button
            className={styles.kycBtn}
            onClick={() => handleViewKyc(lead)}
          >
            KYC Documents
          </button>

          {lead.status?.toUpperCase() === "ACCEPTED" && (
            <button
              className={styles.franchiseBtn}
              onClick={() => handleAddToFranchise(lead)}
            >
              Add To Admin
            </button>
          )}
        </td>
      </tr>
    ))
  )}
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

      <button
        className={styles.closeBtn}
        onClick={() => setShowFranchisePopup(false)}
      >
        ×
      </button>

      <div className={styles.iconWrapper}>
        
        {isProcessing ? (
          <FcSynchronize size={80} className={styles.rotateIcon} />
        ) : franchiseStatus === "success" ? (
          <FcCheckmark size={80} className={styles.successIcon} />
        ) : (
          <FcCancel size={80} className={styles.cancelIcon} />
        )}

      </div>

      <h2 className={styles.h2}>
        {isProcessing
          ? "Processing..."
          : franchiseStatus === "success"
          ? "Success"
          : "Danger"}
      </h2>

      <p className={styles.p}>{franchiseMessage}</p>

{!isProcessing && franchiseStatus === "success" && selectedOwnerEmail && (
  <div className={styles.modalActions}>
    <button
      className={styles.acceptBtn}
      onClick={() => {
        // 1️⃣ Open Franchise User page in new tab
        const newTab = window.open("/admin/franchises-user", "_blank");

        // 2️⃣ Redirect to create-franchise with owner_email
        if (newTab) {
          newTab.onload = () => {
            newTab.location.href = `/admin/create-franchise?owner_email=${selectedOwnerEmail}`;
          };
        }

        setShowFranchisePopup(false); // Close popup
      }}
    >
      Make Franchise
    </button>
  </div>
)}

    </div>
  </div>
)}

{showLeadDetailsPopup && (
  <div className={styles.leadModalOverlay}>
    <div className={styles.leadModalContent}>
      <button
        className={styles.leadCloseBtn}
        onClick={() => setShowLeadDetailsPopup(false)}
      >
        ×
      </button>

      {leadDetailsLoading ?  (
        <p>No details available</p>
      ) : (
        <div className={styles.leadPopupWrapper}>

          {/* Owner + Franchise */}
          <div className={styles.leadTwoCol}>
            
            {/* Owner */}
            <div className={styles.leadCardSmall}>
              <h2 className={styles.leadTitle}>Owner Details</h2>

              <div className={styles.leadGridSmall}>
                <p><strong>Name:</strong> {leadDetails.owner_data?.owner_name}</p>
                <p><strong>Email:</strong> {leadDetails.owner_data?.owner_email}</p>
                <p><strong>Phone:</strong> {leadDetails.owner_data?.owner_phone}</p>
                <p><strong>Pincode:</strong> {leadDetails.owner_data?.owner_pincode}</p>
                <p><strong>State:</strong> {leadDetails.owner_data?.owner_state_id?.name}</p>
                <p><strong>City:</strong> {leadDetails.owner_data?.owner_city_id?.name}</p>
              </div>

              <p className={styles.leadFull}><strong>Address:</strong> {leadDetails.owner_data?.owner_address}</p>
            </div>

            {/* Franchise */}
            <div className={styles.leadCardSmall}>
              <h2 className={styles.leadTitle}>Franchise Details</h2>

              <div className={styles.leadGridSmall}>
                <p><strong>Name:</strong> {leadDetails.franchise_data?.franchise_name}</p>
                <p><strong>Email:</strong> {leadDetails.franchise_data?.franchise_email}</p>
                <p><strong>Phone:</strong> {leadDetails.franchise_data?.franchise_phone}</p>
                <p><strong>Pincode:</strong> {leadDetails.franchise_data?.franchise_pincode}</p>
                <p><strong>State:</strong> {leadDetails.franchise_data?.franchise_state?.name}</p>
                <p><strong>City:</strong> {leadDetails.franchise_data?.franchise_city_id?.name}</p>
              </div>

              <p className={styles.leadFull}><strong>Address:</strong> {leadDetails.franchise_data?.franchise_address}</p>
              <p className={styles.leadFull}><strong>Message:</strong> {leadDetails.franchise_data?.message}</p>

           <div className={styles.categoriesBox}>
  <p className={styles.catTitle}>Categories:</p>

  <ul className={styles.categoriesList}>
    {(leadDetails.franchise_data?.category_list || []).map((c) => (
      <li key={c.id} className={styles.categoryItem}>
        {c.title}
      </li>
    ))}
  </ul>
</div>
            </div>
          </div>

          {/* KYC */}
          {/* <div className={styles.leadCardSmall}>
            <h2 className={styles.leadTitle}>KYC Documents</h2>

            <div className={styles.leadKycRowSmall}>
              {["adhar_card_front_image", "adhar_card_back_image", "pan_card_image"].map((key) => (
                <div className={styles.leadKycBoxSmall} key={key}>
                  <label className={styles.leadLabel}>
                    {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </label>

                  <div className={styles.leadPreviewBoxSmall}>
                    {leadDetails.kyc_documents?.[key] ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${leadDetails.kyc_documents[key]}`}
                        alt={key}
                        className={styles.leadPreviewImgSmall}
                      />
                    ) : (
                      <p>No File</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

        </div>
      )}
    </div>
  </div>
)}

{showKycPopup && (
  <div className={styles.leadModalOverlay}>
    <div className={styles.leadModalContent}>

      <button 
        className={styles.leadCloseBtn}
        onClick={() => setShowKycPopup(false)}
      >
        ×
      </button>

      <h2 className={styles.leadTitle}>KYC Documents</h2>

      <div className={styles.leadKycRowSmall}>
        {["adhar_card_front_image", "adhar_card_back_image", "pan_card_image"].map((key) => (
          <div className={styles.leadKycBoxSmall} key={key}>
            <label className={styles.leadLabel}>
              {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </label>

          <div className={styles.leadPreviewBoxSmall}>
  {loadingKyc ? (
    <p>Loading...</p>
  ) : kycData?.[key] ? (
    <img
      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${kycData[key]}`}
      alt={key}
      className={styles.leadPreviewImgSmall}
    />
  ) : (
    <p>No File</p>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
)}

      </div>
    </Layout>
  );
}
