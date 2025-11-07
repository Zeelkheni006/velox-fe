"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/manageuser.module.css"; // create this CSS module
import { FaEye, FaEdit } from "react-icons/fa";
import Layout from "../pages/page";
import { SlHome } from "react-icons/sl";

const dummyStaff = [
  {
    email: "support@gmail.com",
    phone: "7485965874",
    role: "support",
  },
  {
    email: "hradmin@gmail.com",
    phone: "7485965874",
    role: "hr",
  },
  {
    email: "mvr13jalpa@gmail.com",
    phone: "8141124260",
    role: "GENERAL MANAGER",
  },
  {
    email: "anjanarana@gmail.com",
    phone: "9012345678",
    role: "Computer Operator",
  },
  {
    email: "veloxkamal@gmail.com",
    phone: "9427980836",
    role: "Creative Team",
  },
  {
    email: "veloxnishawankhade@gmail.com",
    phone: "9325600062",
    role: "support",
  },
  {
    email: "veloxabhirathod@gmail.com",
    phone: "7698864504",
    role: "District Manager",
  },
  {
    email: "veloxrathodankita@gmail.com",
    phone: "9723842312",
    role: "GENERAL MANAGER",
  },
    {
    email: "veloxnishawankhade@gmail.com",
    phone: "9325600062",
    role: "support",
  },
  {
    email: "veloxabhirathod@gmail.com",
    phone: "7698864504",
    role: "District Manager",
  },
  {
    email: "veloxrathodankita@gmail.com",
    phone: "9723842312",
    role: "GENERAL MANAGER",
  },
];

const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
   const [showModal, setShowModal] = useState(false);
     const [viewModal, setViewModal] = useState(false); // For view details modal
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
const [entriesPerPage, setEntriesPerPage] = useState(10);


  const filteredStaff = dummyStaff.filter((staff) =>
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
const totalPages = Math.ceil(filteredStaff.length / entriesPerPage);
const startIndex = (currentPage - 1) * entriesPerPage;
const endIndex = startIndex + entriesPerPage;
const currentStaffPage = filteredStaff.slice(startIndex, endIndex);
  const router = useRouter();
 const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });
   const [image, setImage] = useState(null);
    const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
    setShowModal(false); // Close after submit
  };
   const handleEdit = (staff) => {
    setForm({
      name: staff.name || "", // if you have name in staff
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      password: "", // leave password blank on edit
    });
    setImage(null); // clear image or set existing image URL if you have one
    setShowModal(true);
  };
    const handleView = (staff) => {
    setSelectedStaff(staff);
    setViewModal(true);
  };

       const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span  style={{cursor:"pointer"}}>Staffs</span>
           <span className={styles.separator}> | </span>
                <SlHome
                  style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                  onClick={goToDashboard}
                  title="Go to Dashboard"
                />
            <span> &gt; </span> 
            <span className={styles.active}>Manage Staffs</span>
        </div>
           <button className={styles.addButton} onClick={() => setShowModal(true)}>
            + Add New Staff
          </button>
      </div>

      <div className={styles.card}>
        <h2>Manage Staff</h2>
        <div className={styles.tableControls}>
          <div>
            Show{" "}
          <select
  className={styles.select}
  value={entriesPerPage}
  onChange={(e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  }}
>
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
              className={styles.search}
              placeholder="Search by email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
           {currentStaffPage.map((staff, index) => (
              <tr key={index}>
                <td>{staff.email}</td>
                <td>{staff.phone}</td>
                <td>{staff.role}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.viewBtn}
                    onClick={() => handleView(staff)}
                  >
                    <FaEye />
                  </button>
                     <button
                    className={styles.editBtn}
                      onClick={() => handleEdit(staff)}
                  >
                    <FaEdit />
                  </button>
                   
                </td>
              </tr>
            ))}
            {filteredStaff.length === 0 && (
              <tr>
                <td colSpan="4" className={styles.noData}>
                  No staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
<div className={styles.paginationInfo}>
  <div>
    Showing {filteredStaff.length === 0 ? 0 : startIndex + 1} to{" "}
    {Math.min(endIndex, filteredStaff.length)} of {filteredStaff.length} entries
  </div>
  <div className={styles.paginationControls}>
    <button
      className={styles.paginationButton}
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Previous
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        className={`${styles.paginationButton} ${
          currentPage === index + 1 ? styles.activePage : ""
        }`}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}

    <button
      className={styles.paginationButton}
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
</div>


      </div>
    </div>
     {showModal && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <h2>ADD NEW STAFF</h2>
           
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.imageUpload}>
                <label>STAFF PROFILE IMAGE *</label>
                <div className={styles.imageBox}>
                  {image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className={styles.previewImage}
                    />
                  ) : (
                    <label className={styles.uploadLabel}>
                      <input type="file" onChange={handleImageUpload} hidden />
                      UPLOAD IMAGE
                    </label>
                  )}
                </div>
              
<label>name *</label>
              <input
                type="text"
                name="name"
                placeholder="User Name"
                value={form.name}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
              <label>email *</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
              <label>phone *</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
              <label>roles *</label>
              <select
                name="role"
                value={form.role}
                onChange={handleInputChange}
                required
                className={styles.input}
              >
                <option value="">Select Role</option>
                <option value="support">Support</option>
                <option value="hr">HR</option>
                <option value="manager">Manager</option>
                <option value="creative">Creative Team</option>
              </select>
              <label>password *</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
              </div>
              <div className={styles.buttons}>
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
        {viewModal && selectedStaff && (
          <div className={styles.modalContainer1}>
            <div className={styles.modal1}>
              <div className={styles.modalHeader}>
                <h2>STAFF DETAILS</h2>
                <button
                  className={styles.closeButton1}
                  onClick={() => setViewModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className={styles.staffDetails}>
                <img
                  src={selectedStaff.avatar || "/default-avatar.png"} // use default if no avatar
                  alt="user view Avatar"
                  className={styles.staffAvatar}
                />
                <h3>{selectedStaff.role}</h3>
                <p>ID: {selectedStaff.id || "N/A"}</p>
                <div className={styles.detailRow}>
                  <span>Staff Role:</span>
                  <span>{selectedStaff.role}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Staff Email:</span>
                  <span>{selectedStaff.email}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Staff Phone:</span>
                  <span>{selectedStaff.phone}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Joined:</span>
                  <span>{selectedStaff.joined || "Unknown"}</span>
                </div>
              </div>
              <button
                className={styles.closeButton1}
                onClick={() => setViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      
    </Layout>
  );
};

export default ManageStaff;