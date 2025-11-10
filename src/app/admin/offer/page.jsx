"use client";
import { useState } from "react";
import Layout from "../pages/page";
import styles from "../styles/offers.module.css";
import { useRouter } from "next/navigation";
import { SlHome } from "react-icons/sl";
export default function Offer() {
  const [offerlist, setOfferlist] = useState([
    {
      title: "Refer And Earn Offer",
      offervalue: 100,
      offercode: "AC100",
      valideupto: "05-10-2021 To 30-12-2021",
      owner: "-",
      status: "Active",
    },
    {
      title: "Festival Discount",
      offervalue: 200,
      offercode: "FD200",
      valideupto: "01-11-2021 To 31-12-2021",
      owner: "Admin",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const router = useRouter();

  // 🔄 Toggle Status
  const toggleStatus = (index) => {
    setOfferlist((prevList) =>
      prevList.map((offer, i) =>
        i === index
          ? {
              ...offer,
              status:
                offer.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : offer
      )
    );
  };

  // 🔼 Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    else if (sortConfig.key === key && sortConfig.direction === "desc") direction = null;

    setSortConfig({ key: direction ? key : null, direction });

    if (!direction) return; // no sorting

    setOfferlist((prev) =>
      [...prev].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: 5 }}>
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}
    </span>
  );

  // 🔍 Search filter
  const filteredOffers = offerlist.filter(
    (offer) =>
      offer.title.toLowerCase().includes(search.toLowerCase()) ||
      offer.offercode.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
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
   const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb} style={{ cursor: "pointer"}}>Offer</span> 
                <span className={styles.separator}> | </span>
                           <SlHome
                                  style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                  onClick={goToDashboard}
                                  title="Go to Dashboard"
                                />
                       <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Offer</span>
          </div>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <div className={styles.header}>
            <h3>Offers</h3>
            <button
              className={styles.addbtn}
              onClick={() => router.push("/admin/admin-add/add-offer")}
            >
              + Add New
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
                <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Title
                  <SortArrow
                    direction={sortConfig.key === "title" ? sortConfig.direction : null}
                  />
                </th>
                <th
                  onClick={() => handleSort("offervalue")}
                  style={{ cursor: "pointer" }}
                >
                  Offer Value
                  <SortArrow
                    direction={sortConfig.key === "offervalue" ? sortConfig.direction : null}
                  />
                </th>
                 <th
                  onClick={() => handleSort("offervalue")}
                  style={{ cursor: "pointer" }}
                >
                  Offer Code
                  <SortArrow
                    direction={sortConfig.key === "offervalue" ? sortConfig.direction : null}
                  />
                </th>
                 <th
                  onClick={() => handleSort("offervalue")}
                  style={{ cursor: "pointer" }}
                >
                  Valide Upto
                  <SortArrow
                    direction={sortConfig.key === "offervalue" ? sortConfig.direction : null}
                  />
                </th>
                 <th
                  onClick={() => handleSort("offervalue")}
                  style={{ cursor: "pointer" }}
                >
                  Owner
                  <SortArrow
                    direction={sortConfig.key === "offervalue" ? sortConfig.direction : null}
                  />
                </th>
                 <th
                  onClick={() => handleSort("offervalue")}
                  style={{ cursor: "pointer" }}
                >
                  Status
                  <SortArrow
                    direction={sortConfig.key === "offervalue" ? sortConfig.direction : null}
                  />
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOffers.length > 0 ? (
                currentOffers.map((offer, index) => (
                  <tr key={index}>
                    <td>{offer.title}</td>
                    <td>{offer.offervalue}</td>
                    <td>{offer.offercode}</td>
                    <td>{offer.valideupto}</td>
                    <td>{offer.owner}</td>
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
                          router.push(
                            `/admin/edit-offer/?title=${encodeURIComponent(
                              offer.title
                            )}&offervalue=${offer.offervalue}&offercode=${
                              offer.offercode
                            }&valideupto=${encodeURIComponent(
                              offer.valideupto
                            )}&owner=${encodeURIComponent(offer.owner)}`
                          )
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
                  <td colSpan="7" style={{ textAlign: "center" }}>
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
