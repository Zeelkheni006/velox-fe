"use client";
import { useState } from "react";
import styles from "../styles/bestservice.module.css";
import Layout from "../pages/page";

export default function BestServices() {
  const [services, setServices] = useState([
    { id: 1, name: "Velox AC Care+ Plan", status: "INACTIVE" },
    { id: 2, name: "Velox FreshGuard Home Plan", status: "INACTIVE" },
    { id: 3, name: "Velox CoolCare AMC Plan", status: "INACTIVE" },
    { id: 4, name: "Velox CoolCare AMC Plan", status: "INACTIVE" },
    { id: 5, name: "Velox FreshGuard Home Plan", status: "INACTIVE" },
    { id: 6, name: "Velox AC Care+ Plan", status: "INACTIVE" },
    {
      id: 7,
      name: "Velox Bronze Beauty Package – Fresh Look, Fresh Feel!",
      status: "INACTIVE",
    },
  ]);

  const toggleStatus = (id) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : s
      )
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <span className={styles.bold}>Best Service</span> &nbsp;&gt;&nbsp;
          <span className={styles.link}>Best Service</span>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Best Services</h3>
            <button className={styles.addBtn}>+ Add new</button>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <div>
              <label>Show </label>
              <select className={styles.select}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span> entries</span>
            </div>
            <div>
              <label>Search: </label>
              <input
                type="text"
                className={styles.search}
                placeholder="Search"
              />
            </div>
          </div>

          {/* Table */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SERVICE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        service.status === "ACTIVE"
                          ? styles.activeStatus
                          : styles.inactiveStatus
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.editBtn}>Edit</button>
                    <button
                      onClick={() => toggleStatus(service.id)}
                      className={`${styles.actionBtn} ${
                        service.status === "ACTIVE"
                          ? styles.deactivateBtn
                          : styles.activateBtn
                      }`}
                    >
                      {service.status === "ACTIVE" ? "Inactive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
