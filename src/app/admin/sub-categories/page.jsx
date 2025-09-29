'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/SubCategories.module.css';
import Layout from "../pages/page";
import { getSubCategories } from '../../api/admin-category/sub-category';

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
  const [entriesPerPage, setEntriesPerPage] = useState(500);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const router = useRouter();

  const fetchData = async (page = 1, per_page = 500) => {
    setLoading(true);
    try {
      const res = await getSubCategories(page, per_page, search);
      if (res.success) {
        setSubCategories(res.data);
        setTotalItems(res.total_items || res.data.length);
        setTotalPages(res.total_page || 1);
        setCurrentPage(res.page || page);
        setEntriesPerPage(res.per_page || per_page);
      } else {
        setSubCategories([]);
        setTotalItems(0);
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
      setSubCategories([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount and whenever page, entriesPerPage, or search changes
  useEffect(() => {
    fetchData(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage, search]);

useEffect(() => {
  const handleFocus = () => fetchData(currentPage, entriesPerPage);
  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
}, [currentPage, entriesPerPage]);



  // Sorting logic
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
const toggleStatus = async (item) => {
  if (!item.id) return alert('Invalid ID');

  const newStatus = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
  const data = new FormData();
  data.append('status', newStatus);

  try {
    const res = await updateSubCategory(item.id, data);
    if (res.success) {
      setSubCategories(prev =>
        prev.map(i => i.id === item.id ? { ...i, status: newStatus } : i)
      );
    } else {
      alert(res.message || 'Failed to update status');
    }
  } catch (err) {
    console.error(err);
    alert('API error while updating status');
  }
};  

   
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
    else direction = 'asc';
    setSortConfig({ key: direction ? key : null, direction });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  if (loading) return <Layout><div className={styles.wrapper}>Loading...</div></Layout>;

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
            <button className={styles.addBtn} onClick={() => router.push('/admin/add-subcategory')}>
              + Add new
            </button>
          </div>

          <div className={styles.controls}>
            <label>
              Show{" "}
              <select
                className={styles.select}
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
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
              {sortedItems.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No entries found</td></tr>
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
    router.push(
      `/admin/edit-subcategory?id=${item.id}&title=${encodeURIComponent(item.title)}&logo=${encodeURIComponent(item.logo)}&category=${encodeURIComponent(item.category_id)}`
    )
  }
>
  Edit
</button>

       <button
  className={item.status === 'ACTIVE' ? styles.inactiveBtn : styles.activeBtn}
  onClick={() => toggleStatus(item)}
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
            <span>Showing {subCategories.length ? (currentPage - 1) * entriesPerPage + 1 : 0} to {Math.min(currentPage * entriesPerPage, totalItems)} of {totalItems} entries</span>
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
