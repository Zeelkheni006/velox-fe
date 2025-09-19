"use client";
import styles from "../styles/managecustomer.module.css";
import Layout from "../pages/page";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function AddCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // You can POST this data to your backend here
    console.log("Submitted:", formData);
    alert("Customer added successfully!");

    // Navigate back to manage page
    router.push("/manage-customer"); // or wherever your list page is
  };

  return (
    <Layout>
        <div className={styles.addcontainer}>
         <div className={styles.addheaderContainer}>
          <span className={styles.addbreadcrumb}>Manage Customer</span> &gt;{' '}
          <span className={styles.addbreadcrumb}>Manage Customer</span> &gt;{' '}
          <span className={styles.addbreadcrumbActive}>Add Customer</span>
        </div>
<div className={styles.addcard}>
          <h2 className={styles.formTitle}>Add Customer</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
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
              name="mobile"
              placeholder="10 digit Mobile number"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
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
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className={styles.submitBtn}>Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
