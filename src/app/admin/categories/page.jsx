'use client';
import styles from '../styles/Categories.module.css';
import Layout from "../pages/page";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCategories } from "../../api/admin-category/category"; // API

function SortArrow({ direction }) {
  return (
    <span style={{ marginLeft: '5px', fontSize: '12px' }}>
      {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕'}
    </span>
  );
}

export default function Categories() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const [sortConfig, setSortConfig] = useState({
    key: searchParams.get('sortBy') || null,
    direction: searchParams.get('sortOrder') || null,
  });

  // Load categories from API
  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      // Ensure each category has title, logo, description, and status
      const normalized = data.map(cat => ({
        title: cat.title || '',
        logo: cat.logo || '',
        description: cat.description || '',
        status: cat.status === true || cat.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
      }));
      setCategories(normalized);
    } catch (err) {
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const urlSortBy = searchParams.get('sortBy');
    const urlSortOrder = searchParams.get('sortOrder');
    setSortConfig({
      key: urlSortBy || null,
      direction: urlSortOrder || null,
    });
  }, [searchParams]);

  // Filter by search
  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const sortedCategories = [...filteredCategories];
  if (sortConfig.key && sortConfig.direction) {
    sortedCategories.sort((a, b) => {
      const aVal = (a[sortConfig.key] || '').toString().toLowerCase();
      const bVal = (b[sortConfig.key] || '').toString().toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedCategories.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, sortedCategories.length);
  const currentCategories = sortedCategories.slice(startIndex, endIndex);

  // Toggle status
  const toggleStatus = (index) => {
    const cat = currentCategories[index];
    const globalIndex = categories.findIndex(c => c.title === cat.title);
    setCategories(prev => {
      const newCats = [...prev];
      newCats[globalIndex] = {
        ...newCats[globalIndex],
        status: newCats[globalIndex].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      };
      return newCats;
    });
  };

  const handleAddCategory = () => router.push('/admin/add-categories');
  const handleDelete = (index) => {
    const cat = currentCategories[index];
    const globalIndex = categories.findIndex(c => c.title === cat.title);
    setCategories(prev => prev.filter((_, i) => i !== globalIndex));
  };
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      key = null;
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <span className={styles.breadcrumb}>Category</span> &gt;{" "}
          <span className={styles.breadcrumbActive}>Category</span>
        </div>

        <div className={styles.card}>
          <h3>Categories</h3>
          <button className={styles.addBtn} onClick={handleAddCategory}>+ Add New</button>

          <div className={styles.showEntries}>
            <label>
              Show{" "}
              <select className={styles.select1} value={entriesPerPage} onChange={handleEntriesChange}>
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

          {loading ? (
            <table className={styles.table}>
    <tbody>
      <tr>
        <td colSpan={5} style={{ textAlign: "center", padding: "50px" }}>
          <div className={styles.spinner}></div>
        </td>
      </tr>
    </tbody>
  </table>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                    Title <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                  </th>
                  <th>Logo</th>
                  <th>Description</th>
                  <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                    Status <SortArrow direction={sortConfig.key === 'status' ? sortConfig.direction : null} />
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>No entries found</td>
                  </tr>
                ) : (
                  currentCategories.map((cat, i) => (
                    <tr key={i}>
                      <td>{cat.title}</td>
                      <td>
                        <img
                          src={cat.logo ? `http://192.168.29.69:5000${cat.logo}` : "/placeholder.jpg"}
                          alt={cat.title}
                          className={styles.logo}
                        />
                      </td>
                     <td>
  <div dangerouslySetInnerHTML={{ __html: cat.description }} />
</td>
                      <td>
                        <span className={`${styles.status} ${cat.status === 'ACTIVE' ? styles.active : styles.inactive}`}>
                          {cat.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles.editBtn}
                          onClick={() => router.push(`/admin/edit-category?title=${encodeURIComponent(cat.title)}&logo=${encodeURIComponent(cat.logo)}`)}
                        >
                          Edit
                        </button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(i)}>Delete</button>
                        <button
                          className={cat.status === 'ACTIVE' ? styles.inactiveBtn : styles.activeBtn}
                          onClick={() => toggleStatus(i)}
                        >
                          {cat.status === 'ACTIVE' ? 'In Active' : 'Active'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          <div className={styles.pagination}>
            <span>
              {filteredCategories.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredCategories.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button className={styles.paginationButton} onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
