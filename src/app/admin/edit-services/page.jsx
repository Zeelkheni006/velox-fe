'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/services.module.css';
import Layout from '../pages/page';
import { updateService, getCategoriesWithSubcategories } from '../../api/admin-service/category-list';
import { useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; 
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
  const [popupMessage, setPopupMessage] = useState("");
const [popupType, setPopupType] = useState(""); 
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
    if (titleFromURL) setTitle(titleFromURL);
    if (logoFromURL) setLogoUrl(logoFromURL);
    if (descriptionFromURL) {
      setDescription(descriptionFromURL);
      setLongDescription(descriptionFromURL);
    } else if (titleFromURL) {
      const defaultDesc = `${titleFromURL} By Velox`;
      setDescription(defaultDesc);
      setLongDescription(defaultDesc);
    }
  }, [titleFromURL, logoFromURL, descriptionFromURL]);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml') {
      alert('❌ Only SVG files are allowed!');
      e.target.value = null;
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB
      alert('❌ File size exceeds 2MB!');
      e.target.value = null;
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (logoFile) formData.append("logo", logoFile);

      const res = await updateService(formData.id, payload);

 
    if (!res.success) {
      const messages = Object.values(res.message).flat().join("\n");
      setPopupMessage("❌ Failed to update category:\n" + messages);
      setPopupType("error");
      return;
    }

    setPopupMessage("✅ Category Updated Successfully!");
      setPopupType("success");
  } catch (err) {
    console.error("Update Error:", err);
    setPopupMessage("❌ Unexpected error: " + err.message);
    setPopupType("error");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
  if (!popupMessage) return;

  const timer = setTimeout(() => {
    setPopupType(prev => prev + " hide");
    setTimeout(() => {
      setPopupMessage("");
      setPopupType("");
    }, 400);
  }, 4000);

  return () => clearTimeout(timer);
}, [popupMessage]);


  return (
    <Layout>
      <div className={styles.addcontainer}>
           <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Best Service</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Best Service</span>
          </div>
        </div>

        <div className={styles.addcard}>
          <h2>Edit Services</h2>
            {popupMessage && (
                      <div className={`${styles["email-popup"]} ${styles[popupType]} ${styles.show} flex items-center gap-2`}>
                        {popupType.startsWith("success") ? 
                          <AiOutlineCheckCircle className="text-green-500 text-lg"/> : 
                          <AiOutlineCloseCircle className="text-red-500 text-lg"/>}
                        <span>{popupMessage.replace(/^✅ |^❌ /,"")}</span>
                      </div>
                    )}
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
