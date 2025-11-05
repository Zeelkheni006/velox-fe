"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../pages/page";
import styles from "../styles/Leads.module.css";
import { updateLead } from "../../api/manage_users/lead";
import Select from "react-select";
import usePopup from "../components/popup";
import PopupAlert from "../components/PopupAlert";
import { getCategoryList } from "../../api/user-side/register-professional/location";

export default function EditLeadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { popupMessage, popupType, showPopup } = usePopup();

  const [lead, setLead] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    country: "",
    state: "",
    city: "",
    categories:[],
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

const fetchCategories = async (existingIds = []) => {
  try {
    const list = await getCategoryList();

    const formattedOptions = list.map(c => ({
      label: c.title,
      value: Number(c.id)
    }));

    setCategoryOptions(formattedOptions);

    // Pre-select existing categories
    const matched = formattedOptions.filter(opt =>
      existingIds.includes(opt.value)
    );

    setSelectedCategories(matched);

  } catch (err) {
    showPopup("Failed to load categories ❌", "error");
  }
};


useEffect(() => {
  const storedLead = localStorage.getItem("editLeadData");
  if (!storedLead) return;

  const leadData = JSON.parse(storedLead);

  // Pre-fill normal fields
  setLead({
    id: leadData._id || leadData.id || "",
    name: leadData.name || "",
    email: leadData.email || "",
    phone: leadData.phone || "",
    message: leadData.message || "",
    city: leadData.city || "",
    state: leadData.state || "",
    country: leadData.country || "",
  });

  // Extract category IDs
  const existingCatIds = (leadData.categories || []).map(c =>
    Number(c.id ?? c.value)
  ).filter(id => !isNaN(id));

  fetchCategories(existingCatIds); // Fetch category options & pre-select
}, []);



const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,
    category_list: selectedCategories.length > 0 
      ? selectedCategories.map(c => c.value)
      : [], // allow empty
  };

  try {
    const res = await updateLead(lead.id, payload);

    if (res.success) {
      showPopup("✅ Updated Successfully!", "success");
      setTimeout(() => router.push("/admin/lead"), 500);
    } else {
      showPopup(res.message || "❌ Update failed!", "error");
    }

  } catch (err) {
    console.error(err);
    showPopup("❌ Server error!", "error");
  }
};




  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />

      <div className={styles.editcontainer}>
        <div className={styles.headerContainer}>
          <span className={styles.breadcrumb}>Lead</span> &gt;
          <span className={styles.breadcrumbActive}> Edit Lead</span>
        </div>

        <div className={styles.editcard}>
          <h2 className={styles.title}>Edit Lead</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            {["country", "state", "city", "name", "email", "phone", "message"].map(field => (
              <div key={field} className={styles.formGroup}>
                <label className={styles.label}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={lead[field]}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            ))}

           <div className={styles.formGroup}>
  <label className={styles.label}>Categories</label>
  <Select
    isMulti
    placeholder="Select Categories"
    options={categoryOptions}
    value={selectedCategories}
    onChange={(selected) => setSelectedCategories(selected || [])}
    isClearable={true}
  />
</div>

            <button type="submit" className={styles.button}>
              Update Lead
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
