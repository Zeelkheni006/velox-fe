"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles/admin-profile.module.css";
import Layout from "../pages/page";
import { SlHome } from "react-icons/sl";
import { changePassword } from "../../api/auth/admin-login";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const adminId = Number(localStorage.getItem("admin_id"));
      if (!adminId) {
        alert("Admin ID not found.");
        return;
      }

      await changePassword({
        userId: adminId,
        oldPassword,
        newPassword,
        confirmPassword,
      });

      alert("Password updated successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const goToDashboard = () => {
    router.push("/admin/dashboard");
  };

  return (
    <Layout>
      <div className={styles.pageWrapper}>
        {/* Breadcrumb */}
        <div className={styles.headerContainer}>
          <div className={styles.breadcrumbWrapper}>
            <span className={styles.breadcrumb} style={{ cursor: "pointer" }}>
              Change Password
            </span>
            <span className={styles.separator}> | </span>
            <SlHome
              style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
              onClick={goToDashboard}
              title="Go to Dashboard"
            />
            <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Change Password</span>
          </div>
        </div>

        {/* Form */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>User Profile</h2>

          <div className={styles.inputGroup}>
            <label>OLD PASSWORD</label>
            <input
              type="password"
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>NEW PASSWORD</label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>CONFIRM PASSWORD</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.updateBtn} onClick={handleUpdate}>
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
