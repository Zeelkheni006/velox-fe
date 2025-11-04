'use client';
import { useState,useEffect } from 'react';
import styles from '../../styles/SubCategories.module.css';
import Layout from '../../pages/page';
import { createSubCategory } from '../../../api/admin-category/sub-category';
import { getCategories } from '../../../api/admin-category/sub-category';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // ✅ Import icons

export default function AddSubCategory() {
  const [formData, setFormData] = useState({
    title: '',
    category_id: '', // use numeric ID for backend
    logo: null,
  });
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); 
    const [popupType, setPopupType] = useState(""); 

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
        setPopupMessage('❌ Failed to add subcategory:\n' + messages);
        setPopupType("error")
        return;
      }

      setPopupMessage('✅ Subcategory added successfully!');
      setPopupType("success")
      setFormData({ title: '', category_id: '', logo: null });
      document.querySelector('input[name="logo"]').value = null;
    } catch (err) {
      console.error('API Error:', err);
      setPopupMessage('❌ Unexpected error: ' + err.message);
      setPopupType("error")
    } finally {
      setLoading(false);
    }
  };
const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    const res = await getCategories();
    if (res.success) setCategories(res.data || []);
  };

  fetchCategories();
}, []);
  // Popup auto-hide
useEffect(() => {
  if (!popupMessage) return;
  const timer = setTimeout(() => {
    setPopupType(prev => prev + " hide"); 
    setTimeout(() => {
      setPopupMessage("");
      setPopupType("");
    }, 400);
  }, 4000);
  return () => clearTimeout(timer);
}, [popupMessage]);


  return (
    <Layout>
      <div className={styles.wrapper}>
             <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Sub Category</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Add Subcategory</span>
          </div>
        </div>

        <div className={styles.addcard}>
          <h3>Add Sub Categories</h3>
                    {/* Popup */}
          {popupMessage && (
            <div className={`${styles["email-popup"]} ${styles[popupType]} ${styles.show} flex items-center gap-2`}>
              {popupType.startsWith("success") ? 
                <AiOutlineCheckCircle className="text-green-500 text-lg"/> : 
                <AiOutlineCloseCircle className="text-red-500 text-lg"/>}
              <span>{popupMessage.replace(/^✅ |^❌ /,"")}</span>
            </div>
          )}
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
  value={formData.category_id} // ✅ use formData
  onChange={handleChange}      // ✅ same handleChange function
  className={styles.editinput}
  required
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={String(cat.id)}>
      {cat.title}
    </option>
  ))}
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
