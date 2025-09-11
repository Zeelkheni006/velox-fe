'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../styles/Categories.module.css';
import Layout from '../pages/page';
// import dynamic from 'next/dynamic';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
export default function EditCategory() {
  const searchParams = useSearchParams();
  const titleFromURL = searchParams.get('title');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  // Mock loading from URL parameter
  useEffect(() => {
    if (titleFromURL) {
      setTitle(titleFromURL);
      setDescription(`${titleFromURL} By Velox`);
    }
  }, [titleFromURL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Category Updated!');
    // You would send this data to your backend API here
  };

  return (
    <Layout>
      <div className={styles.editcontainer}>
        <div className={styles.editheader}>
          <span className={styles.editbreadcrumb}>Category</span> &gt;{" "}
          <span className={styles.editbreadcrumbActive}>Edit Category</span>
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

            <div className={styles.editimagePreview}>
              <img src="/icon/nail.png" alt="Current Logo" />
            </div>

            <label className={styles.editlabel}>DESCRIPTION</label>
            {/* <ReactQuill
  theme="snow"
  value={description}
  onChange={setDescription}
  className={styles.editquill}
/> */}
            <textarea
              className={styles.edittextarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <p className={styles.edithint}>Max file size allowed: 500Kb.</p>

            <button type="submit" className={styles.editupdateBtn}>UPDATE</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
