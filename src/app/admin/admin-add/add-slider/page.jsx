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
import { getServiceTitleIds } from "../../../api/admin-service/category-list";
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
  const [serviceId, setServiceId] = useState("");
const [services, setServices] = useState([]);
  const editor = useRef(null);
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!image || !mobileImage) {
    showPopup("❌ Please upload both images");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("service_id", serviceId);
  formData.append("image", image);
  formData.append("mobile_image", mobileImage);
  formData.append("description", description);

  try {
    setLoading(true);
    await addSlider(formData);
    showPopup("✅ Slider added successfully!");

    setTitle("");
    setServiceId("");
    setImage(null);
    setMobileImage(null);
    setDescription("");
  } catch (err) {
    showPopup(err.message || "Something went wrong!","error");
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

  useEffect(() => {
  setMounted(true);

  const fetchServices = async () => {
    try {
      const data = await getServiceTitleIds();
      setServices(data); // [{label, value}]
    } catch (err) {
      showPopup("❌ Failed to load services","error");
    }
  };

  fetchServices();
}, []);
  return (
    <Layout>
             <PopupAlert message={popupMessage} type={popupType} />
      
      <div className="add-slider-container">
         <div className="headerContainer">
            <div>
                                <span className="breadcrumb"style={{ cursor: "pointer"}}
                                onClick={goToManageCustomer}>Slider</span> 
                                   <span className="separator"> | </span>
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
    value={serviceId}
    onChange={(e) => setServiceId(e.target.value)}
    required
  >
    <option value="">Select Service</option>

    {services.map((service) => (
      <option key={service.value} value={service.value}>
        {service.label}
      </option>
    ))}
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
