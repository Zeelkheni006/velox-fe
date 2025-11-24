"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import styles from '../styles/edit-profile.module.css';
import Layout from "../pages/page";
import { SlHome } from "react-icons/sl";
export default function UserProfile() {
      const router = useRouter();
  const [name, setName] = useState("Admin");
  const [mobile, setMobile] = useState("8401805775");
  const [email, setEmail] = useState("admin@gmail.com");
  const [profilePic, setProfilePic] = useState(null);
     const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
    <div className={styles.profileContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.breadcrumbWrapper}>
            <span className={styles.breadcrumb} style={{ cursor: "pointer" }}>
              User Profile
            </span>
            <span className={styles.separator}> | </span>
            <SlHome
              style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
              onClick={goToDashboard}
              title="Go to Dashboard"
            />
            <span> &gt; </span>
            <span className={styles.breadcrumbActive}>User Profile</span>
          </div>
        </div>
        <div className={styles.card}>
      <div className={styles.leftCard}>
        <div className={styles.profileImage}>
          <Image
            src="/images/admin-logo.webp" // replace with your image path
            alt="Profile Image"
            width={220}
            height={220}
            className={styles.userImg}
          />
        </div>

        <h2 className={styles.userName}>Admin</h2>
        <p className={styles.userEmail}>admin@gmail.com</p>
      </div>

      {/* RIGHT FORM */}
      <div className={styles.rightCard}>
        <h2 className={styles.title}>User Profile</h2>

        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>Mobile</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>Profile Pic</label>
          <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
        </div>

        <button className={styles.updateBtn}>UPDATE</button>
      </div>
      </div>
    </div>
    </Layout>
  );
}
