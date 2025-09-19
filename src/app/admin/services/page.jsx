"use client";

import styles from '../styles/services.module.css';
import { useRouter } from 'next/navigation';
import Layout from "../pages/page";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit, faTrash, faCircleCheck, faCircleXmark,
  faImage, faFileAlt, faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

export default function ServicesPage() {
  const router = useRouter();

  // Main data state
  const [servicesList, setServicesList] = useState([
    {
      displayNumber: 17,
      title: "BRIDAL FACIAL",
      category: "Women Beauty Care",
      subCategory: "Facial",
      image: "/icon/spa2.png",
      time: "1 Hour 0 Minute",
      status: "ACTIVE"
    },
    {
      displayNumber: 15,
      title: "Charcoal Facial",
      category: "Women Beauty Care",
      subCategory: "Facial",
      image: "/icon/spa2.png",
      time: "1 Hour 0 Minute",
      status: "ACTIVE"
    },
    {
      displayNumber: 9,
      title: "DIAMOND PACKAGE",
      category: "Women Beauty Care",
      subCategory: "Special Packages",
      image: "/icon/spa2.png",
      time: "1 Hour 0 Minute",
      status: "ACTIVE"
    },
  ]);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // Filtered list based on search
  const filteredServices = servicesList.filter(service =>
    service.title.toLowerCase().includes(search.toLowerCase()) ||
    service.category.toLowerCase().includes(search.toLowerCase()) ||
    service.subCategory.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Apply sorting on filtered list
  const sortedServices = [...filteredServices];
  if (sortConfig.key) {
    sortedServices.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Status sorting (ACTIVE before INACTIVE)
      if (sortConfig.key === 'status') {
        aVal = aVal === 'ACTIVE' ? 1 : 0;
        bVal = bVal === 'ACTIVE' ? 1 : 0;
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedServices.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, sortedServices.length);
  const currentItems = sortedServices.slice(startIndex, endIndex);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.action}`)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleToggleStatus = (index) => {
    const originalIndex = servicesList.findIndex(s => s.displayNumber === currentItems[index].displayNumber);
    if (originalIndex !== -1) {
      const updated = [...servicesList];
      updated[originalIndex].status = updated[originalIndex].status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      setServicesList(updated);
    }
    setOpenDropdownIndex(null);
  };

  const handleDelete = (index) => {
    const originalIndex = servicesList.findIndex(s => s.displayNumber === currentItems[index].displayNumber);
    if (originalIndex !== -1) {
      const updated = [...servicesList];
      updated.splice(originalIndex, 1);
      setServicesList(updated);
    }
    setOpenDropdownIndex(null);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
    else direction = 'asc';

    setSortConfig({ key: direction ? key : null, direction });
  };

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: '5px', fontSize: '12px' }}>
      {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕'}
    </span>
  );

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Category</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Category</span>
          </div>
        </div>

        <div className={styles.card}>
          <h5 className={styles.title}>Services</h5>
           <button
            className={styles.addbtn}
            onClick={() => router.push('/admin/add-services')}
          >
            + Add new
          </button>
          <div className={styles.showEntries}>
            <label>
              Show{" "}
              <select
                className={styles.select1}
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
            </label>

            <label className={styles.searchLabel}>
              Search:{" "}
              <input
                type="text"
                placeholder="Search..."
                className={styles.search}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </label>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                 <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Display Number
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Title
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Category
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Sub Category
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Image
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Time
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Status
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Action
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((service, index) => (
                  <tr key={index}>
                    <td>{service.displayNumber}</td>
                    <td>{service.title}</td>
                    <td>{service.category}</td>
                    <td>{service.subCategory}</td>
                    <td>
                      <img
                        src={service.image}
                        alt={service.title}
                        className={styles.icon}
                      />
                    </td>
                    <td>{service.time}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          service.status === "ACTIVE"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                   <td className={styles.action}>
  <div 
    className={styles.dropdownTrigger} 
    onClick={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)}
  >
    ⋮
  </div>
    {openDropdownIndex === index && (
    <div className={styles.dropdownMenu}>
      <ul>
          <li
  onClick={() => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    router.push(`/admin/edit-services`);
  }}
>
    <FontAwesomeIcon icon={faEdit} /> Edit
</li>
        <li onClick={() => handleDelete(index)}>    <FontAwesomeIcon icon={faTrash} /> Delete</li>
   <li onClick={() => handleToggleStatus(index)}>
    <FontAwesomeIcon icon={service.status === "ACTIVE" ? faCircleXmark : faCircleCheck} /> 
    {service.status === "ACTIVE" ? "Inactivate" : "Activate"}
  </li>
       <li
  onClick={() => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    router.push("/admin/manage-media");
  }}
> <FontAwesomeIcon icon={faImage} /> Manage Media</li>
         <li
  onClick={() => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    router.push("/admin/service_specification");
  }}
>  <FontAwesomeIcon icon={faFileAlt} /> Specifications</li>
        <li
  onClick={() => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    router.push("/admin/service_faq");
  }}
> <FontAwesomeIcon icon={faQuestionCircle} /> FAQ</li>
      </ul>
    </div>
  )}
  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className={styles.pagination}>
            <span>
              {filteredServices.length === 0 ? (
                "No entries found"
              ) : (
                `Showing ${startIndex + 1} to ${endIndex} of ${filteredServices.length} entries`
              )}
            </span>

            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className={styles.pageNumber}>{currentPage}</span>

              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
}
