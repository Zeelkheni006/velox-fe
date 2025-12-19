"use client";
import { useState } from "react";
import Layout from "../pages/page";
import styles from "../styles/offers.module.css";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { SlHome } from "react-icons/sl";

export default function Gift() {
  const searchParams = useSearchParams();
  const giftId = searchParams.get("id");
  const router = useRouter();

  const [offerlist, setOfferlist] = useState([
    {
      id: 1,
      title: "Car service",
      giftvalue: 100,
      image: "/images/AC Service and Repair.webp",
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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Toggle Active / Inactive
  const toggleStatus = (index) => {
    setOfferlist((prev) =>
      prev.map((o, i) =>
        i === index ? { ...o, status: o.status === "Active" ? "Inactive" : "Active" } : o
      )
    );
  };

  // Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") direction = null;
    setSortConfig({ key: direction ? key : null, direction });
  };

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: "5px", fontSize: "12px" }}>
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}
    </span>
  );

  // Filtered offers
  const filteredOffers = offerlist.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting applied
  let sortedOffers = [...filteredOffers];
  if (sortConfig.key && sortConfig.direction) {
    sortedOffers.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // handle numbers
      if (typeof aValue === "number") return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;

      // handle strings
      aValue = aValue?.toString().toLowerCase() || "";
      bValue = bValue?.toString().toLowerCase() || "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedOffers.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, sortedOffers.length);
  const currentOffers = sortedOffers.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
   const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb} style={{ cursor: "pointer"}}
        >Gift</span> 
                <span className={styles.separator}> | </span>
               <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
           <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Gift</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h3>Gift</h3>
            <button className={styles.addBtn} onClick={() => router.push("/admin/admin-add/add-gift")}>+ Add New</button>
            <button className={styles.sendbtn} onClick={() => router.push("/admin/send-gift")}>Send Gift</button>
          </div>

          <div className={styles.controls}>
            <label>
              Show{" "}
              <select className={styles.select} value={entries} onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "}entries
            </label>

            <label className={styles.searchlable}>
              Search:{" "}
              <input type="text" placeholder="Search..." className={styles.search} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
            </label>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                  Title <SortArrow direction={sortConfig.key === "title" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("giftvalue")} style={{ cursor: "pointer" }}>
                  Gift Value <SortArrow direction={sortConfig.key === "giftvalue" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("image")} style={{ cursor: "pointer" }}>
                  Image <SortArrow direction={sortConfig.key === "image" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("valideupto")} style={{ cursor: "pointer" }}>
                  Valide Upto <SortArrow direction={sortConfig.key === "valideupto" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status <SortArrow direction={sortConfig.key === "status" ? sortConfig.direction : null} />
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOffers.length > 0 ? (
                currentOffers.map((offer, index) => (
                  <tr key={offer.id}>
                    <td>{offer.title}</td>
                    <td>{offer.giftvalue}</td>
                    <td>{offer.image ? <Image src={offer.image} width={50} height={50} alt={offer.title} /> : "-"}</td>
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
                      <button className={styles.editBtn} onClick={() => { localStorage.setItem("selectedGift", JSON.stringify(offer)); router.push(`/admin/edit-gift?id=${offer.id}`); }}>Edit</button>
                      <button className={offer.status === "Active" ? styles.inactiveBtn : styles.activeBtn} onClick={() => toggleStatus(index)}>
                        {offer.status === "Active" ? "In Active" : "Active"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No entries found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>
              {sortedOffers.length === 0 ? "No entries found" : `Showing ${startIndex + 1} to ${endIndex} of ${sortedOffers.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} disabled={currentPage === 1} onClick={handlePrevPage}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button className={styles.paginationButton} disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
