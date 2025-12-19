// pages/admin/edit-franchise.js
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../styles/Franchises.module.css"; // you’ll create this CSS file
import Layout from "../pages/page";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";
import usePopup from "../components/popup"
import PopupAlert from "../components/PopupAlert";
import { updateFranchiseOwner } from "../../api/manage_users/franchise";

export default function EditFranchiseUser() {
  const searchParams = useSearchParams();
   const adminId = searchParams.get("admin_id");
  const router = useRouter();
  const { popupMessage, popupType, showPopup } = usePopup();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      mobile: searchParams.get("mobile") || "",
     
      password: "",
      file: null,
    });
  }, [searchParams]);

  useEffect(() => {
  const stored = localStorage.getItem("franchiseOwnersData");
  if (!stored) return;

  const owner = JSON.parse(stored);

  setFormData({
    owner_name: owner.owner_name || "",
    owner_email: owner.owner_email || "",
    owner_phone: owner.owner_phone || "",
    password: "",
  });
}, []);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};


 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    owner_name: formData.owner_name,
    owner_email: formData.owner_email,
    owner_phone: formData.owner_phone,
    password: formData.password || undefined, // empty hoy to skip
  };

  if (formData.password && formData.password.length >= 8) {
    payload.password = formData.password;
  }
  const res = await updateFranchiseOwner(adminId, payload);

  if (res.success) {
    showPopup("Franchise user updated successfully ✔");
    router.push("/admin/franchises-user");
  } else {
    showPopup(res.message || "Update failed", "error");
  }
};

      const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/franchises-user"); // Customer page
  };
  return (
    <Layout>
        <PopupAlert message={popupMessage} type={popupType} />
       <div className={styles.container1}>
              <div className={styles.headerContainer}>
          <div>
          <span className={styles.breadcrumb}style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>FranchiseUesr</span> 
           <span className={styles.separator}> | </span>
           <SlHome
                                 style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                 onClick={goToDashboard}
                                 title="Go to Dashboard"
                               />
                               <span> &gt; </span>
          <span className={styles.breadcrumbActive}>Edit Franchiseuser</span>
        </div>
</div>
        <div className={styles.addcard}>
        <h2 className={styles.title1}>Edit Franchise User</h2>
        <form onSubmit={handleSubmit} className={styles.form1}>
          <label>Name</label>
          <input
            type="text"
            name="owner_name" 
            value={formData.owner_name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="owner_email"
            value={formData.owner_email}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            type="text"
            name="owner_phone"
            value={formData.owner_phone}
            onChange={handleChange}
          />

          {/* <label>Profile Pic</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
          /> */}


          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className={styles.updateBtn}>Update</button>
        </form>
      </div>
      </div>
    </Layout>
  );
}
