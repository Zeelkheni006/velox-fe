'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from '../styles/services.module.css'; // Make sure this CSS exists
import Layout from '../pages/page'; // Ideally, move Layout to a shared components folder

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

export default function EditService() {
     const [formData, setFormData] = useState({
    title: '',
    category: '',
    subCategory: '',
    price: '',
    displayNumber: '',
    image: null,
    banner: null,
    hours: '',
    minutes: '',
  });
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [mounted, setMounted] = useState(false);

  // Editor refs
  const descriptionEditor = useRef(null);
  const longDescriptionEditor = useRef(null);

  // Form data state


  // Rich text editor states

  // Sync title from query param
useEffect(() => {
  const stored = localStorage.getItem('selectedService');
  if (stored) {
    const data = JSON.parse(stored);

    // 🕒 Convert time string like "1 Hour 0 Minute" into hours and minutes
    let hours = '';
    let minutes = '';
    if (data.time) {
      const timeMatch = data.time.match(/(\d+)\s*Hour[s]?\s*(\d+)\s*Minute[s]?/i);
      if (timeMatch) {
        hours = timeMatch[1];    // "1"
        minutes = timeMatch[2];  // "0"
      }
    }

    setFormData({
      title: data.title || '',
      category: data.category || '',
      subCategory: data.subCategory || '',
      price: data.price || '',
      displayNumber: data.displayNumber || '',
      image: data.image || null,
      banner: data.banner || null,
      hours: hours,
      minutes: minutes,
    });

    setDescription(data.description || '');
    setLongDescription(data.longDescription || '');
  }

  setMounted(true);
}, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generic form handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const bannerBase64 = formData.banner instanceof File
    ? await convertToBase64(formData.banner)
    : formData.banner;

  const imageBase64 = formData.image instanceof File
    ? await convertToBase64(formData.image)
    : formData.image;

  const updatedService = {
    ...formData,
    banner: bannerBase64,
    image: imageBase64,
    description,
    longDescription,
    time: `${formData.hours} Hour ${formData.minutes} Minute`,
  };

  localStorage.setItem('selectedService', JSON.stringify(updatedService));

  alert("Service updated successfully!");
};

  return (
    <Layout>
      <div className={styles.addcontainer}>
        <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Services</span> &gt;{' '}
          <span className={styles.addbreadcrumb}>Services</span> &gt;{' '}
          <span className={styles.addbreadcrumbActive}>Edit Services</span>
        </div>
<div className={styles.addcard}>
        <h2>Edit Services</h2>

        <form onSubmit={handleSubmit}>
          {/* CATEGORY */}
          <label htmlFor="category">CATEGORY</label>
          <select name="category" value={formData.category} onChange={handleChange}>
             <option value="">Select Category</option>
            <option value="Women Beauty Care">Women Beauty Care</option>
            <option value="AC Service">AC Service</option>
          </select>

          {/* SUB CATEGORY */}
          <label htmlFor="subCategory">SUB CATEGORY</label>
          <select name="subCategory" value={formData.subCategory} onChange={handleChange}>
            <option value="">Select Sub Category</option>
            <option value="Special Packages">Special Packages</option>
            <option value="Facial">Facial</option>
            <option value="Split AC">Split AC</option>
          </select>

          {/* TITLE */}
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {/* IMAGE UPLOAD */}
          <label htmlFor="image">IMAGE</label>
          <input type="file" name="image" accept=".png" onChange={handleChange} />
          <small>Only allowed png format. 64x64. Max size: 2MB</small>
          {formData.image && (
            <div className={styles.image}>
              <img
                   src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)}
                alt="Preview"
                width={40}
                height={40}
              />
            </div>
          )}

          {/* BANNER UPLOAD */}
          <label htmlFor="banner">BANNER</label>
          <input type="file" name="banner" accept=".jpg,.png,.jpeg" onChange={handleChange} />
          <small>Only jpg, jpeg, png. 300x200. Max: 2MB</small>
          {formData.banner && (
            <div className={styles.image}>
              <img
                 src={typeof formData.banner === 'string' ? formData.banner : URL.createObjectURL(formData.banner)}
                alt="Preview"
                width={90}
              />
            </div>
          )}

          {/* PRICE & DISPLAY NUMBER */}
              <div className={styles.flexRow}>
          <div className={styles.flex1}>
            <label htmlFor="price">PRICE</label>
          <input
  id="price"
  type="text"
  name="price"
  value={formData.price}
  onChange={handleChange}
/>
          </div>

          <div className={styles.flex1}>
            <label htmlFor="displayNumber">DISPLAY NUMBER</label>
           <input
  id="displayNumber"
  type="text"
  name="displayNumber"
  value={formData.displayNumber}
  onChange={handleChange}
/>
          </div>
        </div>
            <button type="button" className={styles.buttonAddPrice}>
              Add Price
            </button>
          

          {/* DURATION */}
          <div className={styles.flexRow}>
            <div className={styles.flex1}>
              <label htmlFor="hours">HOURS</label>
              <select
                name="hours"
                value={formData.hours}
                onChange={handleChange}
              >
                <option value="">Select Hours</option>
                {[...Array(24).keys()].map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.flex1}>
              <label htmlFor="minutes">MINUTES</label>
              <select
                name="minutes"
                value={formData.minutes}
                onChange={handleChange}
              >
                <option value="">Select Minutes</option>
                {[...Array(60).keys()].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DESCRIPTION EDITOR */}
          <div className={styles.flex1}>
            <label htmlFor="description">DESCRIPTION</label>
            {mounted && (
              <JoditEditor
                ref={descriptionEditor}
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
                onBlur={(newContent) => setDescription(newContent)}
              />
            )}
            <small className={styles.note}>Max file size allowed: 500Kb.</small>
          </div>

          {/* LONG DESCRIPTION EDITOR */}
          <div className={styles.flex1}>
            <label htmlFor="longDescription">LONG DESCRIPTION</label>
            {mounted && (
              <JoditEditor
                ref={longDescriptionEditor}
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
                onBlur={(newContent) => setLongDescription(newContent)}
              />
            )}
            <small className={styles.note}>Max file size allowed: 500Kb.</small>
          </div>

          {/* SUBMIT BUTTON */}
         
  <button type="submit" className={styles.submitButton}>
    Update
  </button>
        </form>
      </div>
      </div>
    </Layout>
  );  
}
