"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../pages/page"; // Adjust path if needed
import styles from "../styles/Leads.module.css"; // We'll create this

export default function EditLeadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
   const email = searchParams.get('email');

  const [lead, setLead] = useState({
    name: "",
    email: "",
    mobile: "",
    skill: "",
    country: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    setLead({
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      mobile: searchParams.get("mobile") || "",
      skill: searchParams.get("skill") || "",
      country: searchParams.get("country") || "",
      state: searchParams.get("state") || "",
      city: searchParams.get("city") || "",
    });
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead({ ...lead, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Updated lead data: " + JSON.stringify(lead, null, 2));
    router.push("/leads");
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
                    <span>Lead</span> &gt; <span className={styles.breadcrumbActive}>Edit Lead</span>
                  </div>
        <h2 className={styles.title}>Edit Lead</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {[
            { label: "Country", name: "country" },
            { label: "State", name: "state" },
            { label: "City", name: "city" },
            { label: "Name", name: "name" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobile", type: "tel" },
            { label: "Skill", name: "skill" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className={styles.formGroup}>
              <label htmlFor={name} className={styles.label}>{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                value={lead[name]}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          ))}
          <button type="submit" className={styles.button}>Update</button>
        </form>
      </div>
    </Layout>
  );
}
