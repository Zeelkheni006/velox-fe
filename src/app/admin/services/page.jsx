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

import { getServices } from "../../api/admin-service/category-list";

export default function ServicesPage() {
  const router = useRouter();
  const [servicesList, setServicesList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch data from API
useEffect(() => {
  const fetchServices = async () => {
    setLoading(true);
    const res = await getServices();
    setServicesList(res?.data?.services || []);
    setLoading(false);
  };

  fetchServices();

  // ✅ Check if an updated service exists in localStorage
  const updatedService = localStorage.getItem("updatedService");
  if (updatedService) {
    const service = JSON.parse(updatedService);
    setServicesList(prev =>
      prev.map(s => (s.id === service.id ? service : s))
    );
    localStorage.removeItem("updatedService");
  }
}, []); 

useEffect(() => {
  const handleUpdatedService = () => {
    const updatedService = localStorage.getItem('updatedService');
    if (updatedService) {
      const service = JSON.parse(updatedService);
      setServicesList(prev =>
        prev.map(s => (s.id === service.id ? service : s))
      );
      localStorage.removeItem('updatedService');
    }
  };

  // Run on mount
  handleUpdatedService();

  // Also run on history change (when query ?updated=1 appears)
  const unlisten = router.events?.on('routeChangeComplete', handleUpdatedService);
  return () => unlisten && router.events.off('routeChangeComplete', handleUpdatedService);
}, [router]);

  // 🔹 Search filter
  const filteredServices = servicesList.filter(service =>
    (service.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (service.category?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (service.sub_category?.toLowerCase() || "").includes(search.toLowerCase())
  );

  // 🔹 Sorting
  const sortedServices = [...filteredServices];
  if (sortConfig.key) {
    sortedServices.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'status') {
        aVal = aVal === 'ACTIVE' ? 1 : 0;
        bVal = bVal === 'ACTIVE' ? 1 : 0;
      } else {
        aVal = aVal?.toString().toLowerCase();
        bVal = bVal?.toString().toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // 🔹 Pagination
  const totalPages = Math.ceil(sortedServices.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, sortedServices.length);
  const currentItems = sortedServices.slice(startIndex, endIndex);

  // 🔹 Dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.action}`)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleStatus = (index) => {
    const originalIndex = servicesList.findIndex(s => s.title === currentItems[index].title);
    if (originalIndex !== -1) {
      const updated = [...servicesList];
      updated[originalIndex].status =
        updated[originalIndex].status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      setServicesList(updated);
    }
    setOpenDropdownIndex(null);
  };

  const handleDelete = (index) => {
    const originalIndex = servicesList.findIndex(s => s.title === currentItems[index].title);
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
            <span className={styles.breadcrumb}>Service</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Services</span>
          </div>
        </div>

        <div className={styles.card}>
          <h5 className={styles.title}>Services</h5>
          <button
            className={styles.addbtn}
            onClick={() => router.push('/admin/admin-add/add-services')}
          >
            + Add new
          </button>

          {/* Search & Show entries */}
          <div className={styles.showEntries}>
            <label>
              Show{" "}
              <select
                className={styles.select1}
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
                  setCurrentPage(1);
                }}
              />
            </label>
          </div>

          {/* Table */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  #
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Title <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Category <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Sub Category <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Image <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Duration<SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Status <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" style={{ textAlign: "center" }}>Loading services...</td></tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((service, index) => (
                  <tr key={index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{service.title}</td>
                    <td>{service.category}</td>
                    <td>{service.sub_category}</td>
                    <td>
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${service.image}`}
                        alt={service.title}
                        className={styles.icon}
                        style={{ width: "40px", height: "40px" }}
                      />
                    </td>
                    <td>{service.duration}</td>
                    <td>
                      <span className={`${styles.status} ${service.status === "INACTIVE" ? styles.inactive : styles.active}`}>
                        {service.status || "ACTIVE"}
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
                            {/* ✅ Fixed Edit Button */}  
<li
  onClick={() => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    router.push(
      `/admin/edit-services?service_id=${service.id}&sub_category_id=${service.sub_category_id}`
    );
  }}
>
  Edit
</li>

                            <li onClick={() => handleDelete(index)}>
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </li>

                            <li onClick={() => handleToggleStatus(index)}>
                              <FontAwesomeIcon icon={service.status === "ACTIVE" ? faCircleXmark : faCircleCheck} />
                              {service.status === "ACTIVE" ? "Inactivate" : "Activate"}
                            </li>

                            <li
                              onClick={() => {
                                localStorage.setItem("selectedService", JSON.stringify(service));
                                router.push("/admin/manage-media");
                              }}
                            >
                              <FontAwesomeIcon icon={faImage} /> Manage Media
                            </li>

                            <li
                              onClick={() => {
                                localStorage.setItem("selectedService", JSON.stringify(service));
                                router.push("/admin/service_specification");
                              }}
                            >
                              <FontAwesomeIcon icon={faFileAlt} /> Specifications
                            </li>

                            <li
                              onClick={() => {
                                localStorage.setItem("selectedService", JSON.stringify(service));
                                router.push("/admin/service_faq");
                              }}
                            >
                              <FontAwesomeIcon icon={faQuestionCircle} /> FAQ
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8" style={{ textAlign: "center" }}>No services found.</td></tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {filteredServices.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredServices.length} entries`}
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
