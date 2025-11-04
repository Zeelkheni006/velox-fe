"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Leads.module.css";
import { useRouter } from "next/navigation";

export default function PrintLeads() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);

useEffect(() => {
  const savedLeads = sessionStorage.getItem("printLeads");

  if (savedLeads) {
    setLeads(JSON.parse(savedLeads));
  }
}, []);


// ✅ When leads are ready → then print → then return to leads page
useEffect(() => {
  if (leads.length === 0) return;

  const handleAfterPrint = () => {
    router.replace("/admin/lead");
  };

  window.addEventListener("afterprint", handleAfterPrint);

  // ✅ Small delay to ensure UI finished rendering before print opens
  const timer = setTimeout(() => {
    window.print();
  }, 300);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("afterprint", handleAfterPrint);
  };
}, [leads, router]);

  return (
    <div className={styles.printableArea} style={{ padding: "20px" }}>
      <h2>Velox Solution</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Message</th>
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
              <td>{lead.phone}</td>
              <td>{lead.message}</td>
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
