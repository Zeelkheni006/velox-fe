// pages/admin/manage-media.js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../pages/page";
import styles from '../styles/services.module.css'; // ✅ updated CSS import

export default function ManageMedia() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [service, setService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("selectedService");
    if (stored) {
      const service = JSON.parse(stored);
      setService(service);
    }
  }, []);

  const handleUpdate = () => {
    alert("Media updated!");
    // Upload logic here
  };

  const handleDelete = () => {
    alert("Media deleted!");
    // Delete logic here
  };

  return (
    <Layout>
      <div className={styles.mediacontainer}>
           <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Services</span> &gt;{' '}
          <span className={styles.addbreadcrumb}>Services</span> &gt;{' '}
          <span className={styles.addbreadcrumbActive}>Services Media</span>
        </div>
        <div className={styles.addcard}>
        <h3>Service Media</h3>

        <div className={styles.mediaBox}>
          {service?.image ? (
            <img
              src="/images/offerbanner.webp"
              alt={service.title}
              className={styles.mediaImage}
             
            />
          ) : (
            <p>No media found</p>
          )}

          <br />
          <div className={styles.inputimage}>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <p className={styles.note}>Max File size allowed: 10MB</p>

          <div className={styles.buttonGroup}>
            <button onClick={handleUpdate} className={styles.updateBtn}>
              Update
            </button>
            <button onClick={handleDelete} className={styles.deleteBtn}>
              Delete
            </button>
          </div>
        </div>
        </div>

        <div className={styles.addNewWrapper}>
          <button
  className={styles.addNewBtn}
  onClick={() => setIsModalOpen(true)}
>
  + Add new
</button>
        </div>
      </div>
      {isModalOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h4>Add Media</h4>
        <button className={styles.modalClose} onClick={() => setIsModalOpen(false)}>×</button>
      </div>

      <div className={styles.modalBody}>
        <label>MEDIA</label>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <p className={styles.addnote}>Max File size allowed: 10MB</p>
        <button className={styles.submitBtn}>SUBMIT</button>
      </div>

      <div className={styles.modalFooter}>
        <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>Close</button>
      </div>
    </div>
  </div>
)}
</div>
    </Layout>
  );
}
