'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../pages/page';
import styles from '../styles/creditplan.module.css';

// ✅ Dynamically import JoditEditor
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditCreditPlanPage() {
  const editor = useRef(null);

  // ✅ Form states
  const [plan, setPlan] = useState(null);
  const [validityType, setValidityType] = useState('Days');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  // ✅ Load plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedCreditPlan');
    if (savedPlan) {
      const parsed = JSON.parse(savedPlan);
      setPlan(parsed);
      setDescription(parsed.description || '');
      if (parsed.validityType) setValidityType(parsed.validityType);
    }
  }, []);

  // ✅ Handle text and number changes
  const handleChange = (field, value) => {
    setPlan((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Handle image validation
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

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPlan = {
      ...plan,
      validityType,
      description,
      image,
    };
    console.log('Updated Plan:', updatedPlan);
    alert('Credit Plan updated successfully!');
  };

  if (!plan) {
    return (
      <Layout>
       
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.addcontainer}>
          <div className={styles.addheaderContainer}>
                  <span className={styles.addbreadcrumb}>Credit Plan</span> &gt;{' '}
                  <span className={styles.addbreadcrumbActive}>Edit Credit Plan</span>
                </div>
        <h1 className={styles.addtitle}>Edit Credit Plan</h1>

        <form className={styles.addform} onSubmit={handleSubmit}>
          {/* Title */}
          <label>Title</label>
          <input
            type="text"
            value={plan.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />

          {/* Credit */}
          <label>Credit</label>
          <input
            type="text"
            value={plan.credit || ''}
            onChange={(e) => handleChange('credit', e.target.value)}
            required
          />

          {/* Price */}
          <label>Price</label>
          <input
            type="text"
            value={plan.price || ''}
            onChange={(e) => handleChange('price', e.target.value)}
            required
          />

          {/* Validity */}
          <label>Validity</label>
          <input
            type="text"
            value={plan.validity || ''}
            onChange={(e) => handleChange('validity', e.target.value)}
            required
          />

          {/* Validity Type */}
          <label>Validity Type</label>
          <select
            value={validityType}
            onChange={(e) => setValidityType(e.target.value)}
          >
            <option value="Days">Days</option>
            <option value="Months">Months</option>
          </select>

          {/* Image Upload */}
          <label>Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
          />
          <span className={styles.note}>
            Only allowed jpg, png, jpeg format. Image resolution must be 300×200.
            Max file size allowed: 2MB
          </span>

          {/* Description */}
          <label>Description</label>
          <JoditEditor
            ref={editor}
            value={description}
            config={{
              readonly: false,
              height: 300,
              buttons: [
                'undo', 'redo', '|',
                'bold', 'italic', 'underline', '|',
                'ul', 'ol', '|',
                'font', 'fontsize', 'brush', '|',
                'align', '|',
                'table', 'link', 'image', 'video', '|',
                'source'
              ],
            }}
            onChange={(newContent) => setDescription(newContent)}
          />

          {/* Submit Button */}
          <button type="submit" className={styles.submitBtn}>
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
}
