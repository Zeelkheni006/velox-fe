'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from "../styles/bestservice.module.css";
import Layout from '../pages/page'; 

export default function AddSubCategory() {
  const searchParams = useSearchParams();

  // Prefill best service if coming from edit
const bestServiceFromURL = searchParams.get('best-service') || '';
const [formData, setFormData] = useState({
  bestservice: '', // important: start as empty string
  logo: null,
});
useEffect(() => {
  if (bestServiceFromURL) {
    setFormData(prev => ({ ...prev, bestservice: bestServiceFromURL }));
  }
}, [bestServiceFromURL]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Best service submitted!');
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
                <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Best Service</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Edit BestService</span>
          </div>
        </div>

        <div className={styles.addcard}>
          <h3>Edit Best Services</h3>
          <form className={styles.addform} onSubmit={handleSubmit}>
            <label>Services</label>
            <select
              name="bestservice"   // must match state field
              value={formData.bestservice} // must match state field
              onChange={handleChange}
              className={styles.addinput}
              required
            >
              <option value="">Select Best Service</option>
              <option value="Velox AC Care+ Plan">Velox AC Care+ Plan</option>
              <option value="Velox FreshGuard Home Plan">Velox FreshGuard Home Plan</option>
              <option value="Velox CoolCare AMC Plan">Velox CoolCare AMC Plan</option>
              <option value="Oven Cleaning">Velox CoolCare AMC Plan</option>
              <option value="6 Panel cleaning">Velox FreshGuard Home Plan</option>
              <option value="9 Panel cleaning">9 Panel cleaning</option>
              <option value="12 Panel cleaning">12 Panel cleaning</option>
            </select>

            <button type="submit" className={styles.submitBtn}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
