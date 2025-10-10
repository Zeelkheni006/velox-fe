"use client";

import { useState } from "react";
import Layout from "../../pages/page";
import styles from "../../styles/adminAbout.module.css";

export default function AddAbout() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [designation, setDesignation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !designation || !image) {
      alert("Please fill all fields and select an image!");
      return;
    }

    // You can handle API submission here
    alert(`Team member added:\nName: ${name}\nDesignation: ${designation}`);
    
    // Reset fields
    setName("");
    setImage(null);
    setDesignation("");
  };

  return (
    <Layout>
      <div className={styles.addcontainer}>
        <div className={styles.headerContainer}>
            <div>
                                <span className={styles.breadcrumb}>About</span> &gt;{' '}
                                <span className={styles.breadcrumbActive}>Add About</span>
                              </div>
         
        </div>
         <div className={styles.addcontent}>
 <div className={styles.addright}>
        <form className={styles.addform} onSubmit={handleSubmit}>
             <h2>Add Our Team</h2>
          <label>Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
</label>
          <label>Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
</label>
          <label>Designation:
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Enter designation"
          />
</label>
          <button type="submit" className={styles.addsubmitBtn}>
            Submit
          </button>
        </form>
        </div>
        </div>
      </div>
    </Layout>
  );
}
