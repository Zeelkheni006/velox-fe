"use client";

import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import styles from "../styles/roles.module.css"; // use .module.css if CSS Modules
import Layout from "../pages/page"; // Ensure Layout contains Sidebar + Header
// update path if needed
import { useRouter } from "next/navigation";


// Dummy role data
const rolesData = [
  {
    name: "DEMO",
    permissions: [
      
    ]
  },
  {
    name: "District Manager",
    permissions: [
	
    "Gifts , Gifts Add , Gifts Edit , Gifts Delete , Gifts Status , Gifts Send , Orders , Orders View , Orders Delete , Orders Status , Orders Invoice , Franchise Orders Assigned , Unallocated Orders , Unallocated Orders View , Unallocated Orders Delete , Unallocated Orders Status , Unallocated Orders Assigned , Request Quotes , Request Quotes Delete , Request Quotes Status , Followups , Followups Delete , Followups Status , Contact List , Contact Delete , Contact Status"
    ]
  },
  {
    name: "Computer Operator",
    permissions: [
      	
    "Categories, Categories Add , Categories Update , Categories Delete ,Categories Status , Sub Categories , Sub Categories Add , Sub Categories Edit , Sub Categories Delete , Sub Categories Status , Services , Services Add , Services Edit , Services Delete , Services Status , Services Media , Best Services , Best Services Add , Best Services Edit , Best Services Delete , Best Services Status , Service Specification , Service Specification Add , Service Specification Edit , Service Specification Delete , Service Specification Status , Service Faq , Service Faq Add , Service Faq Edit , Service Faq Delete , Service Faq Status , Packages , Packages Add , Packages Edit , Packages Delete , Packages Status , Packages Media , Leads , Leads Add , Leads Edit , Leads Delete , Leads Status , Leads Add User , Franchises , Franchises Add , Franchises Edit , Franchises Delete , Franchises Status , Franchise User , Franchise User Edit , Franchise User Delete , Offers , Offers Add , Offers Edit , Offers Delete , Offers Status , Best Offers , Best Offers Add , Best Offers Edit , Best Offers Delete , Best Offers Status , Orders , Orders View , Orders Delete , Orders Status , Orders Invoice , Franchise Orders Assigned , Unallocated Orders , Unallocated Orders View , Unallocated Orders Delete , Unallocated Orders Status , Unallocated Orders Assigned , Service Ratings , Service Ratings Add , Service Ratings Edit , Service Ratings Delete , Service Ratings Status , Package Ratings , Package Ratings Add , Package Ratings Edit , Package Ratings Delete , Package Ratings Status , Order Review , Testimonial , Testimonial Add , Testimonial Edit , Testimonial Status , Slider List , Slider Add , Slider Edit , Slider Delete , Slider Status , News Letter , Send News Letter , News Letter Delete , Request Quotes , Request Quotes Delete , Request Quotes Status , Followups , Followups Delete , Followups Status , Contact List , Contact Delete , Contact Status , Franchise Services , Franchise Services Edit , Franchise Orders , Franchise Orders View , Franchise Orders Status , Franchise Orders Invoice , Franchise Timing , Franchise Timing Add , Franchise Timing Edit , Franchise Timing Delete , Franchise Worker , Franchise Worker Add , Franchise Worker Edit , Franchise Worker Delete , Franchise Worker Status , Franchise Credits , Franchise Credits Add , Request List , Request Delete , Request Status , Franchise Profile , Franchise Account"
    ]
  },
    
    {
        name:"Creative Team",
         permissions:[	
"Categories , Categories Add , Categories Update , Categories Delete , Categories Status , Sub Categories , Sub Categories Add , Sub Categories Edit , Sub Categories Delete , Sub Categories Status , Services , Services Add , Services Edit , Services Delete , Services Status , Services Media , Best Services , Best Services Add , Best Services Edit , Best Services Delete , Best Services Status , Service Faq , Service Faq Add , Service Faq Edit , Service Faq Delete , Service Faq Status , Packages , Packages Add , Packages Edit , Packages Delete , Packages Status , Packages Media , Leads , Leads Add , Leads Edit , Leads Delete , Leads Status , Leads Add User , Franchises , Franchises Add , Franchises Edit , Franchises Delete , Franchises Status , Franchise User , Franchise User Edit , Franchise User Delete , Offers , Offers Add , Offers Edit , Offers Delete , Offers Status , Best Offers , Best Offers Add , Best Offers Edit , Best Offers Delete , Best Offers Status , Gifts , Gifts Add , Gifts Edit , Gifts Delete , Gifts Status , Gifts Send , Orders , Orders View , Orders Delete , Orders Status , Orders Invoice , Franchise Orders Assigned , Unallocated Orders , Unallocated Orders View , Unallocated Orders Delete , Unallocated Orders Status , Unallocated Orders Assigned , Service Ratings , Service Ratings Add , Service Ratings Edit , Service Ratings Delete , Service Ratings Status , Package Ratings , Package Ratings Add , Package Ratings Edit , Package Ratings Delete , Package Ratings Status , Order Review , Testimonial , Testimonial Add , Testimonial Edit , Testimonial Status , Slider List , Slider Add , Slider Edit , Slider Delete , Slider Status , Blog , Blog Add , Blog Edit , Blog Delete , Blog Status , Request Quotes , Request Quotes Delete , Request Quotes Status , Followups , Followups Delete , Followups Status , Contact List , Contact Delete , Contact Status"]
    },
      {
    name: "GENERAL MANAGER",
    permissions: [
"Categories , Categories Add , Categories Update , Categories Delete , Categories Status , Sub Categories , Sub Categories Add , Sub Categories Edit , Sub Categories Delete , Sub Categories Status , Services , Services Add , Services Edit , Services Delete , Services Status , Services Media , Best Services , Best Services Add , Best Services Edit , Best Services Delete , Best Services Status , Service Specification , Service Specification Add , Service Specification Edit , Service Specification Delete , Service Specification Status , Service Faq , Service Faq Add , Service Faq Edit , Service Faq Delete , Service Faq Status , Packages , Packages Add , Packages Edit , Packages Delete , Packages Status , Packages Media , Leads , Leads Add , Leads Edit , Leads Delete , Leads Status , Leads Add User , Franchises , Franchises Add , Franchises Edit , Franchises Delete , Franchises Status , Franchise User , Franchise User Edit , Franchise User Delete , Offers , Offers Add , Offers Edit , Offers Delete , Offers Status , Best Offers , Best Offers Add , Best Offers Edit , Best Offers Delete , Best Offers Status , Gifts , Gifts Add , Gifts Edit , Gifts Delete , Gifts Status , Orders , Orders View , Orders Delete , Orders Status , Orders Invoice , Unallocated Orders , Unallocated Orders View , Unallocated Orders Delete , Unallocated Orders Status , Unallocated Orders Assigned , Accounts , Accounts Income , Accounts Franchise Fees , Accounts Franchise Outstandings , Payments , Payments Add , Payments Edit , Payments Delete , Credit Plans , Credit Plans Add , Credit Plans Edit , Credit Plans Delete , Credit Plans Status , Credit Price Edit , Custome Plans , Service Ratings , Service Ratings Add , Service Ratings Edit , Service Ratings Delete , Service Ratings Status , Package Ratings , Package Ratings Add , Package Ratings Edit , Package Ratings Delete , Package Ratings Status , Order Review , Testimonial , Testimonial Add , Testimonial Edit , Testimonial Status , Slider List , Slider Add , Slider Edit , Slider Delete , Slider Status , Aboutus List , Aboutus Add , Aboutus Edit , Aboutus Delete , Blog , Blog Add , Blog Edit , Blog Delete , Blog Status , News Letter , Send News Letter , News Letter Delete , Referral Program , Request Quotes , Request Quotes Delete , Request Quotes Status , Followups , Followups Delete , Followups Status , Contact List , Contact Delete , Contact Status"  
    ]
  },
    {
    name: "hr",
    permissions: [
      	
"Leads , Leads Add , Leads Edit , Leads Delete , Leads Status , Leads Add User , Franchises , Franchises Add , Franchises Edit , Franchises Delete , Franchises Status"
    ]
  },
   {
    name: "support",
    permissions: [
     "Orders , Orders View , Orders Delete , Orders Status , Orders Invoice , Franchise Orders Assigned , Unallocated Orders , Unallocated Orders View , Unallocated Orders Delete , Unallocated Orders Status , Unallocated Orders Assigned , Service Ratings , Service Ratings Add , Service Ratings Edit , Service Ratings Delete , Service Ratings Status , Package Ratings , Package Ratings Add , Package Ratings Edit , Package Ratings Delete , Package Ratings Status , Order Review" 
    ]
  },
     {
     name: "franchises",
     permissions: [
       "Franchise Services , Franchise Services Edit , Franchise Orders , Franchise Orders View , Franchise Orders Status , Franchise Orders Invoice , Franchise Timing , Franchise Timing Add , Franchise Timing Edit , Franchise Timing Delete , Franchise Worker , Franchise Worker Add , Franchise Worker Edit , Franchise Worker Delete , Franchise Worker Status , Franchise Credits , Franchise Credits Add , Request List , Request Delete , Request Status , Franchise Profile , Franchise Account"
     ]
  }
];

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const [entriesPerPage, setEntriesPerPage] = useState(10);


  const filteredRoles = rolesData.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
   const router = useRouter();

   const totalPages = Math.ceil(filteredRoles.length / entriesPerPage);
const startIndex = (currentPage - 1) * entriesPerPage;
const endIndex = startIndex + entriesPerPage;
const currentRoles = filteredRoles.slice(startIndex, endIndex);
  return (
     
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <span>Roles</span> &gt; <span className={styles.active}>Manage Roles</span>
          </div>
         <button className={styles.addButton} onClick={() => router.push("/admin/add-roles")}>
  + Add New Staff
</button>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Role</h2>
          <div className={styles.tableControls}>
            <div>
              Show
             <select
  className={styles.select}
  value={entriesPerPage}
  onChange={(e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset page when changing limit
  }}
>
  <option value={10}>10</option>
  <option value={25}>25</option>
  <option value={50}>50</option>
</select>
              entries
            </div>
            <div>
              <label>Search: </label>
              <input
                type="text"
                className={styles.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by role name"
              />
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Permissions</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
             {currentRoles.map((role, index) => (

                <tr key={index}>
                  <td>{role.name}</td>
                  <td>{role.permissions?.join(", ")}</td>
                  <td>
                     <button
    className={styles.editBtn}
    onClick={() => router.push(`/admin/add-roles?role=${encodeURIComponent(role.name)}`)}
  >
    <FaEdit />
  </button>
                  </td>
                </tr>
              ))}
              {filteredRoles.length === 0 && (
                <tr>
                  <td colSpan="3" className={styles.noData}>
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
       
       <div className={styles.paginationInfo}>
  <div>
    Showing {filteredRoles.length === 0 ? 0 : startIndex + 1} to{" "}
    {Math.min(endIndex, filteredRoles.length)} of {filteredRoles.length} entries
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
   
    </Layout>
  

    
  );
};

export default Roles;
