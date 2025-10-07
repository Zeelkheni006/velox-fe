'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/creditplan.module.css';
import Layout from '../pages/page';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function AddCreditPlanPage() {
  const editor = useRef(null);

  // State for all input fields
  const [title, setTitle] = useState('');
  const [creditValue, setCreditValue] = useState('');
  const [creditPrice, setCreditPrice] = useState('');
  const [realPrice, setRealPrice] = useState('');
  const [validityValue, setValidityValue] = useState('');
  const [validityType, setValidityType] = useState('Days');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  // Handle image validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG, JPEG format allowed.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Max file size allowed: 2MB');
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width !== 300 || img.height !== 200) {
        alert('Image resolution must be 300x200');
      } else {
        setImage(file);
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      creditValue,
      creditPrice,
      realPrice,
      validityValue,
      validityType,
      image,
      description,
    };
    console.log('Submitted Data:', formData);
    alert('Credit Plan submitted successfully!');
  };

  return (
    <Layout>
      <div className={styles.addcontainer}>
        {/* Breadcrumb */}
        <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Credit Plan</span> &gt;{' '}
          <span className={styles.addbreadcrumbActive}>Add Credit Plan</span>
        </div>

        <h1 className={styles.addtitle}>Add Credit Plan</h1>

        <form className={styles.addform} onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Credit Value</label>
          <input
            type="text"
            placeholder="Credit Value"
            value={creditValue}
            onChange={(e) => setCreditValue(e.target.value)}
            required
          />

          <label>Credit Price</label>
          <input
            type="text"
            placeholder="Credit Price"
            value={creditPrice}
            onChange={(e) => setCreditPrice(e.target.value)}
            required
          />

          <label>Real Price</label>
          <input
          type="text"
            placeholder="Real Price"
            value={realPrice}
            onChange={(e) => setRealPrice(e.target.value)}
            required
          />

          <label>Validity Value</label>
          <input
            type="text"
            placeholder="Validity Value"
            value={validityValue}
            onChange={(e) => setValidityValue(e.target.value)}
            required
          />

          <label>Validity Type</label>
          <select
            value={validityType}
            onChange={(e) => setValidityType(e.target.value)}
          >
            <option value="Days">Days</option>
            <option value="Months">Months</option>
          </select>

          <label>Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
          />
          <span>
            Only allowed jpg, png, jpeg format. Image resolution must be 300*200. Max file size allowed: 2MB
          </span>

          <label>Description</label>
          <JoditEditor
            ref={editor}
            value={description}
             className={styles.text}
            config={{
              readonly: false,
              height: 300,
              buttons: [
                  "undo","redo", "|",
                      "bold", "italic", "underline", "|",
                      "ul", "ol", "|",
                      "font", "fontsize","brush","|",
                      "align", "|",
                      "table", "link", "image", "video", "|",
                      "source",
              ],
            }}
            onChange={(newContent) => setDescription(newContent)}
          />

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
