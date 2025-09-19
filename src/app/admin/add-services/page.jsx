'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '../styles/services.module.css';
import Layout from "../pages/page";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
 const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
}); 

export default function AddServices() {

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState(null);
  const [banner, setBanner] = useState(null);
  const [multiMedia, setMultiMedia] = useState(null);
  const [price, setPrice] = useState('');
  const [displayNumber, setDisplayNumber] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [description, setDescription] = useState('');
const [longDescription, setLongDescription] = useState('');
const [mounted, setMounted] = useState(false);
 const editor = useRef(null);
  

  const handleIconChange = (e) => {
    setIcon(e.target.files[0]);
  };

  const handleBannerChange = (e) => {
    setBanner(e.target.files[0]);
  };

  const handleMultiMediaChange = (e) => {
    setMultiMedia(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Service Added');
  };


  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <Layout>
    <div className={styles.addcontainer}>
          <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Services</span> &gt;{' '}
          <span className={styles.addbreadcrumb}>Services</span> &gt;{' '}
          <span className={styles.addbreadcrumbActive}>Add Services</span>
        </div>
      <h2>Add Services</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="category">CATEGORY</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {/* Add category options here */}
        </select>

        <label htmlFor="subCategory">SUB CATEGORY</label>
        <select
          id="subCategory"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option value="">Select Sub Category</option>
          {/* Add subcategory options here */}
        </select>

        <label htmlFor="title">TITLE</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="icon">ICON</label>
        <input
          id="icon"
          type="file"
          accept=".png"
          onChange={handleIconChange}
        />
        <small>
          Only allowed png format. Image resolution must be 64*64. Max file size allowed : 2MB
        </small>

        <label htmlFor="banner">BANNER</label>
        <input
          id="banner"
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={handleBannerChange}
        />
        <small>
          Only allowed jpg, png, jpeg format. Image resolution must be 300*200. Max file size allowed : 2MB
        </small>

        <label htmlFor="multiMedia">MULTI MEDIA</label>
        <input
          id="multiMedia"
          type="file"
          accept=".jpg,.png,.jpeg,.mp4"
          multiple
          onChange={handleMultiMediaChange}
        />
        <small>
          Only allowed jpg, png, jpeg, mp4 format. Image resolution must be 300*200
        </small>

        <div className={styles.flexRow}>
          <div className={styles.flex1}>
            <label htmlFor="price">PRICE</label>
            <input
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className={styles.flex1}>
            <label htmlFor="displayNumber">DISPLAY NUMBER</label>
            <input
              id="displayNumber"
              type="text"
              value={displayNumber}
              onChange={(e) => setDisplayNumber(e.target.value)}
            />
          </div>
        </div>

        <button type="button" className={styles.buttonAddPrice}>
          Add Price
        </button>

        <div className={styles.flexRowGap20}>
          <div className={styles.flex1}>
            <label htmlFor="hours">HOURS</label>
            <select
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
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
            <label htmlFor="minutes">MINUTE</label>
            <select
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              <option value="">Select Minute</option>
              {[...Array(60).keys()].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
              <div className={styles.flex1}>
    <label htmlFor="description">DESCRIPTION</label>
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

  <div className={styles.flex1}>
    <label htmlFor="longDescription">LONG DESCRIPTION</label>
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
        onBlur={newContent => setLongDescription(newContent)}
      />
    )}
    <small className={styles.note}>Max file size allowed : 500Kb.</small>
  </div>

  <button type="submit" className={styles.submitButton}>
    SUBMIT
  </button>
        
      </form>
    </div>
    </Layout>
  );
}
