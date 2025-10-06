"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Layout from "../pages/page"; // adjust path
import styles from "../styles/serviceratind.module.css";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function EditServiceRating() {
  const searchParams = useSearchParams();
  const ratingId = searchParams.get("id");

  // Mock data – replace this with your real data source or API fetch
  const existingRatings = [
    {
      id: "1",
      user: "Vendor",
      service: "SOFA CLEANING",
      rating: 4,
      comment: "Great service!",
    },
    {
      id: "2",
      user: "User",
      service: "CASSETTE AC CHEMICAL WASH",
      rating: 5,
      comment: "Excellent work!",
    },
  ];

  const users = ["Vendor", "User", "Test User"];
  const services = ["SOFA CLEANING", "CASSETTE AC CHEMICAL WASH"];

  const [user, setUser] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (ratingId) {
      const data = existingRatings.find((r) => r.id === ratingId);
      if (data) {
        setUser(data.user);
        setService(data.service);
        setRating(data.rating);
        setComment(data.comment);
      }
    }
  }, [ratingId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { id: ratingId, user, service, rating, comment };
    console.log("Updated Rating:", updatedData);
    alert("Rating updated successfully!");
  };

  return (
    <Layout>
      <div className={styles.addcontainer}>
        <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Service Rating</span> &gt;{" "}
          <span className={styles.addbreadcrumbActive}>Edit Service Rating</span>
        </div>

        <h2 className={styles.addtitle}>Edit Service Rating</h2>

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
                buttons: [
                  "undo",
                  "redo",
                  "|",
                  "bold",
                  "italic",
                  "underline",
                  "|",
                  "ul",
                  "ol",
                  "|",
                  "link",
                  "image",
                  "|",
                  "source",
                ],
              }}
            />
          </label>

          <button type="submit" className={styles.addsubmitBtn}>
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
}
