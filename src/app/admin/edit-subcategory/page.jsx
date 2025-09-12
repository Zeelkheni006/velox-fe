'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../styles/SubCategories.module.css';
import Layout from '../pages/page';
// import dynamic from 'next/dynamic';


  
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
export default function EditCategory() {
  const searchParams = useSearchParams();
  const titleFromURL = searchParams.get('title');
  const logoFromURL = searchParams.get('logo'); 
  const categoryFromURL = searchParams.get('category');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState(null);
   const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState('/icon/default.png'); // fallback image
  

  // Mock loading from URL parameter
  useEffect(() => {
  if (titleFromURL) {
    setTitle(titleFromURL);
    setDescription(`${titleFromURL} By Velox`);
  }

  if (logoFromURL) {
    setLogoUrl(logoFromURL); // 👈 use actual logo path
  }
   if (categoryFromURL) {
    setFormData(prev => ({ ...prev, category: categoryFromURL }));
  }
}, [titleFromURL, logoFromURL, categoryFromURL]);
const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Category Updated!');
    // You would send this data to your backend API here
  };
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
  return (
    <Layout>
      <div className={styles.editcontainer}>
        <div className={styles.editheader}>
          <span className={styles.editbreadcrumb}>Sub Category</span> &gt;{" "}
            <span className={styles.editbreadcrumb}>Sub Category</span> &gt;{" "}
          <span className={styles.editbreadcrumbActive}>Edit Sub Category</span>
        </div>

        <div className={styles.editcard}>
          <h2>Edit Category</h2>
          <form onSubmit={handleSubmit}>
            <label className={styles.editlabel}>TITLE</label>
            <input
              type="text"
              className={styles.editinput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
   <label className={styles.editlabel}>CATEGORY</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.editinput}
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
            <label className={styles.editlabel}>LOGO</label>
            <input
              type="file"
              className={styles.editinput}
              accept="image/png"
              onChange={(e) => setLogoFile(e.target.files[0])}
            />
            <p className={styles.edithint}>
              Only allowed png format. Image resolution must be 64*64. Max file size allowed: 2MB
            </p>

         {(logoPreview || logoUrl) && (
  <div className={styles.editimagePreview}>
    <img
      src={logoPreview || logoUrl}
      alt="Logo Preview"
      width={64}
      height={64}
    />
  </div>
)}


        

            <button type="submit" className={styles.editupdateBtn}>UPDATE</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
