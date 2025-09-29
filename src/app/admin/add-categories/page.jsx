"use client"
import { useState, useRef, useEffect } from 'react';  
import styles from '../styles/Categories.module.css';
import Layout from "../pages/page";
import dynamic from 'next/dynamic';
import { createCategory } from "../../api/admin-category/category"; 

 const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function AddCategory() {
  const [formData, setFormData] = useState({ title: '', logo: null });
  const [description, setDescription] = useState('');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createCategory({
        title: formData.title,
        logo: formData.logo,
        description
      });
      alert("Category created successfully!");
      console.log("Category:", result);
      // Reset form
      setFormData({ title: '', logo: null });
      setDescription('');
    } catch (err) {
      alert("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setMounted(true), []);

  return (
    <Layout>
      <div className={styles.addcontainer}>
        <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Category</span> &gt;{' '}
          <span className={styles.addbreadcrumbActive}>Add Category</span>
        </div>

        <div className={styles.addcard}>
          <h2 className={styles.addheading}>Add Category</h2>

          <form className={styles.addform} onSubmit={handleSubmit}>
            <label className={styles.addlabel}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.addinput}
              required
            />

            <label className={styles.addlabel}>Logo</label>
            <input
              type="file"
              name="logo"
              accept=".svg"
              onChange={handleChange}
              className={styles.addinput}
              required
            />
            <p className={styles.addnote}>
              Only PNG format. Resolution: 64×64. Max size: 2MB
            </p>

            <div className={styles.flex1}>
              <label>Description</label>
              {mounted && (
                <JoditEditor
                  ref={editor}
                  value={description}
                  config={{
                    readonly: false,
                    height: 200,
                    toolbarSticky: false
                  }}
                  tabIndex={1}
                  onBlur={newContent => setDescription(newContent)}
                />
              )}
              <small className={styles.note}>Max file size allowed: 500Kb.</small>
            </div>

            <button type="submit" className={styles.addsubmitButton} disabled={loading}>
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}