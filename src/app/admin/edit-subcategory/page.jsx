'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../styles/SubCategories.module.css';
import Layout from '../pages/page';
import { updateSubCategory } from '../../api/admin-category/sub-category';
import { getCategories } from '../../api/admin-category/sub-category';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // ✅ Import icons

export default function EditCategory() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idFromURL = searchParams.get('id');
  const titleFromURL = searchParams.get('title');
  const logoFromURL = searchParams.get('logo');
  const categoryFromURL = searchParams.get('category');
  

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState('/icon/default.svg');
    const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); 
  const [mounted, setMounted] = useState(false);

  // Load initial data from URL
  useEffect(() => {
    if (titleFromURL) setTitle(decodeURIComponent(titleFromURL));
    if (logoFromURL) setLogoUrl(logoFromURL.startsWith('http') ? logoFromURL : decodeURIComponent(logoFromURL));
     if (categoryFromURL) setCategoryId(categoryFromURL);
  }, [titleFromURL, logoFromURL, categoryFromURL]);


const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    const res = await getCategories();
    if (res.success) setCategories(res.data || []);
  };

  fetchCategories();
}, []);

  // Handle logo file change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'image/svg+xml') {
      alert('Only SVG files are allowed!');
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // Handle category change
  const handleCategoryChange = (e) => setCategoryId(e.target.value);

  // Submit form
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !categoryId) {
    alert('Please fill all required fields!');
    return;
  }

  const data = new FormData();
  data.append('title', title);
data.append('category_id', categoryId);
  if (logoFile) data.append('logo', logoFile);

  try {
    const res = await updateSubCategory(Number(idFromURL), data); // 👈 ensure ID is number
    console.log('API response:', res); // debug
    if (res.success) {
      setPopupMessage('Sub Category updated successfully!');
      setPopupType("success")
      router.push('/admin/sub-categories'); // go back to list
    } else {
      setPopupMessage(res.message || 'Update failed!');
      setPopupType("error")
    }
  } catch (err) {
    console.error(err);
    setPopupMessage('Something went wrong!');
    setPopupType("error")
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
      <div className={styles.editcontainer}>
            <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Sub Category</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Edit Subcategory</span>
          </div>
        </div>

        <div className={styles.editcard}>
          <h2>Edit Sub Category</h2>
            {popupMessage && (
                      <div className={`${styles["email-popup"]} ${styles[popupType]} ${styles.show} flex items-center gap-2`}>
                        {popupType.startsWith("success") ? 
                          <AiOutlineCheckCircle className="text-green-500 text-lg"/> : 
                          <AiOutlineCloseCircle className="text-red-500 text-lg"/>}
                        <span>{popupMessage.replace(/^✅ |^❌ /,"")}</span>
                      </div>
                    )}
          <form onSubmit={handleSubmit}>
            <label className={styles.editlabel}>TITLE</label>
            <input
              type="text"
              className={styles.editinput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

<label className={styles.editlabel}>CATEGORY</label>
<select
  name="category_id"
  value={categoryId}            // ✅ use categoryId state
  onChange={(e) => setCategoryId(e.target.value)} // ✅ update categoryId state
  className={styles.editinput}
  required
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.title}
    </option>
  ))}
</select>

            <label className={styles.editlabel}>LOGO (SVG only)</label>
            <input
              type="file"
              className={styles.editinput}
              accept="image/svg+xml"
              onChange={handleLogoChange}
            />
            <p className={styles.edithint}>
              Only allowed <b>SVG</b> format. Max file size: 2MB
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

            <button type="submit" className={styles.editupdateBtn}>
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
