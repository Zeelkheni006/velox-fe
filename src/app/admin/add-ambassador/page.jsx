"use client"
import { useState, useRef, useEffect } from 'react';  
import styles from '../styles/Categories.module.css';
import Layout from "../pages/page";
import dynamic from 'next/dynamic';
 const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
}); 

export default function AddCategory() {
  const [formData, setFormData] = useState({
    title: '',
    logo: null,
      description: '',
    });
  const [description, setDescription] = useState('');
const [longDescription, setLongDescription] = useState('');
const [mounted, setMounted] = useState(false);
 const editor = useRef(null);
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
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Layout>
    <div className={styles.addcontainer}>
         <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Brand Ambassador</span> &gt;{' '}
          <span className={styles.addbreadcrumbActive}>Add Ambassador</span>
        </div>
<div className={styles.addcard}>
      <h2 className={styles.addheading}>Add Ambassador</h2>

      <form className={styles.addform} onSubmit={handleSubmit}>
        <label className={styles.addlabel}>Name</label>
        <input
          type="text"
          name="title"
          className={styles.addinput}
          onChange={handleChange}
          required
        />
 <label className={styles.addlabel}>Facebook Profile</label>
        <input
          type="text"
          name="title"
          className={styles.addinput}
          onChange={handleChange}
          required
        />
         <label className={styles.addlabel}>whatsApp Number</label>
        <input
          type="text"
          name="title"
          className={styles.addinput}
          onChange={handleChange}
          required
        />
         <label className={styles.addlabel}>Instagram Profile</label>
        <input
          type="text"
          name="title"
          className={styles.addinput}
          onChange={handleChange}
          required
        />
        <label className={styles.addlabel}>Display Index</label>
        <input
          type="text"
          name="title"
          className={styles.addinput}
          onChange={handleChange}
          required
        />
        <label className={styles.addlabel}>Photo</label>
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

    <div className={styles.flex1}>
       <label htmlFor="description">Time Line</label>
       {mounted && (
         <JoditEditor
           ref={editor}
           value={description}
           config={{
             readonly: false,
             height: 200,
             toolbarSticky: false,
             buttons: [
                 'undo', 'redo', '|',
         'bold', 'italic', 'underline', 'strikethrough', '|',
         'backcolor', '|',
         'ul', 'ol', '|',
         'font', 'fontsize', 'brush', '|',
         'align', '|',
         'table', 'link', 'image', 'video', '|',
         'horizontalrule', 'source', '|',
         'help'
             ]
           }}
           tabIndex={1}
           onBlur={newContent => setDescription(newContent)}
         />
       )}
       <small className={styles.note}>Max file size allowed : 500Kb.</small>
     </div>

        <button type="submit" className={styles.addsubmitButton}>
          SUBMIT
        </button>
      </form>
      </div>
    </div>
    </Layout>
  );
}
