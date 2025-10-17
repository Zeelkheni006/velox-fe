"use client";

import styles from "../styles/managecustomer.module.css";
import Layout from "../pages/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCustomer } from "../../api/manage_users/manage_customer"; // ✅ Import API function

export default function AddCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    city: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await addCustomer(formData);
      if (response.success) {
        alert("✅ Customer added successfully!");
        router.push("/admin/customer");
      } else {
        alert("❌ " + (response.message || "Failed to add customer"));
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <Layout>
      <div className={styles.addcontainer}>
        <div className={styles.topCard}>
          <div>
            <span className={styles.breadcrumb}>Manage Customer</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Add Customer</span>
          </div>
        </div>

        <div className={styles.addcard}>
          <h2 className={styles.formTitle}>Add Customer</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Mobile</label>
            <input
              type="text"
              name="phonenumber"
              placeholder="13 digit Mobile number"
              value={formData.phonenumber}
              onChange={handleChange}
              maxLength="14"
              required
            />

            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />

            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
