"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./slider-table.css";
import Layout from "../pages/page";
import { getSliders } from "../../api/add-image/add-slider"; 
import { useEffect } from "react";

export default function SliderTable() {
  const [sliders, setSliders] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchSliders = async () => {
    try {
      const data = await getSliders();
      setSliders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching sliders:", err);
      setSliders([]);
    } finally {
      setLoading(false); // ✅ important
    }
  };

  fetchSliders();
}, []);

  
const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const handleEdit = (id) => alert(`Edit slider with ID: ${id}`);
  const handleDelete = (id) => alert(`Delete slider with ID: ${id}`);
  const handleToggleStatus = (id) => {
    setSliders(sliders.map(slider => slider.id === id ? { ...slider, status: slider.status === "Active" ? "Inactive" : "Active" } : slider));
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Filter sliders based on search
  const filteredSliders = sliders.filter(slider =>
    slider.title.toLowerCase().includes(searchText.toLowerCase()) ||
    slider.description.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSliders.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentSliders = filteredSliders.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <Layout>
      <div className="slider-table-container">
        <div className="topCard">
          <div>
            <span className="breadcrumb">Slider</span> &gt; <span className="breadcrumbActive">Slider</span>
          </div>
         <button className="addBtn" onClick={() => router.push("/admin/add-slider")}>
  + Add New
</button>
        </div>

        <div className="tableCard">
          <h3 className="tableTitle">Manage Sliders</h3>
          <div className="tableControls">
            <div>
              Show{" "}
              <select className="select" value={entriesPerPage} onChange={handleEntriesChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "}
              entries
            </div>
            <div>
              <label>Search: </label>
              <input
                type="text"
                className="searchInput"
                placeholder="Search by title or description"
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
      <tbody>
  {loading ? (
    <tr>
      <td colSpan={5} style={{ textAlign: "center" }}>Loading sliders...</td>
    </tr>
  ) : currentSliders.length === 0 ? (
    <tr>
      <td colSpan={5} style={{ textAlign: "center" }}>No entries found</td>
    </tr>
  ) : (
    currentSliders.map(slider => (
      <tr key={slider.id}>
        <td>{slider.title}</td>
        <td><img src={slider.image || slider.mobile_image} alt={slider.title} className="slider-img" /></td>
        <td>{slider.description}</td>
        <td><span className={`status ${slider.status?.toLowerCase() || "active"}`}>{(slider.status || "Active").toUpperCase()}</span></td>
        <td>
          <button className="edit-btn" onClick={() => handleEdit(slider.id)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(slider.id)}>Delete</button>
          <button className="toggle-btn" onClick={() => handleToggleStatus(slider.id)}>
            {slider.status === "Active" ? "InActive" : "Active"}
          </button>
        </td>
      </tr>
    ))
  )}
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
