"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../pages/page";
import styles from "../styles/blog.module.css";

// Load JoditEditor dynamically
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddBlog() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");

  const editor = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // set mounted true after client-side mount
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ category, subCategory, title, image, description, source, author, tags });
    alert("Blog submitted successfully!");
  };

  return (
    <Layout>
      <div className={styles.addcontainer}>
            <div className={styles.headerContainer}>
            <div>
                                <span className={styles.breadcrumb}>Blog</span> &gt;{' '}
                                <span className={styles.breadcrumbActive}>Add Blog</span>
                              </div>
         
        </div>
        <div className={styles.addcontent}>
          {/* Left side submit button */}
       

          {/* Right side form */}
          <div className={styles.addright}>
            <form className={styles.addform} onSubmit={handleSubmit}>
             <h2 className={styles.addpageTitle}>Add Blog</h2>
              <label>
                Category
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  <option value="Cleaning & Disinfection">Cleaning & Disinfection</option>
                  <option value="AC Service">AC Service</option>
                  <option value="Car Washing">Car Washing</option>
                  <option value="Solar Panel">Solar Panel</option>
                </select>
              </label>

              <label>
                Sub Category
                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                  <option value="">Select Sub Category</option>
                  <option value="Home Cleaning">Home Cleaning</option>
                  <option value="Kitchen Deep Cleaning">Kitchen Deep Cleaning</option>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Sedan">Sedan</option>
                </select>
              </label>

              <label>
                Title
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Title" />
              </label>

              <label>
                Image
                <input type="file" onChange={handleImageChange} />
              </label>

              <label>Description</label>
              {mounted && (
                <JoditEditor
                  ref={editor}
                  value={description}
                  config={{
                    readonly: false,
                    height: 200,
                    toolbarSticky: false,
                    buttons: [
                      "undo", "redo", "|",
                      "bold", "italic", "underline", "strikethrough", "|",
                      "ul", "ol", "|",
                      "link", "image", "video", "|",
                      "align", "|",
                      "source", "|",
                      "help"
                    ]
                  }}
                  tabIndex={1}
                  onBlur={newContent => setDescription(newContent)}
                />
              )}

              <label>
                Source
                <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source URL or reference" />
              </label>

              <label>
                Author Name
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name" />
              </label>

              <label>
                Tags
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" />
              </label>
              <div className={styles.addleft}>
            <button className={styles.addsubmitBtn} onClick={handleSubmit}>Submit</button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
