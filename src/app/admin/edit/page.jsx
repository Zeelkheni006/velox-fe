"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../pages/page";
import styles from "../styles/Leads.module.css";
import { updateLead } from "../../api/manage_users/lead";

export default function EditLeadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lead, setLead] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    country: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    setLead({
      id: searchParams.get("id") || "", // ✅ add id
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      phone: searchParams.get("phone") || "",
      message: searchParams.get("message") || "",
      country: searchParams.get("country") || "",
      state: searchParams.get("state") || "",
      city: searchParams.get("city") || "",
    });
  }, [searchParams]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setLead((prev) => ({ ...prev, [name]: value ?? "" }));
};

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!lead.id) return alert("Lead ID is missing!");

    // Only send allowed fields
    const payload = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      
      // omit country/state/city/id
    };

    const response = await updateLead(lead.id, payload);
    if (response.success) {
      alert("✅ Lead updated successfully!");
      router.push("/admin/lead");
    } else {
      alert("❌ " + (response.message || "Failed to update lead"));
    }
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <Layout>
      <div className={styles.editcontainer}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>Lead</span> &gt;{" "}
            <span className={styles.breadcrumbActive}>Edit Lead</span>
          </div>
        </div>

        <div className={styles.editcard}>
          <h2 className={styles.title}>Edit Lead</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {[
              { label: "Country", name: "country" },
              { label: "State", name: "state" },
              { label: "City", name: "city" },
              { label: "Name", name: "name" },
              { label: "Email", name: "email", type: "email" },
              { label: "Mobile Number", name: "phone", type: "tel" },
              { label: "Skill", name: "message" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name} className={styles.formGroup}>
                <label htmlFor={name} className={styles.label}>
                  {label}
                </label>
             <input
  type={type}
  id={name}
  name={name}
  value={lead[name] ?? ""} // ✅ ensure string
  onChange={handleChange}
  className={styles.input}
  required
/>
              </div>
            ))}
            <button type="submit" className={styles.button}>
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
