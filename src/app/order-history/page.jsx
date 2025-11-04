'use client';
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import "./main.css";

export default function OrderHistoryPage() {
  const router = useRouter();

  // Pagination & search states
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Example mock data
  const orders = [
    { id: 1, date: "2025-10-10", total: "₹1200", orderStatus: "Delivered", paymentStatus: "Paid" },
    { id: 2, date: "2025-10-12", total: "₹450", orderStatus: "Pending", paymentStatus: "Unpaid" },
    { id: 3, date: "2025-10-13", total: "₹2300", orderStatus: "Cancelled", paymentStatus: "Refunded" },
  ];

  // 🔽 SortArrow component
  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: "5px", fontSize: "12px" }}>
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}
    </span>
  );

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorting function
  const sortedOrders = useMemo(() => {
    let sortable = [...orders];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const aValue = a[sortConfig.key].toString().toLowerCase();
        const bValue = b[sortConfig.key].toString().toLowerCase();

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [orders, sortConfig]);

  // Filtered + Paginated data
  const filteredOrders = sortedOrders.filter((order) =>
    Object.values(order).some((val) =>
      val.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredOrders.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, filteredOrders.length);
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
     
        <ul className="navList">
            <li onClick={()=> router.push("/dashboard")}>Dashboard</li>
          <li onClick={() => router.push("/order-history")}>Order History</li>
          <li onClick={()=> router.push("/ongoing-order")}>Ongoing Order</li>
          <li onClick={()=>router.push("/order-track")}>Order Tracking</li>
          <li onClick={()=>router.push("/user-profile")}>Edit Profile</li>
          <li onClick={()=>router.push("/resetform")}>Reset Password</li>
             <li
  onClick={() => {
    // 1️⃣ Clear stored login/session data
    localStorage.removeItem("access_token"); // or your auth token key
    // 2️⃣ Redirect to login or homepage
    router.push("/"); // redirect to your login page
  }}
>
  Logout
</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="mainContent">
        <div className="orderHistoryBox">
          <h2 className="orderTitle">Ongoing Order</h2>

          {/* Show Entries & Search */}
          <div className="showEntries">
            <label>
              Show{" "}
              <select
                className="select1"
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "}
              entries
            </label>

            <label className="searchLabel">
              Search:{" "}
              <input
                type="text"
                placeholder="Search..."
                className="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </label>
          </div>

          {/* Table */}
          <table className="orderTable">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                  Order
                  <SortArrow
                    direction={sortConfig.key === "id" ? sortConfig.direction : null}
                  />
                </th>
                <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                  Date
                  <SortArrow
                    direction={sortConfig.key === "date" ? sortConfig.direction : null}
                  />
                </th>
                <th onClick={() => handleSort("total")} style={{ cursor: "pointer" }}>
                  Order Total
                  <SortArrow
                    direction={sortConfig.key === "total" ? sortConfig.direction : null}
                  />
                </th>
                <th onClick={() => handleSort("orderStatus")} style={{ cursor: "pointer" }}>
                  Order Status
                  <SortArrow
                    direction={sortConfig.key === "orderStatus" ? sortConfig.direction : null}
                  />
                </th>
                <th onClick={() => handleSort("paymentStatus")} style={{ cursor: "pointer" }}>
                  Payment Status
                  <SortArrow
                    direction={sortConfig.key === "paymentStatus" ? sortConfig.direction : null}
                  />
                </th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.total}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.paymentStatus}</td>
                    <td>
                      <button className="viewBtn">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "#777" }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <span>
              Showing {startIndex + 1} to {endIndex} of {filteredOrders.length} entries
            </span>
            <div className="paginationControls">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </button>
              <span className="pageNumber">{currentPage}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
