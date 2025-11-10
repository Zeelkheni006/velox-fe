'use client';
import styles from '../styles/Categories.module.css';
import Layout from "../pages/page";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCategories, updateCategoryStatus } from "../../api/admin-category/category";
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { handleCopy } from "../components/popup";
import { SlHome } from "react-icons/sl";

function SortArrow({ direction }) {
  return (
    <span style={{ marginLeft: '5px', fontSize: '12px' }}>
      {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : ''}
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
const { popupMessage, popupType, showPopup } = usePopup();

  const [sortConfig, setSortConfig] = useState({
    key: searchParams.get('sortBy') || null,
    direction: searchParams.get('sortOrder') || null,
  });

  // Load categories from API
const loadCategories = async () => {
  setLoading(true);
  try {
    const data = await fetchCategories();
    // Ensure each category has id, title, logo, description, and status
    const normalized = data.map(cat => ({
      id: cat.id, // <-- important
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
const toggleStatus = async (index) => {
  const cat = currentCategories[index];
  const globalIndex = categories.findIndex(c => c.id === cat.id); // compare by id
  const newStatus = cat.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

try {
  const res = await updateCategoryStatus(cat.id, newStatus); // id will be valid
  if (res.success) {
    setCategories(prev => {
      const newCats = [...prev];
      newCats[globalIndex] = { ...newCats[globalIndex], status: newStatus };
      return newCats;
    });
    showPopup("✅ Status updated successfully!", "success"); // ✅ popup
    
  } else {
    showPopup(res.message || "❌ Failed to update status", "error"); // ❌ popup
  
  }

} catch (err) {
  console.error("Error updating status:", err);
  showPopup("❌ Something went wrong while updating status", "error"); // ❌ popup
 
}
};

  const handleAddCategory = () => router.push('/admin/admin-add/add-categories');
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
     const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
       <PopupAlert message={popupMessage} type={popupType} />
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
          <span className={styles.breadcrumb}
            style={{ cursor: "pointer"}}>Category</span>
             <span className={styles.separator}> | </span> 
              <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
                     <span> &gt; </span>
          <span className={styles.breadcrumbActive}>Category</span>
        </div>
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
     
    </tbody>
  </table>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                    Title <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                    Logo <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                  </th>
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                    Description <SortArrow direction={sortConfig.key === 'title' ? sortConfig.direction : null} />
                  </th>
                  <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                    Status <SortArrow direction={sortConfig.key === 'status' ? sortConfig.direction : null} />
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.length === 0 ? (
                   <tr>
        <td colSpan={5} style={{ textAlign: "center", padding: "50px" }}>
          <div className={styles.spinner}></div>
        </td>
      </tr>
                  
                ) : (
                  currentCategories.map((cat, i) => (
                    <tr key={i} onDoubleClick={() =>
    router.push(
      `/admin/edit-category?id=${cat.id}&title=${encodeURIComponent(cat.title)}&logo=${encodeURIComponent(cat.logo)}&description=${encodeURIComponent(cat.description)}`
    )}>
                      <td onClick={(e)=>handleCopy(e,cat.title , "title" , showPopup )}>{cat.title}</td>
                      <td onClick={(e)=>handleCopy(e, cat.img , "img" , showPopup)}>
                        <img
                          src={
  cat.logo
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${cat.logo}`
    : "/placeholder.jpg"
}
                          alt={cat.title}
                          className={styles.logo}
                        />
                      </td>
                     <td onClick={(e)=>handleCopy(e, cat.description , "description" , showPopup)}>
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
  onClick={() => {
    // ✅ Store category data locally
    localStorage.setItem("editCategoryData", JSON.stringify(cat));

    // ✅ Only ID in URL
    router.push(`/admin/edit-category?id=${cat.id}`);
  }}
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
