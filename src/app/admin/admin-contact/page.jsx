"use client";

import { useState } from "react";
import Layout from "../pages/page"; // same layout used in other admin pages
import styles from "../styles/contactus.module.css";

export default function ContactUsPage() {
  // sample data (replace later with API data)
  const [contacts] = useState([
    { id: 1, name: "Dhruvi Mendapara", email: "dhruvi@example.com", phone: "9876543210", comment: "Need more details about cleaning services." },
    { id: 2, name: "Ravi Patel", email: "ravi@gmail.com", phone: "9123456780", comment: "Looking for AC maintenance plan." },
    { id: 3, name: "Nidhi Sharma", email: "nidhi@yahoo.com", phone: "9998887777", comment: "Please call me regarding solar panel setup." },
  ]);
  const [selectedComment, setSelectedComment] = useState(null);
  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Contact Us</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Contact Us</span>
          </div>
        </div>

        {/* Title */}
        <div className={styles.card}>
        <h2 className={styles.pageTitle}>Contact Us</h2>

        {/* Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>                     <span
                      className={styles.viewText}
                      onClick={() => setSelectedComment(contact.comment)}
                    >
                      View Comment...
                    </span>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {selectedComment && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
              <div className={styles.modalHeader}>
                <h3>Comment</h3>
              </div>
              <div className={styles.modalBody}>
                <p>{selectedComment}</p>
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={styles.closeBtn}
                  onClick={() => setSelectedComment(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
