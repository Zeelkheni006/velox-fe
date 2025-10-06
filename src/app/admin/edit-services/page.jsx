'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/services.module.css';
import Layout from '../pages/page';
import { updateService, getCategoriesWithSubcategories } from '../../api/admin-service/category-list';
import { useRouter, useSearchParams } from 'next/navigation';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditService() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceId = searchParams.get('service_id');

  const [formData, setFormData] = useState({
    id: serviceId || '',
    title: '',
    category_id: '',
    sub_category_id: '',
    price: '',
    displayNumber: '',
    image: null,
    banner: null,
    hours: '',
    minutes: '',
  });

  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

const subCategoryId = searchParams.get('sub_category_id');
  const descriptionEditor = useRef(null);
  const longDescriptionEditor = useRef(null);

  // Load categories
  useEffect(() => {
    async function fetchCategories() {
      const cats = await getCategoriesWithSubcategories();
      setCategories(cats);
    }
    fetchCategories();
  }, []);

  // Pre-fill form from localStorage
  useEffect(() => {
    setMounted(true);
    const savedService = localStorage.getItem('selectedService');
    if (savedService) {
      const service = JSON.parse(savedService);
      setFormData({
        id: service.id || '',
        title: service.title || '',
        category_id: service.category_id || '',
        sub_category_id: service.sub_category_id || '',
        price: service.price || '',
        displayNumber: service.displayNumber || '',
        image: service.image || null,
        banner: service.banner || null,
        hours: service.duration ? service.duration.split(' ')[0] : '',
        minutes: service.duration ? service.duration.split(' ')[2] : '',
      });
      setDescription(service.description || '');
      setLongDescription(service.long_description || '');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear sub_category if category changes
      if(name === 'category_id') setFormData(prev => ({ ...prev, sub_category_id: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id) return alert('Service ID missing. Cannot update.');

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
        sub_category_id: Number(formData.sub_category_id),
        price: Number(formData.price),
        duration: `${formData.hours || 0} Hour ${formData.minutes || 0} Minute`,
        image: formData.image instanceof File ? await convertToBase64(formData.image) : formData.image,
        banner: formData.banner instanceof File ? await convertToBase64(formData.banner) : formData.banner,
      };

      const result = await updateService(formData.id, payload);

      if (result.success) {
        alert('Service updated successfully!');
          router.push('/admin/services?updated=true');
        router.refresh();
      } else {
        alert('Failed to update service: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while updating the service.');
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
              <select
                name="category_id"
                value={formData.category_id ?? ''}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            )}

            {/* SUB CATEGORY */}
            {mounted && (
              <> <label>SUB CATEGORY</label>
              <select
                name="sub_category_id"
                value={formData.sub_category_id}
                onChange={handleChange}
              >
                <option value="">Select Sub Category</option>
                {categories
                  .find(c => c.id === Number(formData.category_id))
                  ?.subcategories.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.title}</option>
                  ))}
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
                  <label>PRICE</label>
                  <input type="text" name="price" value={formData.price} onChange={handleChange} />
                </div>
              )}
              {mounted && (
                <div className={styles.flex1}>
                  <label>DISPLAY NUMBER</label>
                  <input type="text" name="displayNumber" value={formData.displayNumber} onChange={handleChange} />
                </div>
              )}
            </div>

            {/* DURATION */}
            <div className={styles.flexRow}>
              {mounted && (
                <div className={styles.flex1}>
                  <label>HOURS</label>
                  <select name="hours" value={formData.hours} onChange={handleChange}>
                    <option value="">Select Hours</option>
                    {[...Array(24).keys()].map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              )}
              {mounted && (
                <div className={styles.flex1}>
                  <label>MINUTES</label>
                  <select name="minutes" value={formData.minutes} onChange={handleChange}>
                    <option value="">Select Minutes</option>
                    {[...Array(60).keys()].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
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
                      'undo',
                      'redo',
                      '|',
                      'bold',
                      'italic',
                      'underline',
                      'strikethrough',
                      '|',
                      'backcolor',
                      '|',
                      'ul',
                      'ol',
                      '|',
                      'font',
                      'fontsize',
                      'brush',
                      '|',
                      'align',
                      '|',
                      'table',
                      'link',
                      'image',
                      'video',
                      '|',
                      'horizontalrule',
                      'source',
                      '|',
                      'help',
                    ],
                  }}
                  tabIndex={1}
                  onBlur={(newContent) => setDescription(newContent)}
                />
              )}
            </div>

            {/* LONG DESCRIPTION */}
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
                      'undo',
                      'redo',
                      '|',
                      'bold',
                      'italic',
                      'underline',
                      'strikethrough',
                      '|',
                      'backcolor',
                      '|',
                      'ul',
                      'ol',
                      '|',
                      'font',
                      'fontsize',
                      'brush',
                      '|',
                      'align',
                      '|',
                      'table',
                      'link',
                      'image',
                      'video',
                      '|',
                      'horizontalrule',
                      'source',
                      '|',
                      'help',
                    ],
                  }}
                  tabIndex={2}
                  onBlur={(newContent) => setLongDescription(newContent)}
                />
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
