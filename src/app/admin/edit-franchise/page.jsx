// pages/admin/edit-franchise.js
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../styles/Franchises.module.css"; // you’ll create this CSS file
import Layout from "../pages/page";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";

export default function EditFranchiseUser() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "franchises",
    password: "",
    file: null,
  });

  useEffect(() => {
    setFormData({
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      mobile: searchParams.get("mobile") || "",
      role: "franchises",
      password: "",
      file: null,
    });
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🚀 Submit logic here
    console.log("Updated Data:", formData);
  };
      const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/franchises-user"); // Customer page
  };
  return (
    <Layout>
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
            name="name" 
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />

          <label>Profile Pic</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
          />

          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="franchises">franchises</option>
            <option value="admin">admin</option>
          </select>

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
