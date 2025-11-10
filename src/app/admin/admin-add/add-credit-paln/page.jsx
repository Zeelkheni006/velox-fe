'use client';

import React, { useState, useRef,useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../../styles/creditplan.module.css';
import Layout from '../../pages/page';
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function AddCreditPlanPage() {
  const editor = useRef(null);
  const router = useRouter();

  // State for all input fields
  const [title, setTitle] = useState('');
  const [creditValue, setCreditValue] = useState('');
  const [creditPrice, setCreditPrice] = useState('');
  const [realPrice, setRealPrice] = useState('');
  const [validityValue, setValidityValue] = useState('');
  const [validityType, setValidityType] = useState('Days');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [mounted, setMounted] = useState(false);

  // Handle image validation
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
 useEffect(() => {
    setMounted(true);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      creditValue,
      creditPrice,
      realPrice,
      validityValue,
      validityType,
      image,
      description,
    };
    console.log('Submitted Data:', formData);
    alert('Credit Plan submitted successfully!');
  };
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
                                <span className={styles.breadcrumbActive}>Add Credit Plan</span>
                              </div>
         
        </div>

       
 <div className="addcontent">
          <div className="addright">
        <form className={styles.addform} onSubmit={handleSubmit}>
           <h1 className={styles.addtitle}>Add Credit Plan</h1>
          <label>Title
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
</label>
          <label>Credit Value
          <input
            type="text"
            placeholder="Credit Value"
            value={creditValue}
            onChange={(e) => setCreditValue(e.target.value)}
            required
          />
</label>
          <label>Credit Price
          <input
            type="text"
            placeholder="Credit Price"
            value={creditPrice}
            onChange={(e) => setCreditPrice(e.target.value)}
            required
          />
</label>
          <label>Real Price
          <input
          type="text"
            placeholder="Real Price"
            value={realPrice}
            onChange={(e) => setRealPrice(e.target.value)}
            required
          />
</label>
          <label>Validity Value
          <input
            type="text"
            placeholder="Validity Value"
            value={validityValue}
            onChange={(e) => setValidityValue(e.target.value)}
            required
          />
</label>
          <label>Validity Type
          <select
            value={validityType}
            onChange={(e) => setValidityType(e.target.value)}
          >
            <option value="Days">Days</option>
            <option value="Months">Months</option>
          </select>
</label>
          <label>Image
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
          />
          </label>
          <span>
            Only allowed jpg, png, jpeg format. Image resolution must be 300*200. Max file size allowed: 2MB
          </span>

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

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>
      </div>
      </div>
    </Layout>
  );
}
