'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../styles/SubCategories.module.css';
import Layout from '../pages/page';
import { updateSubCategory } from '../../api/admin-category/sub-category';

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

  // Load initial data from URL
  useEffect(() => {
    if (titleFromURL) setTitle(decodeURIComponent(titleFromURL));
    if (logoFromURL) setLogoUrl(logoFromURL.startsWith('http') ? logoFromURL : decodeURIComponent(logoFromURL));
    if (categoryFromURL) setCategoryId(categoryFromURL);
  }, [titleFromURL, logoFromURL, categoryFromURL]);

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
  data.append('category_id', Number(categoryId));
  if (logoFile) data.append('logo', logoFile);

  try {
    const res = await updateSubCategory(Number(idFromURL), data); // 👈 ensure ID is number
    console.log('API response:', res); // debug
    if (res.success) {
      alert('Sub Category updated successfully!');
      router.push('/admin/sub-categories'); // go back to list
    } else {
      alert(res.message || 'Update failed!');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong!');
  }
};


  return (
    <Layout>
      <div className={styles.editcontainer}>
        <div className={styles.editheader}>
          <span className={styles.editbreadcrumb}>Sub Category</span> &gt;{' '}
          <span className={styles.editbreadcrumbActive}>Edit Sub Category</span>
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
              value={categoryId}
              onChange={handleCategoryChange}
              className={styles.editinput}
              required
            >
              <option value="">Select Category</option>
              <option value="20">NAIL Studio</option>
              <option value="20">AC Service</option>
              <option value="20">Spa For Women</option>
              <option value="20">Sofa Cleaning</option>
              <option value="20">Women Beauty Care</option>
              <option value="20">R O Water Purifier</option>
              <option value="20">Cleaning & Disinfection</option>
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
