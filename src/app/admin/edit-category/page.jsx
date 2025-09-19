'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Categories.module.css';
import Layout from '../pages/page';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
}); 

export default function EditCategory() {
  const searchParams = useSearchParams();
  const titleFromURL = searchParams.get('title');
  const logoFromURL = searchParams.get('logo'); 
const descriptionFromURL = searchParams.get('description');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState(null);
   const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState('/icon/default.png'); // fallback image
const [longDescription, setLongDescription] = useState('');
const [mounted, setMounted] = useState(false);
 const editor = useRef(null);
 useEffect(() => {
  if (titleFromURL) {
    setTitle(titleFromURL);
  }

  if (logoFromURL) {
    setLogoUrl(logoFromURL);
  }

  if (descriptionFromURL) {
    setDescription(descriptionFromURL);
    setLongDescription(descriptionFromURL); // 👈 Prefill JoditEditor
  } else if (titleFromURL) {
    const defaultDesc = `${titleFromURL} By Velox`;
    setDescription(defaultDesc);
    setLongDescription(defaultDesc); // 👈 Fallback if no description passed
  }
}, [titleFromURL, logoFromURL, descriptionFromURL]);
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
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Layout>
      <div className={styles.editcontainer}>
        <div className={styles.editheader}>
          <span className={styles.editbreadcrumb}>Category</span> &gt;{" "}
          <span className={styles.editbreadcrumbActive}>Edit Category</span>
        </div>

        <div className={styles.editcard}>
          <h3>Edit Category</h3>
          <form onSubmit={handleSubmit}>
            <label className={styles.editlabel}>TITLE</label>
            <input
              type="text"
              className={styles.editinput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

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

  
  <div className={styles.flex1}>
    <label htmlFor="longDescription" className={styles.editlabel}> DESCRIPTION</label>
    {mounted && (
      <JoditEditor
        ref={editor}
        value={longDescription}
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
        tabIndex={2}
       onBlur={(newContent) => {
  setLongDescription(newContent);
  setDescription(newContent);
}}
      />
    )}
   
  </div>
             {/* <textarea
              className={styles.edittextarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />   */}

            <p className={styles.edithint}>Max file size allowed: 500Kb.</p>

            <button type="submit" className={styles.editupdateBtn}>UPDATE</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
