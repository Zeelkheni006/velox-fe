"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../../pages/page"; // adjust path
import styles from "../../styles/serviceratind.module.css";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddServiceRating() {
    const router = useRouter();
  
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
 const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/service-rating"); // Customer page
  };
  return (
    <Layout>
      <div className={styles.addcontainer}>
              <div className={styles.headerContainer}>
            <div>
                    <span className={styles.breadcrumb} style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Service Rating</span> 
                          <span className={styles.separator}> | </span>
               <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
           <span> &gt; </span>
                       <span className={styles.breadcrumbActive}>Add Rating</span>
                              </div>
         
        </div>
       
        <form className={styles.addform} onSubmit={handleSubmit}>
           <h2 className={styles.addtitle}>Add Service Rating</h2>
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
