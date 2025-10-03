"use client";
import { useSearchParams, useParams } from "next/navigation";
import Layout from "../pages/page"; // adjust path
import dynamic from "next/dynamic";
import styles from "../styles/offers.module.css";
import { useState, useEffect } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function EditOfferPage() {
  const params = useParams(); // gets [id]
  const searchParams = useSearchParams(); // gets query

  const index = params.id;

  const [form, setForm] = useState({
    title: "",
    offervalue: "",
    offercode: "",
    valideupto: "",
    owner: "",
    subcategory: "",
    category: "",
    startDate: "",
    endDate: "",
    maxValue: "",
    banner: null,
    service: "",
    offerType: "",
    description: "",
    user: "",
  });

  const [isGlobal, setIsGlobal] = useState(false);
  const [assignToUsers, setAssignToUsers] = useState(false);

  useEffect(() => {
    if (searchParams) {
      setForm({
        
        title: searchParams.get("title") || "",
        offervalue: searchParams.get("offervalue") || "",
        offercode: searchParams.get("offercode") || "",
        valideupto: searchParams.get("valideupto") || "",
        owner: searchParams.get("owner") || "",
        subcategory: searchParams.get("subcategory") || "",
        category: searchParams.get("category") || "",
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || "",
        maxValue: searchParams.get("maxValue") || "",
        service: searchParams.get("service") || "",
        offerType: searchParams.get("offerType") || "",
        description: searchParams.get("description") || "",
        user: searchParams.get("user") || "",
        banner: null,
      });
      setIsGlobal(searchParams.get("isGlobal") === "true");
      setAssignToUsers(searchParams.get("assignToUsers") === "true");
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Offer:", { index, ...form, isGlobal, assignToUsers });
    alert("Offer updated! Check console for data.");
  };

  return (
    <Layout>
      <div className={styles.addOfferContainer}>
        <div className={styles.breadcrumbs}>
          <span>Offer</span> &gt; <span>Offer</span> &gt;{" "}
          <span className={styles.breadcrumbActive}>Edit Offer</span>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h2 className={styles.pageTitle}>Edit Offer</h2>

            <label className={styles.fieldLabelCheckbox}>
                  <span className={styles.checkboxLabel}>
              Global Offer
              </span>
              <input
                type="checkbox"
                checked={isGlobal}
                onChange={(e) => setIsGlobal(e.target.checked)}
              />
              <span className={styles.checkboxLabel}>
               Please check if you want to assign this offer to all services.
              </span>
            </label>
          </div>

          <div className={styles.columns}>
            <div className={styles.colLeft}>
              {!isGlobal && (
                <>
                  <label className={styles.fieldLabel}>Subcategory</label>
                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    className={styles.addselect}
                  >
                    <option value="">Select Subcategory</option>
                    <option value="sub-1">Subcategory 1</option>
                    <option value="sub-2">Subcategory 2</option>
                  </select>
                </>
              )}

              <label className={styles.fieldLabel}>Title</label>
              <input
                className={styles.addinput}
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter Offer Title"
              />

              <label className={styles.fieldLabel}>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className={styles.addinput}
              />

              <label className={styles.fieldLabel}>End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className={styles.addinput}
              />

              <label className={styles.fieldLabel}>Max Value</label>
              <input
                type="number"
                name="maxValue"
                value={form.maxValue}
                onChange={handleChange}
                className={styles.addinput}
              />

              <label className={styles.fieldLabel}>Banner (Image)</label>
              <input
                type="file"
                name="banner"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleChange}
                className={styles.fileInput}
              />
              <div className={styles.bannerHint}>
                Allowed: JPG, PNG (300x200px, Max 2MB)
              </div>

              <label className={styles.fieldLabel}>Offer Code</label>
              <input
                name="offercode"
                value={form.offercode}
                onChange={handleChange}
                className={styles.addinput}
              />
 
              <label className={styles.fieldLabelCheckbox}>
                <span className={styles.checkboxLabel}>Specific User</span>
                <input
                  type="checkbox"
                  checked={assignToUsers}
                  onChange={(e) => setAssignToUsers(e.target.checked)}
                />
                <span className={styles.checkboxLabel}>Please check if you want to assign this offer to Selected Users.</span>
              </label>

              {assignToUsers && (
                <select
                  name="user"
                  value={form.user}
                  onChange={handleChange}
                  className={styles.addselect}
                >
                  <option value="">Select User</option>
                  <option value="vendor">Vendor</option>
                  <option value="user">User</option>
                  <option value="testuser">Test User</option>
                </select>
              )}
            </div>

            <div className={styles.colRight}>
              {!isGlobal && (
                <>
                  <label className={styles.fieldLabel}>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={styles.addselect}
                  >
                    <option value="">Select Category</option>
                    <option value="cat-1">Category 1</option>
                    <option value="cat-2">Category 2</option>
                  </select>
                </>
              )}

              <label className={styles.fieldLabel}>Service</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={styles.addselect}
              >
                <option value="">Select Service</option>
                <option value="s1">Service A</option>
                <option value="s2">Service B</option>
              </select>

              <label className={styles.fieldLabel}>Offer Value</label>
              <input
                name="offervalue"
                value={form.offervalue}
                onChange={handleChange}
                className={styles.addinput}
              />

              <label className={styles.fieldLabel}>Offer Type</label>
              <select
                name="offerType"
                value={form.offerType}
                onChange={handleChange}
                className={styles.addselect}
              >
                <option value="">Select Type</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Value</option>
              </select>
                        <label className={styles.fieldLabel}>Description</label>
          <JoditEditor
            value={form.description}
            config={{
              readonly: false,
              height: 300,
              buttons: [
                "undo",
                "redo",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "|",
                "ul",
                "ol",
                "|",
                "align",
                "|",
                "link",
                "image",
                "video",
                "|",
                "source",
              ],
            }}
            onChange={(newContent) =>
              setForm((prev) => ({ ...prev, description: newContent }))
            }
          />
          <div className={styles.descHint}>Max file size allowed: 500Kb</div>
            </div>
          </div>



          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn}>
              Update
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
