'use client';
import { useState } from 'react';
import styles from '../styles/SubCategories.module.css';
import Layout from '../pages/page'; // adjust path if needed

export default function AddSubCategory() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    logo: null,
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

    // You can handle image size, type validation here
    console.log('Form submitted:', formData);
    alert('Sub Category Submitted!');
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Sub Categories</span> &gt;{' '}
          <span className={styles.addbreadcrumb}>Sub Categories</span> &gt;{' '}
          <span className={styles.addbreadcrumbActive}>Add Sub Categories</span>
        </div>

        <div className={styles.addcard}>
          <h3>Add Sub Categories</h3>
          <form className={styles.addform} onSubmit={handleSubmit}>
            <label>TITLE</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.addinput}
              required
            />

            <label>CATEGORY</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.addinput}
              required
            >
              <option value="">Select Category</option>
              <option value="NAIL Studio">NAIL Studio</option>
              <option value="AC service">AC service</option>
               <option value="Spa For Women">Spa For Women</option>
                <option value="Sofa cleaning">Sofa Cleaning</option>
              <option value="Women Beauty Care">Women Beauty Care</option>
              <option value="R O Water Purifier">R O Water Purifier</option>
              <option value="Cleaning & Disinfection">Cleaning & Disinfection</option>
            </select>

            <label>LOGO</label>
            <input
              type="file"
              name="logo"
              accept="image/png"
              onChange={handleChange}
              className={styles.addinput}
            />
            <small>
              Only allowed png format. Image resolution must be 64×64. Max file size allowed: 2MB
            </small>

            <button type="submit" className={styles.submitBtn}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
