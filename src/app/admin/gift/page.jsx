"use client";
import { useState } from "react";
import Layout from "../pages/page";
import styles from "../styles/offers.module.css";
import { useRouter } from "next/navigation"; 

export default function Gift() {
  const [offerlist, setOfferlist] = useState([
    {
      id: 1,
      title: "Car service",
      giftvalue: 100,
      image: "",
      valideupto: "10-09-2021 To 30-11-2021",
      status: "Active",
    },
    {
      id: 2,
      title: "Bike Service",
      giftvalue: 150,
      image: "",
      valideupto: "01-10-2021 To 31-12-2021",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter(); 

  // Toggle Active / Inactive status
  const toggleStatus = (index) => {
    setOfferlist((prevList) =>
      prevList.map((offer, i) =>
        i === index
          ? { ...offer, status: offer.status === "Active" ? "Inactive" : "Active" }
          : offer
      )
    );
  };

  // Filter based on search
  const filteredOffers = offerlist.filter(
    (offer) => offer.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredOffers.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, filteredOffers.length);
  const currentOffers = filteredOffers.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Gift</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Gift</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h3>Gift</h3>
            <button
              className={styles.addBtn}
              onClick={() => router.push("/admin/add-best-offer")}
            >
              + Add New
            </button>
            <button
              className={styles.sendbtn}
              onClick={() => router.push("/admin/send-gift")}
            >
              Send Gift
            </button>
          </div>

          {/* Controls */}
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

            <label className={styles.searchlable}>
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
                <th>Title</th>
                <th>Gift Value</th>
                <th>Image</th>
                <th>Valid Upto</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOffers.length > 0 ? (
                currentOffers.map((offer, index) => (
                  <tr key={offer.id}>
                    <td>{offer.title}</td>
                    <td>{offer.giftvalue}</td>
                    <td>
                      {offer.image ? (
                        <img src={offer.image} alt={offer.title} width="50" />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{offer.valideupto}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          offer.status === "Active"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        {offer.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.editBtn}
                        onClick={() =>
                          router.push(`/admin/send-gift/${offer.id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={
                          offer.status === "Active"
                            ? styles.inactiveBtn
                            : styles.activeBtn
                        }
                        onClick={() => toggleStatus(index)}
                      >
                        {offer.status === "Active" ? "In Active" : "Active"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No entries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {filteredOffers.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredOffers.length} entries`}
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
