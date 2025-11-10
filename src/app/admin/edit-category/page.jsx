'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Categories.module.css';
import Layout from '../pages/page';
import dynamic from 'next/dynamic';
import { updateCategory } from '../../api/admin-category/category';
import usePopup from "../components/popup";
import PopupAlert from "../components/PopupAlert";
import { SlHome } from "react-icons/sl";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { popupMessage, popupType, showPopup } = usePopup();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);

  const [category, setCategory] = useState({
    id: "",
    title: "",
    logo: "",
    description: "",
    status: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // ✅ Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("editCategoryData");
    if (!stored) return;

    const cat = JSON.parse(stored);
    setCategory({
      id: cat.id,
      title: cat.title || "",
      logo: cat.logo || "",
      description: cat.description || "",
      status: cat.status || "INACTIVE",
    });
    setLogoPreview(cat.logo ? process.env.NEXT_PUBLIC_API_BASE_URL + cat.logo : null);
  }, [id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Only SVG upload Allow & Preview
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "image/svg+xml") {
      showPopup("❌ Only SVG format allowed!", "error");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showPopup("❌ Max file size 2MB allowed!", "error");
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // ✅ Update Category Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("title", category.title);
      payload.append("description", category.description);

      if (logoFile) payload.append("logo", logoFile);

      const res = await updateCategory(category.id, payload);

      if (res.success) {
        showPopup("✅ Category Updated!", "success");
        localStorage.removeItem("editCategoryData");

        setTimeout(() => router.push("/admin/categories"), 700);
      } else {
        showPopup("❌ Update Failed!", "error");
      }
    } catch (err) {
      console.log(err);
      showPopup("❌ Something went wrong!", "error");
    }

    setLoading(false);
  };

  const goBack = () => {
    router.push("/admin/categories");
  };

  const goToDashboard = () => {
    router.push("/admin/dashboard");
  };

  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />

      <div className={styles.editcontainer}>
        <div className={styles.headerContainer}>
          <div>
          <span className={styles.breadcrumb} onClick={goBack} style={{ cursor: "pointer" }}>
            Category
          </span>
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
              value={category.title}
              onChange={(e) => setCategory({ ...category, title: e.target.value })}
              required
            />

            {/* LOGO */}
            <label className={styles.editlabel}>LOGO</label>
            <input
              type="file"
              className={styles.editinput}
              accept="image/svg+xml"
              onChange={handleLogoChange}
            />

            {logoPreview && (
              <div className={styles.editimagePreview}>
                <img src={logoPreview} width={64} height={64} alt="Preview" />
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
              value={category.description}
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
