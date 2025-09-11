"use client"
import { useState } from 'react';
import styles from '../styles/Categories.module.css';
import Layout from "../pages/page";

export default function AddCategory() {
  const [formData, setFormData] = useState({
    title: '',
    logo: null,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submit logic (e.g. upload to API)
    console.log(formData);
  };

  return (
    <Layout>
    <div className={styles.addcontainer}>
      <div className={styles.breadcrumbadd}>
        <span>Category</span> &gt; <span className={styles.addbread}>Add Category</span>
      </div>

      <h2 className={styles.addheading}>Add Category</h2>

      <form className={styles.addform} onSubmit={handleSubmit}>
        <label className={styles.addlabel}>Title</label>
        <input
          type="text"
          name="title"
          className={styles.addinput}
          onChange={handleChange}
          required
        />

        <label className={styles.addlabel}>Logo</label>
        <input
          type="file"
          name="logo"
          accept=".png"
          className={styles.addinput}
          onChange={handleChange}
          required
        />
        <p className={styles.addnote}>
          Only allowed PNG format. Image resolution must be 64×64. Max file size allowed: 2MB
        </p>

        <label className={styles.addlabel}>Description</label>
        <textarea
          name="description"
          className={styles.addtextarea}
          rows="4"
          onChange={handleChange}
        />
        <p className={styles.addnote}>Max file size allowed: 500Kb.</p>

        <button type="submit" className={styles.addsubmitButton}>
          SUBMIT
        </button>
      </form>
    </div>
    </Layout>
  );
}
