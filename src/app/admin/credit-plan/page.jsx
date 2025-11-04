'use client';

import React, { useState } from 'react';
import styles from '../styles/creditplan.module.css';
import Layout from '../pages/page';
import { useRouter } from 'next/navigation';

export default function CreditPlanPage() {
  const [creditPrice, setCreditPrice] = useState('');

  const [plans, setPlans] = useState([
    { id: 1, title: 'Basic Plan', credit: 10, price: 500, validity: '30 Days', status: 'Active' },
    { id: 2, title: 'Standard Plan', credit: 25, price: 1000, validity: '60 Days', status: 'Inactive' },
    { id: 3, title: 'Premium Plan', credit: 50, price: 1800, validity: '90 Days', status: 'Active' },
  ]);

  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const router = useRouter();

  const handleUpdatePrice = () => {
    alert(`Credit price updated to ${creditPrice}`);
    setCreditPrice('');
  };

  const toggleStatus = (id) => {
    setPlans(prev =>
      prev.map(plan =>
        plan.id === id ? { ...plan, status: plan.status === 'Active' ? 'Inactive' : 'Active' } : plan
      )
    );
  };

  const handleEdit = (plan) => {
    localStorage.setItem('selectedCreditPlan', JSON.stringify(plan));
    router.push('/admin/edit-credit-plan');
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
    setSortConfig({ key: direction ? key : null, direction });
  };

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: '5px', fontSize: '12px' }}>
      {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕'}
    </span>
  );

  // Filter
  const filteredPlans = plans.filter(
    plan =>
      plan.title.toLowerCase().includes(search.toLowerCase()) ||
      plan.credit.toString().includes(search) ||
      plan.price.toString().includes(search) ||
      plan.validity.toLowerCase().includes(search.toLowerCase()) ||
      plan.status.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  let sortedPlans = [...filteredPlans];
  if (sortConfig.key && sortConfig.direction) {
    sortedPlans.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Numeric sort for id, credit, price
      if (['id', 'credit', 'price'].includes(sortConfig.key)) {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }

      aVal = aVal.toString().toLowerCase();
      bVal = bVal.toString().toLowerCase();

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, sortedPlans.length);
  const paginatedPlans = sortedPlans.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedPlans.length / entries);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Credit Plan</span> &gt;{' '}
            <span className={styles.breadcrumbActive}>Credit Plan</span>
          </div>
        </div>

        {/* Credit Price */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Credit Price</h2>
          <div className={styles.priceRow}>
            <label> Price for Credit</label>
            <input value={creditPrice} onChange={(e) => setCreditPrice(e.target.value)} placeholder="Price for Credit" />
            <button className={styles.updateBtn} onClick={handleUpdatePrice}>Update</button>
          </div>
        </div>

        {/* Credit Plan Table */}
        <div className={styles.card}>
          <div className={styles.titleRow}>
            <h2 className={styles.sectionTitle}>Credit Plan</h2>
            <button className={styles.addBtn} onClick={() => router.push('/admin/admin-add/add-credit-paln')}>+ Add New</button>
          </div>

          <div className={styles.controls}>
            <label>
              Show{' '}
              <select className={styles.select} value={entries} onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{' '}
              entries
            </label>

            <label className={styles.searchLabel}>
              Search:{' '}
              <input type="text" className={styles.search} placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
            </label>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {['id', 'title', 'credit', 'price', 'validity', 'status'].map((key) => (
                    <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                      <SortArrow direction={sortConfig.key === key ? sortConfig.direction : null} />
                    </th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPlans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.id}</td>
                    <td>{plan.title}</td>
                    <td>{plan.credit}</td>
                    <td>{plan.price}</td>
                    <td>{plan.validity}</td>
                    <td>
                      <span className={`${styles.status} ${plan.status === 'Active' ? styles.active : styles.inactive}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td>
                      <button className={styles.editBtn} onClick={() => handleEdit(plan)}>Edit</button>
                      <button className={plan.status === 'Active' ? styles.inactiveBtn : styles.activeBtn} onClick={() => toggleStatus(plan.id)}>
                        {plan.status === 'Active' ? 'Inactive' : 'Active'}
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedPlans.length === 0 && (
                  <tr>
                    <td colSpan="7" className={styles.noData}>No matching records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {sortedPlans.length === 0 ? 'No entries found' : `Showing ${startIndex + 1} to ${endIndex} of ${sortedPlans.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button className={styles.paginationButton} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
