"use client";

import React from "react";
import styles from "../styles/roles.module.css"; // use new CSS if needed
import Layout from "../pages/page";
import ScrollToTopButton from "../components/ScrollToTopButton";

const AddRole = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <span>Add Role</span> &gt; <span>Manage Roles</span> &gt; <span className={styles.active}>Add Role</span>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>NAME *</h2>
          <input type="text" className={styles.input} placeholder="Name" />

          <h2 className={styles.cardTitle}>Permissions</h2>

          {/* Simulate permissions table from your screenshot */}
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>ADD</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                  <th>STATUS</th>
                  <th>MANAGE MEDIA</th>
                  <th>ADD USER</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CATEGORIES *</td>
                  <td><input type="checkbox" /></td>
                  <td><input type="checkbox" /></td>
                  <td><input type="checkbox" /></td>
                  <td><input type="checkbox" /></td>
                  <td></td>
                  <td></td>
                </tr>
                {/* Add more rows as per your UI */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </Layout>
  );
};

export default AddRole;
