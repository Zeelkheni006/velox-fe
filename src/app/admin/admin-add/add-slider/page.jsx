"use client";
                

import "./add-slider.css";
import Layout from "../../pages/page";
import { useRouter } from "next/navigation";
import { addSlider } from "../../../api/add-image/add-slider";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // ✅ Import icons
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddSlider() {
  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const [image, setImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [description, setDescription] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); 
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
      setPopupMessage("✅ Slider added successfully!");
      setPopupType("success")
      // Reset form
      setTitle("");
      setService("");
      setImage(null);
      setMobileImage(null);
      setDescription("");
    } catch (err) {
      setPopupMessage(err.message || "Something went wrong!");
      setPopupType("error")
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div className="add-slider-container">
         <div className="headerContainer">
            <div>
                                <span className="breadcrumb">Slider</span> &gt;{' '}
                                <span className="breadcrumbActive">Add Slider</span>
                              </div>
         
        </div>
 <div className="addcontent">
          <div className="addright">
        
         {popupMessage && (
                    <div className={`${styles["email-popup"]} ${styles[popupType]} ${styles.show} flex items-center gap-2`}>
                      {popupType.startsWith("success") ? 
                        <AiOutlineCheckCircle className="text-green-500 text-lg"/> : 
                        <AiOutlineCloseCircle className="text-red-500 text-lg"/>}
                      <span>{popupMessage.replace(/^✅ |^❌ /,"")}</span>
                    </div>
                  )}
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
