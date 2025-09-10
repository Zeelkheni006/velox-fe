"use client";
import { useState } from 'react';
import styles from "../styles/managecustomer.module.css";
import Layout from "../pages/page";
import { useRouter } from 'next/navigation';

const initialCustomers = [
  { name: 'harsh mundra', email: 'harshmundra248@gmail.com', mobile: '8619983849', city: 'Jamnagar' },
  { name: 'Kuldip', email: 'happy2023friends@gmail.com', mobile: '9909567650', city: 'Rajkot' },
  { name: 'Nanda Yash', email: 'yashgnanda@gmail.com', mobile: '7984142724', city: 'Jamnagar' },
  { name: 'MOHAMMAD ANAS QURESHI', email: 'aquacool2004@gmail.com', mobile: '7574896226', city: 'Ahmedabad' },
  { name: 'Shubh', email: 'shubhpgajera21@gmail.com', mobile: '6358116822', city: 'Jamnagar' },
  { name: 'Zeel Kheni', email: 'zeelkheni123@gmail.com', mobile: '9979616888', city: 'Anjar' },
  { name: 'Rahul Maradia', email: 'maradiyarahul@gmail.com', mobile: '9624323346', city: 'Jamnagar' },
  { name: 'Nanda abhishek', email: 'nandabhsk@gmail.com', mobile: '8141009217', city: 'Jamnagar' },
    { name: 'Shubh', email: 'shubhpgajera21@gmail.com', mobile: '6358116822', city: 'Jamnagar' },
  { name: 'Zeel Kheni', email: 'zeelkheni123@gmail.com', mobile: '9979616888', city: 'Anjar' },
  { name: 'Rahul Maradia', email: 'maradiyarahul@gmail.com', mobile: '9624323346', city: 'Jamnagar' },
  { name: 'Nanda abhishek', email: 'nandabhsk@gmail.com', mobile: '8141009217', city: 'Jamnagar' },
];

export default function ManageCustomerPage() {
     
const [search, setSearch] = useState('');
const [selectedCity, setSelectedCity] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [entriesPerPage, setEntriesPerPage] = useState(10);
const router = useRouter();
const [customers, setCustomers] = useState(initialCustomers);

// 🔁 Filter customers
const filteredCustomers = customers.filter((cust) => {
  const matchesSearch =
    cust.name.toLowerCase().includes(search.toLowerCase()) ||
    cust.email.toLowerCase().includes(search.toLowerCase()) ||
    cust.mobile.includes(search);
  const matchesCity = selectedCity ? cust.city === selectedCity : true;
  return matchesSearch && matchesCity;
});

// ✅ Use filteredCustomers *after* it's declared
const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage);
const startIndex = (currentPage - 1) * entriesPerPage;
const endIndex = startIndex + entriesPerPage;
const currentCustomers = filteredCustomers.slice(startIndex, endIndex);


const handleEntriesChange = (e) => {
  setEntriesPerPage(Number(e.target.value));
  setCurrentPage(1); // Reset to first page when entries per page changes
};

  const handleDelete = (index) => {
    const confirmDelete = confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      const updated = [...customers];
      updated.splice(index, 1);
      setCustomers(updated);
    }
  };

const handleNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};

const handlePrevPage = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};

  const uniqueCities = [...new Set(customers.map((c) => c.city))];

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.topCard}>
          <div>
            <span className={styles.breadcrumb}>Staffs</span> &gt; <span className={styles.breadcrumbActive}>Manage Staffs</span>
          </div>
        <button className={styles.addBtn} onClick={() => router.push('/admin/create')}>
  + Add New
</button>
        </div>

        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Manage Staff</h3>

          <div className={styles.tableControls}>
            <div>
              Show{" "}
             <select className={styles.select} value={entriesPerPage} onChange={handleEntriesChange}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>{" "}
              entries
            </div>

            <div>
              <label>City: </label>
              <select
                className={styles.select}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Select City</option>
                {uniqueCities.map((city, i) => (
                  <option key={i} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Search: </label>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search by name, email or mobile"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((cust, index) => (
               <tr key={index}>
                    <td>{cust.name}</td>
                  <td>{cust.email}</td>
                  <td>{cust.mobile}</td>
                  <td>{cust.city}</td>
                  <td>
                    <button className={styles.deletebtn} onClick={() => handleDelete(index)}> Delete </button>
                  </td>
                </tr>
              ))}
              {currentCustomers.length === 0 && (
                <tr>
                  <td colSpan={4}>No matching records found.</td>
                </tr>
              )}
            </tbody>
          </table>

         <div className={styles.pagination}>
  <span>
    Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} entries
  </span>
  <div className={styles.paginationControls}>
    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
    <span className={styles.pageNumber}>{currentPage}</span>
    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
  </div>
</div>

        </div>
      </div>
    </Layout>
  );
}
