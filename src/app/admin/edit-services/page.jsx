'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/services.module.css';
import Layout from '../pages/page';
import { getCategoriesWithSubcategories ,updateService} from '../../api/admin-service/category-list';

import { useRouter, useSearchParams } from 'next/navigation';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditService() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service_id");

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    async function fetchData() {
      const cats = await getCategoriesWithSubcategories();
      setCategories(cats);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formattedHours = formData.hours ? String(formData.hours).padStart(2, "0") : "00";
  const formattedMinutes = formData.minutes ? String(formData.minutes).padStart(2, "0") : "00";

  const payload = new FormData();
  payload.append("title", formData.title);
  payload.append("description", description);
  payload.append("long_description", longDescription);
  payload.append("category_id", Number(formData.category_id));
  payload.append("sub_category_id", Number(formData.sub_category_id));
  payload.append("price", Number(formData.price));
  payload.append("display_number", formData.displayNumber);
  payload.append("duration", `${formattedHours}:${formattedMinutes}`);

  // ✅ If new image selected → send File  
  // ✅ Else → send existing image path from DB
  payload.append("image", formData.image instanceof File ? formData.image : formData.image);
  payload.append("banner", formData.banner instanceof File ? formData.banner : formData.banner);

  const res = await updateService(serviceId, payload);

  if (res.success) {
    alert("✅ Service updated successfully!");
    router.push("/admin/services");
  } else {
    console.error(res);
    alert("❌ " + JSON.stringify(res.message));
  }
};


  return (
    <Layout>
      <div className={styles.addcontainer}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Best Service</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Edit</span>
          </div>
        </div>

        <div className={styles.addcard}>
          <h2>Edit Services</h2>

          <form onSubmit={handleSubmit}>
            
            {/* CATEGORY */}
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>

            {/* SUB CATEGORY */}
            <label>SUB CATEGORY</label>
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

            {/* TITLE */}
            <label>TITLE</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />

            {/* IMAGE */}
            <label>IMAGE</label>
            <input type="file" name="image" accept=".svg" onChange={handleChange} />

            {/* BANNER */}
            <label>BANNER</label>
            <input type="file" name="banner" accept=".jpg,.png,.jpeg" onChange={handleChange} />

            {/* PRICE | DISPLAY NUMBER */}
            <div className={styles.flexRow}>
              <div className={styles.flex1}>
                <label>PRICE</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} />
              </div>

              <div className={styles.flex1}>
                <label>DISPLAY NUMBER</label>
                <input type="text" name="displayNumber" value={formData.displayNumber} onChange={handleChange} />
              </div>
            </div>

            {/* DURATION */}
            <div className={styles.flexRow}>
              <div className={styles.flex1}>
                <label>HOURS</label>
                <select name="hours" value={formData.hours} onChange={handleChange}>
                  <option value="">Hours</option>
                  {[...Array(24).keys()].map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div className={styles.flex1}>
                <label>MINUTES</label>
                <select name="minutes" value={formData.minutes} onChange={handleChange}>
                  <option value="">Minutes</option>
                  {[...Array(60).keys()].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* DESCRIPTION */}
            <label>DESCRIPTION</label>
            <JoditEditor value={description} onBlur={setDescription} />

            {/* LONG DESCRIPTION */}
            <label>LONG DESCRIPTION</label>
            <JoditEditor value={longDescription} onBlur={setLongDescription} />

            {/* SUBMIT */}
            <button type="submit" className={styles.submitButton}>
              Update
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
}
