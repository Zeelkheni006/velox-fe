"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/testimonial.module.css";
import Layout from "../pages/page";

export default function TestimonialPage() {
  const router = useRouter();

  const [testimonials, setTestimonials] = useState([
    { id: 1, title: "test 4", image: "/images/image1.jpg", status: "IN ACTIVE" },
    { id: 2, title: "Review By Customer", image: "/images/user2.jpg", status: "ACTIVE" },
    { id: 3, title: "Review by Customer", image: "/images/user3.jpg", status: "ACTIVE" },
    { id: 4, title: "Mr. Tejas Purohit", image: "/images/user4.jpg", status: "IN ACTIVE" },
  ]);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = testimonials.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, filtered.length);
  const currentData = filtered.slice(startIndex, endIndex);

  const toggleStatus = (id) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "ACTIVE" ? "IN ACTIVE" : "ACTIVE" }
          : t
      )
    );
  };

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <Layout>
      <div className={styles.container}>
        {/* ✅ Updated Header */}
 <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Testimonial</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Testimonial</span>
          </div>
        </div>

        {/* ✅ Card section remains same */}
        <div className={styles.card}>
          <div className={styles.header}>
            <h3>Testimonial</h3>
            <button
              className={styles.addBtn}
              onClick={() => router.push("/admin/admin-add/add-testimonial")}
            >
              + Add new
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

            <label>
              Search:{" "}
              <input
                className={styles.search}
                type="text"
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
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((t) => (
                  <tr key={t.id}>
                    <td>{t.title}</td>
                    <td>
                      <img
                        src={t.image}
                        alt="testimonial"
                        className={styles.image}
                      />
                    </td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          t.status === "ACTIVE" ? styles.active : styles.inactive
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <button
  className={styles.editBtn}
  onClick={() => {
    localStorage.setItem("selectedTestimonial", JSON.stringify(t));
    router.push(`/admin/edit-testimonal?id=${t.id}`);
  }}
>
  Edit
</button>
                      <button
                        className={
                          t.status === "ACTIVE"
                            ? styles.inactiveBtn
                            : styles.activeBtn
                        }
                        onClick={() => toggleStatus(t.id)}
                      >
                        {t.status === "ACTIVE" ? "In Active" : "Active"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No entries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ✅ Pagination */}
          <div className={styles.pagination}>
            <span>
              {filtered.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filtered.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button
                className={styles.paginationButton}
                onClick={handleNext}
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
