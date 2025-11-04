"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Franchises.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function PrintFranchises() {
  const [franchises, setFranchises] = useState([]);
    const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("franchisesToPrint");
    if (data) {
      setFranchises(JSON.parse(data));
      setTimeout(() => window.print(), 500); // Open print dialog after data loads
    }
  }, [router]);

  return (
    <div className={styles.printableArea} style={{ padding: "20px" }}>
      <h2>Velox Solution</h2>
      <table className={styles.table}>
        <thead>
          <tr>
             <th>ID</th>
            <th>Franchise Name</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Commission</th>
            
          </tr>
        </thead>
        <tbody>
          {franchises.map((franchise, i) => (
            <tr key={i}>
              <td>{franchise.id || "-"}</td>
              <td>{franchise.name || "-"}</td>
              <td>{franchise.country || "-"}</td>
              <td>{franchise.state || "-"}</td>
              <td>{franchise.city || "-"}</td>
              <td>{franchise.commission || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
