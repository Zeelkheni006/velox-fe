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
    categories:"",
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

    const matched = formattedOptions.filter(opt =>
      existingIds.includes(opt.value)
    );

    setSelectedCategories(matched);

  } catch (err) {
    showPopup("Failed to load categories ❌", "error");
  }
};

useEffect(() => {
  const existingCatIds = searchParams.get("category_ids")
    ?.split(",")
    .map(id => Number(id.trim()))
    .filter(id => !isNaN(id)) || [];

  setLead({
    id: searchParams.get("id") || "",
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    message: searchParams.get("message") || "",
    country: searchParams.get("country") || "",
    state: searchParams.get("state") || "",
    city: searchParams.get("city") || "",
  });

  fetchCategories(existingCatIds);
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,
    category_list: selectedCategories.map(c => c.value),
  };

  try {
    const res = await updateLead(lead.id, payload);

    if (res.success) {
      showPopup("✅ Updated Successfully!", "success");

      // ✅ Update local UI state also so table shows correct categories
      setLead(prev => ({
        ...prev,
        category_ids: payload.category_list,
        categories: selectedCategories.map(c => c.label)
      }));

      setTimeout(() => router.push("/admin/lead"), 500);
    } else {
      showPopup(res.message || "❌ Update failed!", "error");
    }
  } catch (err) {
    showPopup("❌ Server error!", "error");
    console.error(err);
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
                onChange={setSelectedCategories}
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
