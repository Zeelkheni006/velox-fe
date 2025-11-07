'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../styles/SubCategories.module.css';
import Layout from '../pages/page';
import { updateSubCategory } from '../../api/admin-category/sub-category';
import { getCategories } from '../../api/admin-category/sub-category';
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { SlHome } from "react-icons/sl";
export default function EditCategory() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idFromURL = searchParams.get('id');
  const titleFromURL = searchParams.get('title');
  const logoFromURL = searchParams.get('logo');
  const categoryFromURL = searchParams.get('category');
  const { popupMessage, popupType, showPopup } = usePopup();
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState('/icon/default.svg');
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
      showPopup('Only SVG files are allowed!');
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
    showPopup('Please fill all required fields!');
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
      showPopup('Sub Category updated successfully!');
    
      router.push('/admin/sub-categories'); // go back to list
    } else {
      showPopup(res.message || 'Update failed!');
     
    }
  } catch (err) {
    console.error(err);
    showPopup('Something went wrong!');
   
  }
};
 useEffect(() => {
    setMounted(true);
  }, []);

        const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/sub-categories"); // Customer page
  };

  return (
    <Layout>
             <PopupAlert message={popupMessage} type={popupType} />
      
      <div className={styles.editcontainer}>
            <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}
             style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Sub Category</span> 
        <span className={styles.separator}> | </span>
         <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
                    <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Edit Subcategory</span>
          </div>
        </div>

        <div className={styles.editcard}>
          <h2>Edit Sub Category</h2>
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
