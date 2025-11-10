"use client";
                

import "./add-slider.css";
import Layout from "../../pages/page";
import { useRouter } from "next/navigation";
import { addSlider } from "../../../api/add-image/add-slider";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import usePopup from "../../components/popup"
import PopupAlert from "../../components/PopupAlert";// ✅ Import icons
import { SlHome } from "react-icons/sl";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddSlider() {
  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const [image, setImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [description, setDescription] = useState("");
   const { popupMessage, popupType, showPopup } = usePopup();
    
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const editor = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    // formData.append("service", service);  ❌ remove if backend doesn't need it
    formData.append("image", image);
    formData.append("mobile_image", mobileImage);
    formData.append("description", description);

    try {
      setLoading(true);
      await addSlider(formData);
      showPopup("✅ Slider added successfully!");
      
      // Reset form
      setTitle("");
      setService("");
      setImage(null);
      setMobileImage(null);
      setDescription("");
    } catch (err) {
      showPopup(err.message || "Something went wrong!");
  
      console.error(err);
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
    router.push("/admin/services"); // Customer page
  };
  return (
    <Layout>
             <PopupAlert message={popupMessage} type={popupType} />
      
      <div className="add-slider-container">
         <div className="headerContainer">
            <div>
                                <span className="breadcrumb"style={{ cursor: "pointer"}}
                                onClick={goToManageCustomer}>Slider</span> 
                                   <span className={styles.separator}> | </span>
                                               <SlHome
                                                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                                      onClick={goToDashboard}
                                                      title="Go to Dashboard"
                                                    />
                                           <span> &gt; </span>
                                <span className="breadcrumbActive">Add Slider</span>
                              </div>
         
        </div>
 <div className="addcontent">
          <div className="addright">
        
        
        <form className="add-slider-form" onSubmit={handleSubmit}>
            <h2>Add Slider</h2>
          <label>Titel
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
</label>
          <label>Service
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
           
            <option value="">Select Service</option>
            <option value="AC Services">AC Services</option>
            <option value="Pedicure">Pedicure</option>
            <option value="Facial">Facial</option>
            <option value="Car Wash">Car Wash</option>
            <option value="Kitchen Cleaning">Kitchen Cleaning</option>
          </select>
 </label>
          <label>Image
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          </label>
          <small>Only jpg, png. Max resolution: 1920x500. Max file size: 2MB</small>

          <label>Mobile image
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setMobileImage(e.target.files[0])}
            required
          />
          </label>
          <small>Only jpg, png. Max resolution: 400x200. Max file size: 2MB</small>
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
<small>Max file size allowed: 500Kb.</small>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "SUBMIT"}
          </button>
        </form>
      </div>
      </div>
      </div>
    </Layout>
  );
}
