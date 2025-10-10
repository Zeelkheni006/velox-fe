"use client"
import { useState, useRef, useEffect } from 'react';  
import styles from '../../styles/Categories.module.css';
import Layout from "../../pages/page";
import dynamic from 'next/dynamic';
import { createCategory } from "../../../api/admin-category/category"; 
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // ✅ Import icons

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function AddCategory() {
  const [formData, setFormData] = useState({ title: '', logo: null });
  const [description, setDescription] = useState('');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); 
  const [popupType, setPopupType] = useState(""); 
  const editor = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const result = await createCategory({
      title: formData.title,
      logo: formData.logo,
      description
    });

    if(result.success){
      setPopupMessage("✅ Category created successfully!");
      setPopupType("success");

      // Reset form
      setFormData({ title: '', logo: null });
      setDescription('');
    } else {
      setPopupMessage(`❌ ${result.message}`);
      setPopupType("error");
    }

  } catch (err) {
    setPopupMessage("❌ Something went wrong while creating category.");
    setPopupType("error");
  } finally {
    setLoading(false);
  }
};



  useEffect(() => setMounted(true), []);

  // Popup auto-hide
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
          <span className={styles.breadcrumb}>Category</span> &gt;{" "}
          <span className={styles.breadcrumbActive}>Add Category</span>
        </div>
</div>
        <div className={styles.addcard}>
          <h2 className={styles.addheading}>Add Category</h2>

          {/* Popup */}
{popupMessage && (
  <div className={`${styles["email-popup"]} ${styles[popupType]} ${styles.show} flex items-center gap-2`}>
    {popupType.startsWith("success") ? 
      <AiOutlineCheckCircle className="text-green-500 text-lg"/> : 
      <AiOutlineCloseCircle className="text-red-500 text-lg"/>}
    <span>{popupMessage.replace(/^✅ |^❌ /,"")}</span>
  </div>
)}


          <form className={styles.addform} onSubmit={handleSubmit}>
            <label className={styles.addlabel}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.addinput}
              required
            />

            <label className={styles.addlabel}>Logo</label>
            <input
              type="file"
              name="logo"
              accept=".svg"
              onChange={handleChange}
              className={styles.addinput}
              required
            />
            <p className={styles.addnote}>
              Only PNG format. Resolution: 64×64. Max size: 2MB
            </p>

            <div className={styles.flex1}>
              <label>Description</label>
              {mounted && (
                <JoditEditor
                  ref={editor}
                  value={description}
                  config={{
                    readonly: false,
                    height: 200,
                    toolbarSticky: false
                  }}
                  tabIndex={1}
                  onBlur={newContent => setDescription(newContent)}
                />
              )}
              <small className={styles.note}>Max file size allowed: 500Kb.</small>
            </div>

            <button type="submit" className={styles.addsubmitButton} disabled={loading}>
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
