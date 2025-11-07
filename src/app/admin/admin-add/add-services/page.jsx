  'use client';

  import { useState, useRef, useEffect } from 'react';
  import styles from '../../styles/services.module.css';
  import Layout from "../../pages/page";
  import 'react-quill/dist/quill.snow.css';
  import dynamic from 'next/dynamic';
  import { getCategoriesWithSubcategories,createService } from '../../../api/admin-service/category-list';
import usePopup from "../../components/popup"
import PopupAlert from "../../components/PopupAlert";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";
  const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false,
  }); 

  export default function AddServices() {
  const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
      const [category, setCategory] = useState('');
        const [subCategory, setSubCategory] = useState('');
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState(null);
    const [banner, setBanner] = useState(null);
    const [multiMedia, setMultiMedia] = useState(null);
    const [price, setPrice] = useState('');
    const [displayNumber, setDisplayNumber] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [mounted, setMounted] = useState(false);
const { popupMessage, popupType, showPopup } = usePopup();

  const editor = useRef(null);
    

    const handleIconChange = (e) => {
      setIcon(e.target.files[0]);
    };

    const handleBannerChange = (e) => {
      setBanner(e.target.files[0]);
    };

    const handleMultiMediaChange = (e) => {
      setMultiMedia(e.target.files);
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1️⃣ Declare formData first
    const formData = new FormData();

    // 2️⃣ Helper to pad hours/minutes
    const pad = (num) => String(num).padStart(2, '0');
    const duration = hours && minutes ? `${pad(hours)}:${pad(minutes)}` : '';

    // 3️⃣ Append fields
    formData.append('title', title);
    formData.append('category_id', category);
    formData.append('sub_category_id', subCategory);
    formData.append('description', description);
    formData.append('long_description', longDescription);
    formData.append('price', price);
    formData.append('duration', duration);
    
    if (icon) formData.append('image', icon);
    if (banner) formData.append('banner', banner);
   
    // 4️⃣ Send to API
    const response = await createService(formData);

    showPopup('Service created successfully!');

    console.log('Created service:', response);

  } catch (err) {
    showPopup('Error creating service: ' + err.message);
    console.error(err);
  }
};
 
  useEffect(() => {
    setMounted(true);
    fetchCategories(); // fetch categories on mount
  }, []);

  const fetchCategories = async () => {
    try {
      const cats = await getCategoriesWithSubcategories();
      setCategories(cats);
    } catch (error) {
      showPopup.error("Error fetching categories:", error);
  
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId);
    setSubCategory('');

    if (!selectedCategoryId) {
      setSubCategories([]);
      return;
    }

    const categoryObj = categories.find(cat => cat.id === parseInt(selectedCategoryId));
  setSubCategories(categoryObj?.subcategories || []);
  };
      const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/services"); // Customer page
  };
  
    return (
      <Layout>
               <PopupAlert message={popupMessage} type={popupType} />
        
      <div className={styles.addcontainer}>
         <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}
             style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Service</span> 
          <span className={styles.separator}> | </span>
               <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
           <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Add Service</span>
          </div>
        </div>
       

        <form onSubmit={handleSubmit} className={styles.addform}>
           <h2>Add Services</h2>
    <label htmlFor="category">CATEGORY</label>
  <select id="category" value={category} onChange={handleCategoryChange}>
    <option value="">Select Category</option>
  {categories.map(cat => (
    <option key={cat.id} value={cat.id}>{cat.title}</option>
  ))}
  </select>

  <label htmlFor="subCategory">SUB CATEGORY</label>
  <select
    id="subCategory"
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    disabled={!category}
  >
    <option value="">Select Sub Category</option>
  {subCategories.map(sub => (
    <option key={sub.id} value={sub.id}>{sub.title}</option>
  ))}
  </select>

          <label htmlFor="title">TITLE</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="icon">ICON</label>
          <input
            id="icon"
            type="file"
            accept=".svg"
            onChange={handleIconChange}
          />
          <small>
            Only allowed png format. Image resolution must be 64*64. Max file size allowed : 2MB
          </small>

          <label htmlFor="banner">BANNER</label>
          <input
            id="banner"
            type="file"
            accept=".jpg"
            onChange={handleBannerChange}
          />
          <small>
            Only allowed jpg, png, jpeg format. Image resolution must be 300*200. Max file size allowed : 2MB
          </small>

        

          <div className={styles.flexRow}>
            <div className={styles.flex1}>
              <label htmlFor="price">PRICE</label>
              <input
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className={styles.flex1}>
              <label htmlFor="displayNumber">DISPLAY NUMBER</label>
              <input
                id="displayNumber"
                type="text"
                value={displayNumber}
                onChange={(e) => setDisplayNumber(e.target.value)}
              />
            </div>
          </div>

          <button type="button" className={styles.buttonAddPrice}>
            Add Price
          </button>

          <div className={styles.flexRowGap20}>
            <div className={styles.flex1}>
              <label htmlFor="hours">HOURS</label>
              <select
                id="hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              >
                <option value="">Select Hours</option>
                {[...Array(24).keys()].map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.flex1}>
              <label htmlFor="minutes">MINUTE</label>
              <select
                id="minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              >
                <option value="">Select Minute</option>
                {[...Array(60).keys()].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
                <div className={styles.flex1}>
      <label htmlFor="description">DESCRIPTION</label>
      {mounted && (
        <JoditEditor
          ref={editor}
          value={description}
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
          tabIndex={1}
          onBlur={newContent => setDescription(newContent)}
        />
      )}
      <small className={styles.note}>Max file size allowed : 500Kb.</small>
    </div>

    <div className={styles.flex1}>
      <label htmlFor="longDescription">LONG DESCRIPTION</label>
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
          onBlur={newContent => setLongDescription(newContent)}
        />
      )}
      <small className={styles.note}>Max file size allowed : 500Kb.</small>
    </div>

    <button type="submit" className={styles.submitButton}>
      SUBMIT
    </button>
          
        </form>
      </div>
      </Layout>
    );
  }
