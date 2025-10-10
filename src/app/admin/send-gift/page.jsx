"use client";
import { useState } from "react";
import Layout from "../pages/page";
import dynamic from "next/dynamic";
import styles from "../styles/gift.module.css";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function SendGift() {
  const [form, setForm] = useState({
    giftCard: "",
    file: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Gift sent! Check console for details.");
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
       <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Gift</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Send Gift</span>
          </div>
        </div>

        <div className={styles.card}>
          {/* Title */}
          <h3 style={{ color: "#888", marginBottom: "20px", textAlign:"left" }}>Send Gift</h3>

          <form onSubmit={handleSubmit}>
            {/* Gift Card Label + Select */}
            <label className={styles.fieldLabel}>Gift Card</label>
            <select
              name="giftCard"
              value={form.giftCard}
              onChange={handleChange}
              className={styles.addselect}
            >
              <option value="">Select Gift Card</option>
              <option value="gift1">Gift Card 1</option>
              <option value="gift2">Gift Card 2</option>
            </select>

            {/* File Upload */}
            <label className={styles.fieldLabel} style={{ marginTop: "20px" }}>
              Upload CSV
            </label>
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={handleChange}
              className={styles.fileInput}
            />
            <div style={{ fontSize: "12px", color: "#555", marginBottom: "20px", textAlign:"left"}}>
              Only allowed CSV format. Max file size allowed: 2MB
            </div>

            {/* Description using JoditEditor */}
            <label className={styles.fieldLabel}>Description</label>
            <JoditEditor
              value={form.description}
              config={{
                readonly: false,
                height: 200,
                buttons: ["undo", "redo", "|", "bold", "italic", "underline", "|", "ul", "ol", "|", "link", "image", "|", "source"],
              }}
              onChange={(newContent) =>
                setForm((prev) => ({ ...prev, description: newContent }))
              }
            />
            <div style={{ fontSize: "12px", color: "#555", marginBottom: "20px",textAlign:"left" }}>
              Max file size allowed: 500Kb
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn} style={{ float: "left" }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
