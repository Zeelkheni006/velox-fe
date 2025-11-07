'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Categories.module.css';
import Layout from '../pages/page';
import dynamic from 'next/dynamic';
import { updateCategory } from '../../api/admin-category/category';
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditCategory() {
   const router = useRouter();
  const searchParams = useSearchParams();
  const titleFromURL = searchParams.get('title');
  const logoFromURL = searchParams.get('logo');
  const descriptionFromURL = searchParams.get('description');
    const categoryId = searchParams.get('id'); // fallback ID
const { popupMessage, popupType, showPopup } = usePopup();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState('/icon/default.svg');
  const [longDescription, setLongDescription] = useState('');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);


  const editor = useRef(null);

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

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml') {
      showPopup('❌ Only SVG files are allowed!');
      e.target.value = null;
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB
      showPopup('❌ File size exceeds 2MB!');
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

    // ✅ Use categoryId, not Id
    const res = await updateCategory(categoryId, formData);

    if (!res.success) {
      const messages = Object.values(res.message).flat().join("\n");
      showPopup("❌ Failed to update category:\n" + messages);
      
      return;
    }

    showPopup("✅ Category Updated Successfully!");
      
  } catch (err) {
    console.error("Update Error:", err);
    showPopup("❌ Unexpected error: " + err.message);
    
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    setMounted(true);
  }, []);


    const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/categories"); // Customer page
  };

  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />
      <div className={styles.editcontainer}>
                <div className={styles.headerContainer}>
          <div>
          <span className={styles.breadcrumb}    style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Category</span> 
        <span className={styles.separator}> | </span>
          <SlHome
                              style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                              onClick={goToDashboard}
                              title="Go to Dashboard"
                            />
                            <span> &gt; </span>
          <span className={styles.breadcrumbActive}>Edit Category</span>
        </div>
</div>

        <div className={styles.editcard}>
          <h3>Edit Category</h3>
       
          <form onSubmit={handleSubmit}>
            {/* TITLE */}
            <label className={styles.editlabel}>TITLE</label>
            <input
              type="text"
              className={styles.editinput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* LOGO */}
            <label className={styles.editlabel}>LOGO</label>
            <input
              type="file"
              className={styles.editinput}
              accept="image/svg+xml"
              onChange={handleLogoChange}
            />
            <p className={styles.edithint}>
              Only allowed SVG format. Image resolution must be 64x64. Max file size allowed: 2MB.
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

            {/* DESCRIPTION */}
            <div className={styles.flex1}>
              <label htmlFor="longDescription" className={styles.editlabel}>
                DESCRIPTION
              </label>
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
                  onBlur={(newContent) => {
                    setLongDescription(newContent);
                    setDescription(newContent);
                  }}
                />
              )}
            </div>

            <p className={styles.edithint}>Max file size allowed: 500Kb.</p>

            {/* BUTTON */}
            <button
              type="submit"
              className={styles.editupdateBtn}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'UPDATE'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
