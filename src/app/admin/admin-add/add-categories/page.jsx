"use client"
import { useState, useRef, useEffect } from 'react';  
import styles from '../../styles/Categories.module.css';
import Layout from "../../pages/page";
import dynamic from 'next/dynamic';
import { createCategory } from "../../../api/admin-category/category"; 
import usePopup from "../../components/popup"
import PopupAlert from "../../components/PopupAlert";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function AddCategory() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: '', logo: null });
  const [description, setDescription] = useState('');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
const { popupMessage, popupType, showPopup } = usePopup();
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
      showPopup("✅ Category created successfully!");
   

      // Reset form
      setFormData({ title: '', logo: null });
      setDescription('');
    } else {
      showPopup(`❌ ${result.message}`);
      
    }

  } catch (err) {
    showPopup("❌ Something went wrong while creating category.");
   
  } finally {
    setLoading(false);
  }
};



  useEffect(() => setMounted(true), []);

  // Popup auto-hide

  const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/categories"); // Customer page
  };
  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />
      <div className={styles.addcontainer}>
         <div className={styles.headerContainer}>
          <div>
          <span className={styles.breadcrumb}
            style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Category</span> 
        <span className={styles.separator}> | </span>
         <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
                  <span> &gt; </span>
          <span className={styles.breadcrumbActive}>Add Category</span>
        </div>
</div>
        <div className={styles.addcard}>
          <h2 className={styles.addheading}>Add Category</h2>

          {/* Popup */}



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
