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
          <span className={styles.addbreadcrumb}>Best Services</span> &gt;{' '}
          <span className={styles.addbreadcrumb}>Best Services</span> &gt;{' '}
          <span className={styles.addbreadcrumbActive}>Add Best Services</span>
        </div>

        <div className={styles.addcard}>
          <h3>Add Best Services</h3>
          <form className={styles.addform} onSubmit={handleSubmit}>
            
          

            <label>services</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.addinput}
              required
            >
              <option value="">Select Category</option>
              <option value="NAIL Studio">Bathroom Deep Cleaning</option>
              <option value="AC service">Water tank Cleaning</option>
               <option value="Spa For Women">Fridge Cleaning</option>
                <option value="Sofa cleaning">Oven Cleaning</option>
              <option value="Women Beauty Care">6 Panel cleaning</option>
              <option value="R O Water Purifier">9 Panel cleaning</option>
              <option value="Cleaning & Disinfection">12 Panel cleaning</option>
            </select>
            <button type="submit" className={styles.submitBtn}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
