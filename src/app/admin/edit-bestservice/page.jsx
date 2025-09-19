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
 
  const categoryFromURL = searchParams.get('category');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');



  

  // Mock loading from URL parameter
  useEffect(() => {
  if (titleFromURL) {
    setTitle(titleFromURL);
    setDescription(`${titleFromURL} By Velox`);
  }


   if (categoryFromURL) {
    setFormData(prev => ({ ...prev, category: categoryFromURL }));
  }
}, [titleFromURL,  categoryFromURL]);
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
          <h2>Edit Best Services</h2>
          <form onSubmit={handleSubmit}>
          
   <label className={styles.editlabel}>Services</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.editinput}
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

            <button type="submit" className={styles.editupdateBtn}>UPDATE</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
