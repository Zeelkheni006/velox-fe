"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import "./slider-table.css";
import Layout from "../pages/page";
import { getSliders } from "../../api/add-image/add-slider";
import usePopup from "../components/popup";
import PopupAlert from "../components/PopupAlert";
import { handleCopy } from "../components/popup";
import { SlHome } from "react-icons/sl";


export default function SliderTable() {
  const router = useRouter();
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const { popupMessage, popupType, showPopup } = usePopup();

  useEffect(() => {
    const fetchSliders = async () => {
      setLoading(true);
      try {
        const res = await getSliders();
        const data = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setSliders(data);
      } catch (err) {
        console.error("Error fetching sliders:", err);
      }
      setLoading(false);
    };
    fetchSliders();
  }, []);

  const stripHTML = (html) => html?.replace(/<[^>]+>/g, "") || "";

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    else if (sortConfig.key === key && sortConfig.direction === "desc") direction = null;
    setSortConfig({ key: direction ? key : null, direction });
  };

const filteredSliders = useMemo(
  () =>
    (sliders || []).filter((slide) =>
      (slide.title || "").toLowerCase().includes(searchText.toLowerCase()) ||
      stripHTML(slide.description).toLowerCase().includes(searchText.toLowerCase())
    ),
  [sliders, searchText]
);

const sortedSliders = useMemo(() => {
  if (!sortConfig.key || !sortConfig.direction) return filteredSliders || [];
  return [...filteredSliders].sort((a, b) =>
    sortConfig.direction === "asc"
      ? String(a[sortConfig.key] || "").localeCompare(String(b[sortConfig.key] || ""))
      : String(b[sortConfig.key] || "").localeCompare(String(a[sortConfig.key] || ""))
  );
}, [filteredSliders, sortConfig]);




  const totalPages = Math.ceil(sortedSliders.length / entriesPerPage);
  const currentSliders = sortedSliders.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: 5 }}>
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}
    </span>
  );

  const handleEdit = (id) => router.push(`/admin/edit-slider?id=${id}`);

  const handleDelete = (id) => {
    showPopup("Delete API is pending", "error");
  };

  const handleToggleStatus = (id) => {
    setSliders((prev) =>
      prev.map((slider) =>
        slider._id === id
          ? { ...slider, status: !slider.status }
          : slider
      )
    );
    showPopup("Status Updated ✅", "success");
  };

    const goToDashboard = () => {
    router.push("/admin/dashboard"); 
  };


  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />

      <div className="slider-table-container">
        <div className="topCard">
           <div className="headerContainer">
          <div>
            <span className="breadcrumb" style={{ cursor: "pointer"}}
        >Slider</span>
                <span className="separator"> | </span>
               <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
           <span> &gt; </span>
            <span className="breadcrumbActive">Slider</span>
          </div>
        </div>
</div>
        <div className="tableCard">
          <h3 className="tableTitle">Manage Sliders</h3>
          <button className="addBtn" onClick={() => router.push("/admin/admin-add/add-slider")}>
            + Add New
          </button>

          <div className="tableControls">
            <div>
              Show{" "}
              <select
                className="select"
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
            <div>
              <label className="searchLabel">Search:</label>
              <input
                type="text"
                className="search"
                placeholder="Search title or description"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("title")}>
                  Title
                  <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                <th>Image</th>
                <th onClick={() => handleSort("description")}>
                  Description
                  <SortArrow direction={sortConfig.key === "description" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("status")}>
                  Status
                  <SortArrow direction={sortConfig.key === "status" ? sortConfig.direction : null} />
                </th>
                <th>Action</th>
              </tr>
            </thead>

         <tbody>
  {loading ? (
  
    <tr>
      <td colSpan={5} style={{ textAlign: "center", padding: "50px" }}>
        <div className="spinner"></div>
      </td>
    </tr>
  ) : currentSliders.length === 0 ? (

    <tr>
      <td colSpan={5} style={{ textAlign: "center" }}>No Entries Found</td>
    </tr>
  ) : (
   
    currentSliders.map((slide) => {
      const isActive = !!slide.status;
      return (
        <tr
          key={slide._id}
          onDoubleClick={() => handleEdit(slide._id)}
          style={{ cursor: "pointer" }}
        >
          <td onClick={(e) => handleCopy(e, slide.title, "title", showPopup)}>
            {slide.title}
          </td>

          <td>
            <img
              src={
                slide.image
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${slide.image}`
                  : "https://via.placeholder.com/800x500"
              }
              alt={slide?.title || "Slider Image"}
              className="slider-img"
              style={{ width: "170px", height: "50px", objectFit: "cover" }}
            />
          </td>

          <td onClick={(e) => handleCopy(e, stripHTML(slide.description), "description", showPopup)}>
            {stripHTML(slide.description)}
          </td>

          <td>
            <span className={`status ${isActive ? "active" : "inactive"}`}>
              {isActive ? "ACTIVE" : "INACTIVE"}
            </span>
          </td>

          <td>
            <button className="edit-btn" onClick={() => handleEdit(slide._id)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(slide._id)}>Delete</button>

            <button
              className="toggle-btn"
              style={{
                backgroundColor: isActive ? "#5cb85c" : "#d9534f",
                color: "white",
              }}
              onClick={() => handleToggleStatus(slide._id)}
            >
              {isActive ? "Inactive" : "Active"}
            </button>
          </td>
        </tr>
      );
    })
  )}
</tbody>
          </table>

          <div className="pagination">
            <span>
              Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
              {Math.min(currentPage * entriesPerPage, sortedSliders.length)} of{" "}
              {sortedSliders.length} entries
            </span>

            <div className="paginationControls">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                Previous
              </button>
              <span className="pageNumber">{currentPage}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
