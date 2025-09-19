'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/SubCategories.module.css';
import Layout from "../pages/page";

const initialData = [
  { title: 'Gel Polish', category: 'NAIL Studio', logo: '/icon/gelpolish.png', status: 'ACTIVE' },
  { title: 'Routine Check Up', category: 'R O Water Purifier', logo: '/icon/RO water.png', status: 'ACTIVE' },
  { title: 'Diwali Special Offer', category: 'Women Beauty Care', logo: '/icon/women.png', status: 'ACTIVE' },
  { title: 'Classic Home Cleaning', category: 'Cleaning & Disinfection', logo: '/icon/home.png', status: 'ACTIVE' },
  { title: 'Deep Home Cleaning', category: 'Cleaning & Disinfection', logo: '/icon/home2.png', status: 'ACTIVE' },
  { title: 'WAXING SPECIAL OFFER', category: 'Women Beauty Care', logo: '/icon/women.png', status: 'ACTIVE' },
  { title: 'Velox Special Detan', category: 'Women Beauty Care', logo: '/icon/spa1.png', status: 'ACTIVE' },
  { title: 'Ragga Detan', category: 'Women Beauty Care', logo: '/icon/spa2.png', status: 'ACTIVE' },
  { title: 'Aroma Detan', category: 'Women Beauty Care', logo: '/icon/spa3.png', status: 'ACTIVE' },
    { title: 'Ragga Detan', category: 'Women Beauty Care', logo: '/icon/spa2.png', status: 'ACTIVE' },
  { title: 'Aroma Detan', category: 'Women Beauty Care', logo: '/icon/spa3.png', status: 'ACTIVE' },

];

function SortArrow({ direction }) {
  return (
    <span style={{ marginLeft: '5px', fontSize: '12px' }}>
      {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕'}
    </span>
  );
}

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState(initialData);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // New state for sorting
  const router = useRouter();

  // Filter data based on search
  let filteredSubCategories = subCategories.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Sort data if sortConfig is set
  if (sortConfig.key) {
    filteredSubCategories.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // For status, sort ACTIVE before INACTIVE
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

  // Pagination
  const totalPages = Math.ceil(filteredSubCategories.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, filteredSubCategories.length);
  const currentItems = filteredSubCategories.slice(startIndex, endIndex);

  const toggleStatus = (index) => {
    const actualIndex = subCategories.findIndex(item => item.title === currentItems[index].title);
    setSubCategories(prev =>
      prev.map((item, i) =>
        i === actualIndex ? { ...item, status: item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : item
      )
    );
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
    else direction = 'asc';

    setSortConfig({ key: direction ? key : null, direction });
  };

  // ... your existing handlers here (handleAddNew, handlePrevPage, handleNextPage, handleEntriesChange) ...

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
            <button className={styles.addBtn} onClick={() => router.push('/admin/add-subcategory')}>+ Add new</button>
          </div>

          <div className={styles.controls}>
            <label>
              Show{" "}
              <select className={styles.select} value={entriesPerPage} onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}>
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
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
            </label>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Title
                  <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                  Category
                  <SortArrow direction={sortConfig.key === 'category' ? sortConfig.direction : null} />
                </th>
                 <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                  Logo
                  <SortArrow direction={sortConfig.key === 'category' ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                  Status
                  <SortArrow direction={sortConfig.key === 'status' ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                  Action
                  <SortArrow direction={sortConfig.key === 'category' ? sortConfig.direction : null} />
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No entries found</td>
                </tr>
              ) : (
                currentItems.map((item, i) => (
                  <tr key={i}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td><img src={item.logo} alt={item.title} className={styles.logo} /></td>
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
                            `/admin/edit-subcategory?title=${encodeURIComponent(item.title)}&category=${encodeURIComponent(item.category)}&logo=${encodeURIComponent(item.logo)}`
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={item.status === 'ACTIVE' ? styles.inactiveBtn : styles.activeBtn}
                        onClick={() => toggleStatus(i)}
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
              {filteredSubCategories.length === 0 ? (
                "No entries found"
              ) : (
                `Showing ${startIndex + 1} to ${endIndex} of ${filteredSubCategories.length} entries`
              )}
            </span>
            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button
                className={styles.paginationButton}
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
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
