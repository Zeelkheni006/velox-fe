'use client';
import { useState } from 'react';
import styles from '../styles/SubCategories.module.css';
import Layout from '../pages/page';
import { createSubCategory } from '../../api/admin-category/sub-category';

export default function AddSubCategory() {
  const [formData, setFormData] = useState({
    title: '',
    category_id: '', // use numeric ID for backend
    logo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'logo') {
      const file = files[0];
      if (file) {
        // ✅ SVG validation
        if (file.type !== 'image/svg+xml') {
          alert('❌ Only SVG files are allowed!');
          e.target.value = null;
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          alert('❌ File size cannot exceed 2MB!');
          e.target.value = null;
          return;
        }
        setFormData({ ...formData, logo: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category_id) {
      alert('❌ Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('title', formData.title);
      data.append('category_id', formData.category_id);
      if (formData.logo) data.append('logo', formData.logo);

      const res = await createSubCategory(data);

      if (!res.success) {
        const messages = Object.values(res.message).flat().join('\n');
        alert('❌ Failed to add subcategory:\n' + messages);
        return;
      }

      alert('✅ Subcategory added successfully!');
      setFormData({ title: '', category_id: '', logo: null });
      document.querySelector('input[name="logo"]').value = null;
    } catch (err) {
      console.error('API Error:', err);
      alert('❌ Unexpected error: ' + err.message);
    } finally {
      setLoading(false);
    }
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
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className={styles.addinput}
              required
            >
              <option value="">Select Category</option>
              <option value="20">NAIL Studio</option>
              <option value="20">AC service</option>
              <option value="20">Spa For Women</option>
              <option value="20">Sofa Cleaning</option>
              <option value="20">Women Beauty Care</option>
              <option value="20">R O Water Purifier</option>
              <option value="20">Cleaning & Disinfection</option>
         
            </select>

            <label>LOGO</label>
            <input
              type="file"
              name="logo"
              accept=".svg"
              onChange={handleChange}
              className={styles.addinput}
            />
            <small>
              Only allowed SVG format. Image resolution must be 64×64. Max file size: 2MB
            </small>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Submitting...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
