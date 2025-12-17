"use client";
                

import "./add-slider.css";
import Layout from "../pages/page";
import { useRouter ,useSearchParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { getServiceTitleIds } from "../../api/admin-service/category-list";
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import {updateSlider} from "../../api/add-image/add-slider";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddSlider() {
  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const [image, setImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [description, setDescription] = useState("");
   const searchParams = useSearchParams();
const sliderId = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const editor = useRef(null);
    const [serviceId, setServiceId] = useState("");
  const [services, setServices] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
const [mobileImagePreview, setMobileImagePreview] = useState(null);
    const { popupMessage, popupType, showPopup } = usePopup();
  useEffect(() => {
    setMounted(true);
  }, []);

 

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
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!sliderId) {
    showPopup("❌ Slider ID missing", "error");
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
    await updateSlider(sliderId, formData);
    showPopup("✅ Slider updated successfully!");
  } catch (err) {
    showPopup(err.message || "❌ Update failed", "error");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const stored = localStorage.getItem("editSliderData");
  if (!stored) return;

  const slider = JSON.parse(stored);

  setTitle(slider.title || "");
  setServiceId(slider.service_id || "");
  setDescription(slider.description || "");

  // ✅ image preview
  if (slider.image) {
    setImagePreview(
      process.env.NEXT_PUBLIC_API_BASE_URL + slider.image
    );
  }

  // ✅ mobile image preview
  if (slider.mobile_image) {
    setMobileImagePreview(
      process.env.NEXT_PUBLIC_API_BASE_URL + slider.mobile_image
    );
  }
}, []);

  return (
    <Layout>
       <PopupAlert message={popupMessage} type={popupType} />
      <div className="add-slider-container">
         <div className="headerContainer">
            <div>
                                <span className="breadcrumb">Slider</span> &gt;{' '}
                                <span className="breadcrumbActive">Edit Slider</span>
                              </div>
         
        </div>
 <div className="addcontent">
          <div className="addright">
        
         
        <form className="add-slider-form" onSubmit={handleSubmit}>
            <h2>Edit Slider</h2>
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
  onChange={(e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }}
  required
/>
          </label>
          {imagePreview && (
  <div style={{ marginTop: "10px" ,textAlign: "left" }}>
    <img
      src={imagePreview}
      alt="Slider Preview"
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        borderRadius: "8px",
        border: "1px solid #ddd",
          display: "block",
        marginLeft: "0",
        marginRight: "auto",
      }}
    />
  </div>
)}

          <small>Only jpg, png. Max resolution: 1920x500. Max file size: 2MB</small>

          <label>Mobile image
        <input
  type="file"
  accept=".jpg,.jpeg,.png"
  onChange={(e) => {
    const file = e.target.files[0];
    setMobileImage(file);
    if (file) {
      setMobileImagePreview(URL.createObjectURL(file));
    }
  }}
  required
/>
          </label>
          {mobileImagePreview && (
  <div style={{ marginTop: "10px", textAlign: "left" }}>
    <img
      src={mobileImagePreview}
      alt="Mobile Slider Preview"
      style={{
        width: "200px",
        height: "auto",
        borderRadius: "8px",
        border: "1px solid #ddd",
       
        
      }}
    />
  </div>
)}

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
    onBlur={(newContent) => setDescription(newContent)}
  />
)}
</label>
<small>Max file size allowed: 500Kb.</small>

         <button type="submit" className="submit-btn" disabled={loading}>
  {loading ? "Updating..." : "Update"}
</button>
        </form>
      </div>
      </div>
      </div>
    </Layout>
  );
}
