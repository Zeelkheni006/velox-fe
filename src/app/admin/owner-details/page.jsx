"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { SlHome } from "react-icons/sl";
import { useState } from "react";
import styles from "../styles/owner.module.css";
import Layout from "../pages/page";

export default function FranchiseOwnerDetails() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId");
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const goToDashboard = () => {
    router.push("/admin/dashboard");
  };

  const goToManageCustomer = () => {
    router.push("/admin/lead");
  };

  return (
    <Layout>
      <div className={styles.container}>

        {/* 🔹 Breadcrumb Header */}
        <div className={styles.headerContainer}>
          <div>
            <span
              className={styles.breadcrumb}
              style={{ cursor: "pointer" }}
              onClick={goToManageCustomer}
            >
              Lead
            </span>

            <span className={styles.separator}> | </span>

            <SlHome
              style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
              onClick={goToDashboard}
              title="Go to Dashboard"
            />

            <span> &gt; </span>

            <span className={styles.breadcrumbActive}>Owner Details</span>
          </div>
        </div>

        {/* FORM */}
        <form className={styles.addform}>

          <div className={styles.header}>
            <h1 className={styles.title}>Owner Details</h1>
          </div>

          {/* FORM FIELDS */}
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input name="email" value={form.email} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Country</label>
              <input name="country" value={form.country} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>State</label>
              <input name="state" value={form.state} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Pincode</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} />
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className={styles.docBox}>
            <h2>Documents</h2>

           <div className={styles.kycRow}>
                       {["adharFront","adharBack","panCard"].map((key) => (
                         <div className={styles.kycBox} key={key}>
                           <label className={styles.label}>{key.replace(/([A-Z])/g, ' $1')}</label>
                           <div className={styles.previewBox}>
   
                           </div>
                           <input type="file" id={key} className={styles.fileInput} />
                           <label htmlFor={key} className={styles.chooseBtn}>Change File</label>
                         </div>
                       ))}
                     </div>
          </div>

          {/* UPDATE BUTTON */}
          <button className={styles.updateBtn}>Update</button>

        </form>
      </div>
    </Layout>
  );
}
