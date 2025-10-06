"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../pages/page"; // adjust path
import styles from "../styles/serviceratind.module.css";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddServiceRating() {
  const [user, setUser] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0); // current rating
  const [hoverRating, setHoverRating] = useState(0); // for hover effect
  const [comment, setComment] = useState("");

  const users = ["Vendor", "User", "Test User"];
  const services = ["SOFA CLEANING", "CASSETTE AC CHEMICAL WASH"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submit logic
    const data = { user, service, rating, comment };
    console.log("Submitted:", data);
    alert("Rating submitted successfully!");
    // Reset form
    setUser("");
    setService("");
    setRating(0);
    setHoverRating(0);
    setComment("");
  };

  return (
    <Layout>
      <div className={styles.addcontainer}>
           <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Service Rating</span> &gt;{" "}
          <span className={styles.addbreadcrumbActive}>Add Service Rating</span>
        </div>
        <h2 className={styles.addtitle}>Add Service Rating</h2>
        <form className={styles.addform} onSubmit={handleSubmit}>
          <label>
            User:
            <select value={user} onChange={(e) => setUser(e.target.value)}>
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>

          <label>
            Service:
            <select value={service} onChange={(e) => setService(e.target.value)}>
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label>
            Rating:
            <div className={styles.addstars}>
              {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                <span
                  key={star}
                  className={`${styles.addstar} ${
                    star <= (hoverRating || rating) ? styles.filled : ""
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </label>

          <label>
            Comment:
            <JoditEditor
              value={comment}
              onChange={(newContent) => setComment(newContent)}
                config={{
                readonly: false,
                height: 250,
                buttons: ["undo","redo","|","bold","italic","underline","|","ul","ol","|","link","image","|","source"]
              }}
            />
          </label>
  <div style={{ fontSize: "12px", color: "#555", marginBottom: "20px", textAlign:"left" }}>
              Max file size allowed: 500Kb
            </div>
          <button type="submit" className={styles.addsubmitBtn}>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
