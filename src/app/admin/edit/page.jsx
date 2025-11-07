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
import { SlHome } from "react-icons/sl";

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
    categories: [],
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const storedLead = localStorage.getItem("editLeadData");
    if (!storedLead) return;

    const leadData = JSON.parse(storedLead);

    setLead({
      id: leadData._id || leadData.id || "",
      name: leadData.name || "",
      email: leadData.email || "",
      phone: leadData.phone || "",
      message: leadData.message || "",
      country: leadData.country || "",
      state: leadData.state || "",
      city: leadData.city || "",
      categories: leadData.categories || [],
    });

    const existingCatTitles = (leadData.categories || []).map(c => c.title || c);
    fetchCategories(existingCatTitles);
  }, []);

  const fetchCategories = async (existingTitles = []) => {
    try {
      const list = await getCategoryList(); // [{id, title}, ...]

      const formattedOptions = list.map(c => ({
        label: c.title,
        value: c.title,
      }));

      setCategoryOptions(formattedOptions);

      const preSelected = formattedOptions.filter(opt =>
        existingTitles.includes(opt.value)
      );

      setSelectedCategories(preSelected);

    } catch (err) {
      showPopup("Failed to load categories ❌", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const categoryListData = await getCategoryList();

      const payload = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,

        // Send typed values as strings
        country_id: lead.country || null,
        state_id: lead.state || null,
        city_id: lead.city || null,

        category_list: selectedCategories
          .map(sel => categoryListData.find(c => c.title === sel.label)?.id)
          .filter(Boolean),
      };

      console.log("✅ Final Payload Sent:", payload);

      const res = await updateLead(lead.id, payload);

      if (res.success) {
        showPopup("✅ Updated Successfully!", "success");
        setTimeout(() => router.push("/admin/lead"), 500);
      } else {
        showPopup(res.message || "❌ Update failed!", "error");
      }

    } catch (err) {
      console.error("updateLead error:", err);
      showPopup("❌ Server error!", "error");
    }
  };

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };
      const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />

      <div className={styles.editcontainer}>
        <div className={styles.headerContainer}>
          <div>
            <span
              className={styles.breadcrumb}
              onClick={() => router.push("/admin/lead")}
              style={{ cursor: "pointer" }}
            >
              Lead
            </span>
             <span className={styles.separator}> | </span>
              <SlHome
                                   style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                   onClick={goToDashboard}
                                   title="Go to Dashboard"
                                 />
           <span> &gt; </span>  
            <span className={styles.breadcrumbActive}> Edit Lead</span>
          </div>
        </div>

        <div className={styles.editcard}>
          <h2 className={styles.title}>Edit Lead</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Free text inputs for country, state, city */}
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

            {/* Categories */}
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
