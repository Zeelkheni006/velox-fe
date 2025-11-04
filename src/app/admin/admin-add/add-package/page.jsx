"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic"; // ✅ for SSR issue
import styles from "../../styles/package.module.css";
import Layout from "../../pages/page";

// ✅ Dynamically import JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddPackage() {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    service: "",
    city: "",
    title: "",
    banner: null,
    multimedia: null,
    discountValue: "",
    discountType: "",
  });

  const [description, setDescription] = useState(""); // ✅ for editor content
  const [mounted, setMounted] = useState(false);
  const editor = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", { ...formData, description });
    alert("Package Submitted!");
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
     <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Package</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Add Package</span>
          </div>
        </div>

        <div className={styles.addcard}>
          <h2>Add Package</h2>
          <form onSubmit={handleSubmit} className={styles.addform}>
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="Home Services">Home Services</option>
              <option value="Cleaning">Cleaning</option>
            </select>

            <label>Sub Category</label>
            <select name="subcategory" value={formData.subcategory} onChange={handleChange}>
              <option value="">Select Subcategory</option>
              <option value="AC Service">AC Service</option>
              <option value="Kitchen">Kitchen</option>
            </select>

            <label>Service</label>
            <select name="service" value={formData.service} onChange={handleChange}>
              <option value="">Select Service</option>
              <option value="Deep Cleaning">Deep Cleaning</option>
              <option value="Pest Control">Pest Control</option>
            </select>

            <label>City</label>
            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select City</option>
              <option value="Surat">Surat</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>

            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Package Title"
            />

            <label>Banner</label>
            <input type="file" name="banner" onChange={handleChange} />
            <small>Only allowed jpg, png, jpeg. Min resolution 300x200. Max size 2MB.</small>

            <label>Multi Media</label>
            <input type="file" name="multimedia" multiple onChange={handleChange} />
            <small>Only allowed jpg, png, jpeg, mp4. Min resolution 300x200.</small>

            <label>Discount Value</label>
            <input
              type="text"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              placeholder="Enter discount value"
            />

            <label>Discount Type</label>
            <select name="discountType" value={formData.discountType} onChange={handleChange}>
              <option value="">Select Discount Type</option>
              <option value="flat">Flat</option>
              <option value="percent">Percent</option>
            </select>

            {/* ✅ Jodit Editor */}
            <div className={styles.flex1}>
              <label htmlFor="description">Description</label>
              {mounted && (
                <JoditEditor
                  ref={editor}
                  value={description}
                  className={styles.text}
                  config={{
                    readonly: false,
                    height: 250,
                    toolbarSticky: false,
                    buttons: [
                      "undo","redo", "|",
                      "bold", "italic", "underline", "|",
                      "ul", "ol", "|",
                      "font", "fontsize","brush","|",
                      "align", "|",
                      "table", "link", "image", "video", "|",
                      "source",
                    ],
                  }}
                  tabIndex={1}
                  onBlur={(newContent) => setDescription(newContent)}
                />
              )}
              <small className={styles.note}>Max file size allowed : 500Kb.</small>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
