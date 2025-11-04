"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import "./slider-table.css";
import Layout from "../pages/page";
import { getSliders } from "../../api/add-image/add-slider"; 

export default function SliderTable() {
  const router = useRouter();
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await getSliders();
        if (Array.isArray(res)) setSliders(res);
        else if (Array.isArray(res.data)) setSliders(res.data);
        else setSliders([]);
      } catch (err) {
        console.error("Error fetching sliders:", err);
        setSliders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  const stripHTML = (html) => html.replace(/<[^>]+>/g, "");

  // Sorting function
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

  // Filtered sliders
  const filteredSliders = useMemo(() => 
    sliders.filter(slide =>
      slide.title.toLowerCase().includes(searchText.toLowerCase()) ||
      stripHTML(slide.description).toLowerCase().includes(searchText.toLowerCase())
    )
  , [sliders, searchText]);

  // Sorted sliders
  const sortedSliders = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredSliders;

    return [...filteredSliders].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === "description") {
        aVal = stripHTML(aVal);
        bVal = stripHTML(bVal);
      }

      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredSliders, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedSliders.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentSliders = sortedSliders.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const handleEdit = (id) => alert(`Edit slider with ID: ${id}`);
  const handleDelete = (id) => alert(`Delete slider with ID: ${id}`);
  const handleToggleStatus = (id) => {
    setSliders(sliders.map(slider => slider.id === id 
      ? { ...slider, status: slider.status === "Active" ? "Inactive" : "Active" } 
      : slider));
  };

  return (
    <Layout>
      <div className="slider-table-container">
        <div className="topCard">
          <div>
            <span className="breadcrumb">Slider</span> &gt; <span className="breadcrumbActive">Slider</span>
          </div>
        </div>

        <div className="tableCard">
          <h3 className="tableTitle">Manage Sliders</h3>
          <button className="addBtn" onClick={() => router.push("/admin/admin-add/add-slider")}>+ Add New</button>

          <div className="tableControls">
            <div>
              Show{" "}
              <select className="select" value={entriesPerPage} onChange={(e) => {setEntriesPerPage(Number(e.target.value)); setCurrentPage(1);}}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "}entries
            </div>
            <div>
              <label className="searchLabel">Search:{" "}</label>
              <input type="text" className="search" placeholder="Search by title or description" value={searchText} onChange={(e) => {setSearchText(e.target.value); setCurrentPage(1);}} />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>Title <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} /></th>
                <th>Image</th>
                <th onClick={() => handleSort("description")} style={{ cursor: "pointer" }}>Description <SortArrow direction={sortConfig.key === "description" ? sortConfig.direction : null} /></th>
                <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>Status <SortArrow direction={sortConfig.key === "status" ? sortConfig.direction : null} /></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{textAlign:"center", padding:"50px"}}><div className="spinner"></div></td></tr>
              ) : currentSliders.length === 0 ? (
                <tr><td colSpan={5} style={{textAlign:"center"}}>No entries found</td></tr>
              ) : currentSliders.map(slide => (
                <tr key={slide.id}>
                  <td>{slide.title}</td>
                  <td><img src={slide.image ? `http://192.168.29.69:5000${slide.image}` : "/placeholder.jpg"} alt={slide.title} className="slider-img" style={{ width:"170px", height:"50px", objectFit:"cover" }}/></td>
                  <td>{stripHTML(slide.description)}</td>
                  <td><span className={`status ${slide.status?.toLowerCase()}`}>{slide.status?.toUpperCase()}</span></td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(slide.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(slide.id)}>Delete</button>
                    <button className="toggle-btn" style={{backgroundColor: slide.status === "Active" ? "#5cb85c" : "#d9534f", color:"white"}} onClick={() => handleToggleStatus(slide.id)}>
                      {slide.status === "Active" ? "InActive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <span>Showing {startIndex + 1} to {Math.min(endIndex, filteredSliders.length)} of {filteredSliders.length} entries</span>
            <div className="paginationControls">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span className="pageNumber">{currentPage}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
