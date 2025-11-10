"use client";
import { useState, useEffect } from "react";
import Layout from "../pages/page";
import dynamic from "next/dynamic";
import styles from "../styles/gift.module.css";
import { useSearchParams } from "next/navigation";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function SendGift() {
    const router = useRouter();
  
  const searchParams = useSearchParams();
  const giftId = searchParams.get("id");

  const [form, setForm] = useState({
    giftCard: "",
    giftValue: "",
    description: "",
    file: null,
    validFrom: "",
    validTo: "",
  });

  useEffect(() => {
    if (giftId) {
      const savedGift = localStorage.getItem("selectedGift");
      if (savedGift) {
        const gift = JSON.parse(savedGift);
        setForm({
          giftCard: gift.title || "",
          giftValue: gift.giftValue || "",
          description: gift.description || "",
          file: null,
          validFrom: gift.validFrom || "",
          validTo: gift.validTo || "",
        });
      }
    }
  }, [giftId]);

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
    console.log("Form Data:", form, "Editing ID:", giftId);
    alert(giftId ? "Gift updated!" : "Gift sent!");
  };
   const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/gift"); // Customer page
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
          <span className={styles.breadcrumb} style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Gift</span>     
            <span className={styles.separator}> | </span>
               <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
           <span> &gt; </span>
          <span className={styles.breadcrumbActive}>Edit Gift</span>
        </div>
        </div>

        <div className={styles.card}>
          <h3 style={{ color: "#888", marginBottom: "20px", textAlign: "left" }}>
            {giftId ? "Edit Gift" : "Send Gift"}
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <label className={styles.fieldLabel}>Title</label>
            <input
              name="giftCard"
              value={form.giftCard}
              onChange={handleChange}
              className={styles.addselect}
            />
              
           

            {/* Gift Value */}
            <label className={styles.fieldLabel} style={{ marginTop: "20px" }}>
              Gift Value
            </label>
            <input
              
              name="giftValue"
              value={form.giftValue}
              onChange={handleChange}
              className={styles.addselect}
            />

            {/* Description */}
            <label className={styles.fieldLabel} style={{ marginTop: "20px" }}>
              Description
            </label>
            <JoditEditor
              value={form.description}
              config={{
                readonly: false,
                height: 200,
                buttons: ["undo","redo","|","bold","italic","underline","|","ul","ol","|","link","image","|","source"]
              }}
              onChange={(newContent) => setForm((prev) => ({ ...prev, description: newContent }))}
            />
            <div style={{ fontSize: "12px", color: "#555", marginBottom: "20px", textAlign:"left" }}>
              Max file size allowed: 500Kb
            </div>

            {/* CSV Upload */}
            <label className={styles.fieldLabel} style={{ marginTop: "20px" }}>
              Upload CSV
            </label>
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={handleChange}
              className={styles.fileInput}
            />
            <div style={{ fontSize: "12px", color: "#555", marginBottom: "20px", textAlign:"left"}}>
              Only allowed CSV format. Max file size allowed: 2MB
            </div>

            {/* Valid From / To */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <div style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Valid From</label>
                <input
                  type="date"
                  name="validFrom"
                  value={form.validFrom}
                  onChange={handleChange}
                  className={styles.addselect}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Valid To</label>
                <input
                  type="date"
                  name="validTo"
                  value={form.validTo}
                  onChange={handleChange}
                  className={styles.addselect}
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} style={{ float: "left" }}>
              {giftId ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
