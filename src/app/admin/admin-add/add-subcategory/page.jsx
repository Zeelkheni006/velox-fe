'use client';
import { useState,useEffect } from 'react';
import styles from '../../styles/SubCategories.module.css';
import Layout from '../../pages/page';
import { createSubCategory } from '../../../api/admin-category/sub-category';
import { getCategories } from '../../../api/admin-category/sub-category';
import usePopup from "../../components/popup"
import PopupAlert from "../../components/PopupAlert";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";
export default function AddSubCategory() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category_id: '', // use numeric ID for backend
    logo: null,
  });
  const [loading, setLoading] = useState(false);
 const { popupMessage, popupType, showPopup } = usePopup();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

   if (name === 'logo') {
  const file = files[0];
  if (file) {
    if (file.type !== 'image/svg+xml') {
      showPopup('❌ Only SVG files are allowed!');
      e.target.value = null;
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showPopup('❌ File size cannot exceed 2MB!');
      e.target.value = null;
      return;
    }

    setFormData({ ...formData, logo: file });

    // ✅ SVG preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }
}
 else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category_id) {
      showPopup('❌ Please fill all required fields.');
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
        showPopup('❌ Failed to add subcategory:\n' + messages);
        
        return;
      }

      showPopup('✅ Subcategory added successfully!');
      
      setFormData({ title: '', category_id: '', logo: null });
      document.querySelector('input[name="logo"]').value = null;
    } catch (err) {
      console.error('API Error:', err);
      showPopup('❌ Unexpected error: ' + err.message);
  
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

     const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/sub-categories"); // Customer page
  };

  return (
    <Layout>
       <PopupAlert message={popupMessage} type={popupType} />
      <div className={styles.wrapper}>
             <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}
              style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Sub Category</span>
         <span className={styles.separator}> | </span> 
             <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
                     <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Add Subcategory</span>
          </div>
        </div>

        <div className={styles.addcard}>
          <h3>Add Sub Categories</h3>
                    {/* Popup */}
          
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
            {previewUrl && (
  <div style={{ marginTop: "10px" }}>
    <p>Preview:</p>
    <img
      src={previewUrl}
      alt="SVG Preview"
      style={{ width: "64px", height: "64px", border: "1px solid #ccc" }}
    />
  </div>
)}
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
