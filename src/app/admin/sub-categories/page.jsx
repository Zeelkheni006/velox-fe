'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/SubCategories.module.css';
import Layout from "../pages/page";
import { getSubCategories, updateSubCategoryStatus } from '../../api/admin-category/sub-category';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // ✅ Import icons
function SortArrow({ direction }) {
  return <span style={{ marginLeft: '5px', fontSize: '12px' }}>
    {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕'}
  </span>;
}

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
   const [popupMessage, setPopupMessage] = useState(""); 
  const [popupType, setPopupType] = useState("");
  const router = useRouter();

const fetchData = async () => {
  setLoading(true);
  try {
    const res = await getSubCategories(1, 500, search); // fetch all
    if (res.success) {
      const normalizedData = res.data.map(item => ({
        ...item,
        status: item.status === true || item.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE'
      }));
      setTotalItems(normalizedData.length);
      setTotalPages(Math.ceil(normalizedData.length / entriesPerPage));

      // slice for current page
      const start = (currentPage - 1) * entriesPerPage;
      const end = start + entriesPerPage;
      setSubCategories(normalizedData.slice(start, end));
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, [currentPage, entriesPerPage, search]);

  useEffect(() => {
    fetchData(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage, search]);

  useEffect(() => {
    const handleFocus = () => fetchData(currentPage, entriesPerPage);
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [currentPage, entriesPerPage]);

  // Sorting
  const sortedItems = [...subCategories];
  if (sortConfig.key) {
    sortedItems.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'status') {
        aValue = aValue === 'ACTIVE' ? 1 : 0;
        bValue = bValue === 'ACTIVE' ? 1 : 0;
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Toggle status
  const handleStatusToggle = async (item) => {
    try {
      const newStatus = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      const res = await updateSubCategoryStatus(item.id, newStatus);

      if (res.success) {
        setSubCategories(prev =>
          prev.map(i => i.id === item.id ? { ...i, status: newStatus } : i)
        );
        setPopupMessage("✅ Status updated successfully!", "success"); // ✅ popup
    setPopupType("success");
      } else {
        setPopupMessage(res.message || "❌ Failed to update status", "error"); // ❌ popup
   setPopupType("error");
      }
    } catch (err) {
      console.error("Error updating subcategory:", err);
       setPopupMessage("❌ Something went wrong while updating status", "error"); // ❌ popup
 setPopupType("error");
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
    else direction = 'asc';
    setSortConfig({ key: direction ? key : null, direction });
  };

 const handlePrevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
  useEffect(() => {
    if (!popupMessage) return;
    const timer = setTimeout(() => {
      setPopupType(prev => prev + " hide"); 
      setTimeout(() => {
        setPopupMessage("");
        setPopupType("");
      }, 400);
    }, 4000);
    return () => clearTimeout(timer);
  }, [popupMessage]);
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Sub Category</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Sub Category</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h3>Sub Categories</h3>
                {popupMessage && (
                        <div className={`${styles["email-popup"]} ${styles[popupType]} ${styles.show} flex items-center gap-2`}>
                          {popupType.startsWith("success") ? 
                            <AiOutlineCheckCircle className="text-green-500 text-lg"/> : 
                            <AiOutlineCloseCircle className="text-red-500 text-lg"/>}
                          <span>{popupMessage.replace(/^✅ |^❌ /,"")}</span>
                        </div>
                      )}
            <button className={styles.addBtn} onClick={() => router.push('/admin/admin-add/add-subcategory')}>
              + Add new
            </button>
          </div>

          <div className={styles.controls}>
            <label>
              Show{" "}
         <select
  className={styles.select}
  value={entriesPerPage}
  onChange={(e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to first page
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
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Title<SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort('category_title')} style={{ cursor: 'pointer' }}>
                  Category<SortArrow direction={sortConfig.key === 'category_title' ? sortConfig.direction : null} />
                </th>
                <th>Logo</th>
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                  Status<SortArrow direction={sortConfig.key === 'status' ? sortConfig.direction : null} />
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "50px" }}>
                    <div className={styles.spinner}></div>
                  </td>
                </tr>
              ) : sortedItems.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>No subcategories found</td>
                </tr>
              ) : (
                sortedItems.map((item, i) => (
                  <tr key={i}>
                    <td>{item.title}</td>
                    <td>{item.category_title}</td>
                    <td>
                      <img 
                        src={item.logo ? `http://192.168.29.69:5000${item.logo}` : '/default-logo.svg'} 
                        alt={item.title} 
                        className={styles.logo} 
                      />
                    </td>
                    <td>
                      <span className={`${styles.status} ${item.status === 'ACTIVE' ? styles.active : styles.inactive}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.editBtn}
                        onClick={() =>
                          router.push(`/admin/edit-subcategory?id=${item.id}&title=${encodeURIComponent(item.title)}&logo=${encodeURIComponent(item.logo)}&category=${encodeURIComponent(item.category_id)}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className={item.status === 'ACTIVE' ? styles.inactiveBtn : styles.activeBtn}
                        onClick={() => handleStatusToggle(item)}
                      >
                        {item.status === 'ACTIVE' ? 'In Active' : 'Active'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>
              Showing {subCategories.length ? (currentPage - 1) * entriesPerPage + 1 : 0} to {Math.min(currentPage * entriesPerPage, totalItems)} of {totalItems} entries
            </span>
            <div className={styles.paginationControls}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span>{currentPage} / {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
