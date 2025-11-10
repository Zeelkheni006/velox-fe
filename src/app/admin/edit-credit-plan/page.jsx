'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../pages/page';
import styles from '../styles/creditplan.module.css';
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";

// ✅ Dynamically import JoditEditor
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditCreditPlanPage() {
  const editor = useRef(null);
  const router = useRouter();

  // ✅ Form states
  const [plan, setPlan] = useState(null);
  const [validityType, setValidityType] = useState('Days');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
const [mounted, setMounted] = useState(false);
  // ✅ Load plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedCreditPlan');
    if (savedPlan) {
      const parsed = JSON.parse(savedPlan);
      setPlan(parsed);
      setDescription(parsed.description || '');
      if (parsed.validityType) setValidityType(parsed.validityType);
    }
  }, []);

  // ✅ Handle text and number changes
  const handleChange = (field, value) => {
    setPlan((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Handle image validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG, JPEG format allowed.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Max file size allowed: 2MB');
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width !== 300 || img.height !== 200) {
        alert('Image resolution must be 300x200');
      } else {
        setImage(file);
      }
    };
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPlan = {
      ...plan,
      validityType,
      description,
      image,
    };
    console.log('Updated Plan:', updatedPlan);
    alert('Credit Plan updated successfully!');
  };
 useEffect(() => {
    setMounted(true);
  }, []);
  if (!plan) {
    return (
      <Layout>
       
      </Layout>
    );
  }
   const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/credit-plan"); // Customer page
  };
  return (
    <Layout>
      <div className={styles.addcontainer}>
             {/* Breadcrumb */}
                <div className={styles.headerContainer}>
                 <div>
                                     <span className={styles.breadcrumb}style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Credit Plan</span>
             <span className={styles.separator}> | </span>
               <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
           <span> &gt; </span>
                                     <span className={styles.breadcrumbActive}>Edit Credit Plan</span>
                                   </div>
              
             </div>
     
            
      <div className="addcontent">
               <div className="addright">
             <form className={styles.addform} onSubmit={handleSubmit}>

              <h1 className={styles.addtitle}>Edit Credit Plan</h1>
          {/* Title */}
          <label>Title
          <input
            type="text"
            value={plan.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
</label>
          {/* Credit */}
          <label>Credit
          <input
            type="text"
            value={plan.credit || ''}
            onChange={(e) => handleChange('credit', e.target.value)}
            required
          />
</label>
          {/* Price */}
          <label>Price
          <input
            type="text"
            value={plan.price || ''}
            onChange={(e) => handleChange('price', e.target.value)}
            required
          />
</label>
          {/* Validity */}
          <label>Validity
          <input
            type="text"
            value={plan.validity || ''}
            onChange={(e) => handleChange('validity', e.target.value)}
            required
          />
</label>
          {/* Validity Type */}
          <label>Validity Type
          <select
            value={validityType}
            onChange={(e) => setValidityType(e.target.value)}
          >
            <option value="Days">Days</option>
            <option value="Months">Months</option>
          </select>
</label>
          {/* Image Upload */}
          <label>Image
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
          />
          </label>
          <span className={styles.note}>
            Only allowed jpg, png, jpeg format. Image resolution must be 300×200.
            Max file size allowed: 2MB
          </span>

          {/* Description */}
          <label>Description
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
        'ul', 'ol', '|',
        'link', 'image', 'video', '|',
        'align', '|',
        'source', '|',
        'help'
      ]
    }}
    tabIndex={1}
    onBlur={(newContent) => setDescription(newContent)}
  />
)}
</label>
          {/* Submit Button */}
          <button type="submit" className={styles.submitBtn}>
            Update
          </button>
        </form>
        </div>
        </div>
      </div>
    </Layout>
  );
}
