"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../pages/page";
import styles from "../styles/testimonial.module.css";// create new CSS

export default function AddTestimonial() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, JPEG, PNG formats allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Max file size allowed is 2MB.");
      return;
    }

    // Check resolution
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width !== 300 || img.height !== 200) {
        setError("Image resolution must be 300x200.");
        return;
      } else {
        setError("");
        setImage(file);
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setError("Please enter a title.");
      return;
    }
    if (!image) {
      setError("Please upload a valid image.");
      return;
    }

    // Submit logic here (e.g., API call)
    console.log("Title:", title);
    console.log("Image:", image);

    // After submit, navigate back to testimonial page
    router.push("/admin/testimonial");
  };

  return (
    <Layout>
     
    <div className={styles.addcontainer}>
        <div className={styles.addheaderContainer}>
                 <div>
                   <span className={styles.addbreadcrumb}>Testimonial</span> &gt;{" "}
                   <span className={styles.addbreadcrumbActive}>Add Testimonial</span>
                 </div>
               </div>  
      <h1 className={styles.addpageTitle}>Add Testimonial</h1>

      <form className={styles.addform} onSubmit={handleSubmit}>
        <label className={styles.addlabel}>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.addinput}
          />
        </label>

        <label className={styles.addlabel}>
          Image
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            className={styles.addinput}
          />
          <small className={styles.addnote}>
            Only allowed jpg, png, jpeg format. Image resolution must be 300*200.
            Max file size allowed: 2MB
          </small>
        </label>

        {error && <p className={styles.adderror}>{error}</p>}

        <button type="submit" className={styles.addsubmitBtn}>
          Submit
        </button>
      </form>
    </div>
    </Layout>
  );
}
