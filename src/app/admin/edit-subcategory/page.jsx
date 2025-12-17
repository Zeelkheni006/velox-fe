'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../styles/SubCategories.module.css';
import Layout from '../pages/page';
import { updateSubCategory } from '../../api/admin-category/sub-category';
import { getCategories } from '../../api/admin-category/sub-category';
import usePopup from "../components/popup";
import PopupAlert from "../components/PopupAlert";
import { SlHome } from "react-icons/sl";

export default function EditCategory() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idFromURL = searchParams.get('id');
  const { popupMessage, popupType, showPopup } = usePopup();

  const [title, setTitle] = useState('');
  const [categoryId, setCategory] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  const [categories, setCategories] = useState([]);

  // ✅ Load subcategory data from localStorage
 useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem("editSubCategoryData"));

  if (!savedData) {
    showPopup("No edit data found!", "error");
    router.push("/admin/sub-categories");
    return;
  }

  setTitle(savedData.title || "");
  setCategory((savedData.category_title || "")); // ✅ IMPORTANT
  setLogoUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL}${savedData.logo}`);
}, []);


  // ✅ Fetch categories list
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      if (res.success) setCategories(res.data || []);
    };

    fetchCategories();
  }, []);

  // ✅ Handle logo change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml') {
      showPopup('Only SVG files are allowed!', "error");
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file)); // ✅ instant preview
  };

  // ✅ Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !categoryId) {
      showPopup('Please fill all required fields!', "error");
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('category_id', categoryId);
    if (logoFile) data.append('logo', logoFile);

    try {
      const res = await updateSubCategory(Number(idFromURL), data);

      if (res.success) {
        showPopup("✅ Sub Category Updated Successfully!", "success");
        localStorage.removeItem("editSubCategoryData"); // ✅ clean memory
        setTimeout(() => {
          router.push('/admin/sub-categories');
        }, 800);
      } else {
        showPopup(res.message || "Update failed!", "error");
      }
    } catch (err) {
      console.error(err);
      showPopup("Something went wrong!", "error");
    }
  };

  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />

      <div className={styles.editcontainer}>
        <div className={styles.headerContainer}>
          <div>
          <span onClick={() => router.push("/admin/sub-categories")}
            className={styles.breadcrumb}
            style={{ cursor: "pointer" }}
          >
            Sub Category
          </span>
          <span className={styles.separator}> | </span>
          <SlHome
            style={{ cursor: "pointer", margin: "0 5px" }}
            onClick={() => router.push("/admin/dashboard")}
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
  className={styles.editinput}
  value={categoryId}
  onChange={(e) => setCategory(e.target.value)}
  required
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={String(cat.id)}>
      {cat.title}
    </option>
  ))}
</select>


            <label className={styles.editlabel}>LOGO (SVG only)</label>
            <input
              type="file"
              accept="image/svg+xml"
              className={styles.editinput}
              onChange={handleLogoChange}
            />
            {(logoPreview || logoUrl) && (
              <div className={styles.editimagePreview}>
                <img
                  src={logoPreview || logoUrl}
                  alt="Logo Preview"
                  width={70}
                  height={70}
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
