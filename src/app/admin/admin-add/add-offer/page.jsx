"use client";
import { useState } from "react";
import Layout from "../../pages/page"; // adjust path if needed
import styles from "../../styles/offers.module.css";
import dynamic from "next/dynamic"; 
export default function AddOfferPage() {
  const [isGlobal, setIsGlobal] = useState(false);
  const [assignToServices, setAssignToServices] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subcategory: "",
    category: "",
    startDate: "",
    endDate: "",
    maxValue: "",
    banner: null,
    offerCode: "",
    service: "",
    offerValue: "",
    offerType: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((p) => ({ ...p, [name]: files[0] }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send form to API
    console.log("submit", form, { isGlobal, assignToServices });
    alert("Form submitted (mock)\nCheck console for payload.");
  };
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
  return (
    <Layout>
      <div className={styles.addOfferContainer}>
       <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Offer</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Add Offer</span>
          </div>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h2 className={styles.pageTitle}>Add Offer</h2>
            <label className={styles.globalCheckbox}>
             
              <div className={styles.globalText}>
               <span className={styles.checkboxLabel}>Global Offer</span>
                   <input
                type="checkbox"
                checked={isGlobal}
                onChange={(e) => setIsGlobal(e.target.checked)}
              />
                <span className={styles.checkboxLabel}>Please check if you want to assign this offer to all services.</span>
              </div>
            </label>
          </div>

          <div className={styles.columns}>
            {/* LEFT COLUMN */}
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
                placeholder="Only add offer"
              />

             

              <label className={styles.fieldLabel}>Start Date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={styles.addinput} />

              <label className={styles.fieldLabel}>End Date</label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={styles.addinput} />

              <label className={styles.fieldLabel}>Max Value</label>
              <input type="number" name="maxValue" value={form.maxValue} onChange={handleChange} className={styles.addinput} />

              <label className={styles.fieldLabel}>Banner (Image)</label>
              <input type="file" name="banner" accept="image/png, image/jpeg, image/jpg" onChange={handleChange} className={styles.fileInput} />
              <div className={styles.bannerHint}>Only allowed jpg, png, jpeg format. Image resolution must be 300*200. Max file size allowed : 2MB</div>

              <label className={styles.fieldLabel}>Offer Code</label>
              <input name="offerCode" value={form.offerCode} onChange={handleChange} className={styles.addinput} />

              <label className={styles.fieldLabelCheckbox}>
                <span className={styles.checkboxLabel}>Specific User</span>
                <input type="checkbox" checked={assignToServices} onChange={(e) => setAssignToServices(e.target.checked)} />
                <span className={styles.checkboxLabel}>Please check if you want to assign this offer to Selected Users.</span>
              </label>

              {assignToServices && (
                <div>
                  <label className={styles.fieldLabel}></label>
                  <select name="service" value={form.service} onChange={handleChange} className={styles.addselect}>
                    <option value=""></option>
                    <option value="svc-1">Vendor</option>
                    <option value="svc-2">User</option>
                    <option value="svc-2">Test user</option>
                  </select>
                </div>
              )}

              <div className={styles.formActionsLeft}>
                <button type="submit" className={styles.submitBtn}>Submit</button>
              </div>
            </div>

            {/* RIGHT COLUMN */}
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

              <label className={styles.fieldLabel}>Service (if not global)</label>
              <select name="service" value={form.service} onChange={handleChange} className={styles.addselect}>
                <option value="">Select Service</option>
                <option value="s1">Service A</option>
                <option value="s2">Service B</option>
              </select>

              <label className={styles.fieldLabel}>Offer Value</label>
              <input name="offerValue" value={form.offerValue} onChange={handleChange} className={styles.addinput} />

              <label className={styles.fieldLabel}>Offer Type</label>
              <select name="offerType" value={form.offerType} onChange={handleChange} className={styles.addselect}>
                <option value="">Select Type</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>

              <label className={styles.fieldLabel}>Description</label>
             <JoditEditor
  value={form.description}
  config={{
    readonly: false,
    height: 300,
    buttons: [         'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'backcolor', '|',
        'ul', 'ol', '|',
        'font', 'fontsize', 'brush', '|',
        'align', '|',
        'table', 'link', 'image', 'video', '|',
        'horizontalrule', 'source', '|',
        'help'],
  }}
  onChange={(newContent) =>
    setForm((prev) => ({ ...prev, description: newContent }))
  }
/>
              <div className={styles.descHint}>Max file size allowed : 500Kb.</div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

