"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "./add-slider.css";
import Layout from "../pages/page";
import { useRouter } from "next/navigation";
import { addSlider } from "../../api/add-image/add-slider";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddSlider() {
  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const [image, setImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      alert("✅ Slider added successfully!");
      
      // Reset form
      setTitle("");
      setService("");
      setImage(null);
      setMobileImage(null);
      setDescription("");
    } catch (err) {
      alert(err.message || "Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="add-slider-container">
        <div className="addheaderContainer">
          <span className="addbreadcrumb">Slider</span> &gt;{" "}
          <span className="addbreadcrumb">Slider</span> &gt;{" "}
          <span className="addbreadcrumbActive">Add Slider</span>
        </div>

        <h2>Add Slider</h2>
        <form className="add-slider-form" onSubmit={handleSubmit}>
          <label>TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />

          <label>SERVICE</label>
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

          <label>IMAGE</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <small>Only jpg, png. Max resolution: 1920x500. Max file size: 2MB</small>

          <label>MOBILE IMAGE</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setMobileImage(e.target.files[0])}
            required
          />
          <small>Only jpg, png. Max resolution: 400x200. Max file size: 2MB</small>

          <label>DESCRIPTION</label>
          <JoditEditor
            value={description}
            config={{ readonly: false, height: 200, toolbarSticky: false }}
            onChange={(newContent) => setDescription(newContent)}
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
