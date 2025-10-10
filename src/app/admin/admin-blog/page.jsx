"use client";

import { useState, useMemo } from "react";
import Layout from "../pages/page";
import styles from "../styles/blog.module.css";
import { useRouter } from "next/navigation"; 

export default function BlogAdmin() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter(); 
  // Sample blog data
  const [blogs, setBlogs] = useState([
    { id: 1, title: "We Provide Better Home Service.", category: "Cleaning & Disinfection", subCategory: "Home Cleaning", image: "/images/blog1.jpg", status: "Active" },
    { id: 2, title: "Solar Panel Cleaning", category: "Solar Panel", subCategory: "Solar Panel Cleaning", image: "/images/blog2.jpg", status: "Active" },
    { id: 3, title: "Kitchen Cleaning", category: "Cleaning & Disinfection", subCategory: "Kitchen Deep Cleaning", image: "/images/blog3.jpg", status: "Active" },
    { id: 4, title: "Car Washing", category: "Car Washing", subCategory: "Sedan", image: "/images/blog4.jpg", status: "Active" },
    { id: 5, title: "Home Cleaning", category: "Cleaning & Disinfection", subCategory: "Home Cleaning", image: "/images/blog5.jpg", status: "Active" },
    { id: 6, title: "test", category: "AC Service", subCategory: "Ac Cleaning", image: "/images/blog6.jpg", status: "Inactive" },
    { id: 7, title: "AC Service and Repair", category: "AC Service", subCategory: "Ac Cleaning", image: "/images/blog7.jpg", status: "Active" },
  ]);

  // Filtered data based on search
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase()) ||
      blog.subCategory.toLowerCase().includes(search.toLowerCase())
    );
  }, [blogs, search]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, filteredBlogs.length);
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const toggleStatus = (id) => {
    setBlogs(blogs.map(blog => blog.id === id ? { ...blog, status: blog.status === "Active" ? "Inactive" : "Active" } : blog));
  };

  const handleEdit = (id) => {
    alert(`Edit blog with id: ${id}`);
  };

  const handleAddNew = () => {
    alert("Redirect to add new blog page");
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Blog</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Blog List</span>
          </div>
        </div>
<div className={styles.card}>
          <div className={styles.header}>
            <h3>Offers</h3>
            <button
              className={styles.addbtn}
              onClick={() => router.push("/admin/admin-add/add-blog")}
            >
              + Add New
            </button>
          </div>
        <div className={styles.controls}>
          <label>
            Show{" "}
            <select
              className={styles.select}
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
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
              className={styles.search}
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </label>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.map(blog => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.subCategory}</td>
                <td><img src={blog.image} alt={blog.title} className={styles.blogImage} /></td>
                 <td>
                      <span
                        className={`${styles.status} ${
                          blog.status === "Active"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                <td>
                  <button className={styles.editBtn}  onClick={() => {
    localStorage.setItem("selectedBlog", JSON.stringify(blog));
    router.push(`/admin/edit-blog?id=${blog.id}`);
  }}
>Edit</button>
                  <button className={blog.status === "Active" ? styles.inactiveBtn : styles.activeBtn} onClick={() => toggleStatus(blog.id)}>
                    {blog.status === "Active" ? "Inactive" : "Active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span>
            {filteredBlogs.length === 0
              ? "No entries found"
              : `Showing ${startIndex + 1} to ${endIndex} of ${filteredBlogs.length} entries`}
          </span>
          <div className={styles.paginationControls}>
            <button
              className={styles.paginationButton}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className={styles.pageNumber}>{currentPage}</span>
            <button
              className={styles.paginationButton}
              onClick={handleNextPage}
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
