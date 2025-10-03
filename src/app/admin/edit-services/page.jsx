'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/services.module.css';
import Layout from '../pages/page';
import { updateService } from '../../api/admin-service/category-list';
import { useRouter } from 'next/navigation';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditService({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    sub_category_id: params?.sub_category_id || '',
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
  const [loading, setLoading] = useState(false);

  const descriptionEditor = useRef(null);
  const longDescriptionEditor = useRef(null);

  // No API fetch on mount
  useEffect(() => setMounted(true), []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit updated service
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.sub_category_id) {
    alert("Sub Category ID missing. Cannot update.");
    return;
  }

  try {
    setLoading(true);

    const convertToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
      });

    const payload = {
      title: formData.title,
      description,
      long_description: longDescription,
      category_id: Number(formData.category_id),
      sub_category_id: Number(formData.sub_category_id), // <-- main id
      price: Number(formData.price),
      duration: `${formData.hours || 0} Hour ${formData.minutes || 0} Minute`,
      image: formData.image instanceof File ? await convertToBase64(formData.image) : formData.image,
      banner: formData.banner instanceof File ? await convertToBase64(formData.banner) : formData.banner,
    };

    // 🔥 API call with sub_category_id as path param
    const result = await updateService(formData.sub_category_id, payload);

    if (result.success) {
      alert("Service updated successfully!");
      router.push("/admin/services");
    } else {
      alert("Failed to update service: " + (result.message || "Unknown error"));
    }
  } catch (err) {
    console.error(err);
    alert("Error occurred while updating the service.");
  } finally {
    setLoading(false);
  }
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
            {mounted && (
              <select name="category_id" value={formData.category_id ?? ""} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="1">Women Beauty Care</option>
                <option value="2">AC Service</option>
              </select>
            )}

            {/* SUB CATEGORY */}
            {mounted && (
              <>
                <label>SUB CATEGORY</label>
                <select name="sub_category_id" value={formData.sub_category_id} onChange={handleChange}>
                  <option value="">Select Sub Category</option>
                  <option value="10">Special Packages</option>
                  <option value="11">Facial</option>
                  <option value="12">Split AC</option>
                </select>
              </>
            )}

            {/* TITLE */}
            {mounted && (
              <>
                <label>TITLE</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
              </>
            )}

            {/* IMAGE */}
            {mounted && (
              <>
                <label>IMAGE</label>
                <input type="file" name="image" accept=".svg" onChange={handleChange} />
                {formData.image && (
                  <img
                    src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)}
                    width={40}
                    height={40}
                    alt="Preview"
                  />
                )}
              </>
            )}

            {/* BANNER */}
            {mounted && (
              <>
                <label>BANNER</label>
                <input type="file" name="banner" accept=".jpg,.png,.jpeg" onChange={handleChange} />
                {formData.banner && (
                  <img
                    src={typeof formData.banner === 'string' ? formData.banner : URL.createObjectURL(formData.banner)}
                    width={90}
                    alt="Preview"
                  />
                )}
              </>
            )}

            {/* PRICE & DISPLAY NUMBER */}
            <div className={styles.flexRow}>
              {mounted && (
                <div className={styles.flex1}>
                  <label htmlFor="price">PRICE</label>
                  <input type="text" name="price" value={formData.price} onChange={handleChange} />
                </div>
              )}
              {mounted && (
                <div className={styles.flex1}>
                  <label htmlFor="displayNumber">DISPLAY NUMBER</label>
                  <input type="text" name="displayNumber" value={formData.displayNumber} onChange={handleChange} />
                </div>
              )}
            </div>

            {/* DURATION */}
            <div className={styles.flexRow}>
              {mounted && (
                <div className={styles.flex1}>
                  <label htmlFor="hours">HOURS</label>
                  <select name="hours" value={formData.hours} onChange={handleChange}>
                    <option value="">Select Hours</option>
                    {[...Array(24).keys()].map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              )}
              {mounted && (
                <div className={styles.flex1}>
                  <label htmlFor="minutes">MINUTES</label>
                  <select name="minutes" value={formData.minutes} onChange={handleChange}>
                    <option value="">Select Minutes</option>
                    {[...Array(60).keys()].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              )}
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
          
    <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
        </div>
      </Layout>
    );  
  }
