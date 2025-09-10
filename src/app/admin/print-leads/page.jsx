"use client";
import React, { useEffect } from "react";
import styles from "../styles/Leads.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function PrintLeads() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Example: leads data receive karva mate tamaru backend / context / state ma data pathavi shako
  // Here, for demo, tamaru leads data fetch / decode karo from search params (json string)
  // Best way: use context or redux or state management, but simple example:

  const leadsParam = searchParams.get("leads");
  let leads = [];
  try {
    leads = leadsParam ? JSON.parse(decodeURIComponent(leadsParam)) : [];
  } catch (e) {
    leads = [];
  }

  useEffect(() => {
    // Automatically open print dialog when component load thay
    window.print();

    // Optional: Print dialog close thay pachi user ne back le javva mate
    const timer = setTimeout(() => {
      router.back();
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.printableArea} style={{ padding: "20px" }}>
      <h2>Velox Solution</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Skill</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr key={i}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.mobile}</td>
              <td>{lead.skill}</td>
              <td>{lead.country}</td>
              <td>{lead.state}</td>
              <td>{lead.city}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
