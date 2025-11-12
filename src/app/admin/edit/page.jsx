"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../pages/page";
import styles from "../styles/Leads.module.css";
import { updateLead } from "../../api/manage_users/lead";
import Select from "react-select";
import usePopup from "../components/popup";
import PopupAlert from "../components/PopupAlert";
import {
  getCategoryList,
  getCountries,
  getStates,
  getCities,
} from "../../api/user-side/register-professional/location";
import { SlHome } from "react-icons/sl";

export default function EditLeadPage() {
  const router = useRouter();
  const { popupMessage, popupType, showPopup } = usePopup();

  const [lead, setLead] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    country_id: null,
    state_id: null,
    city_id: null,
    categories: [],
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  // ==================== Load Lead Data ====================
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
      country_id: leadData.country?.id || leadData.country_id || null,
      state_id: leadData.state?.id || leadData.state_id || null,
      city_id: leadData.city?.id || leadData.city_id || null,
      categories: leadData.categories || [],
    });

    fetchCategories(leadData.categories || []);
    fetchCountries();
  }, []);

  // ==================== Categories ====================
  const fetchCategories = async (existingCategories = []) => {
    try {
      const list = await getCategoryList(); // [{id, title}]
      const formattedOptions = list.map((c) => ({
        label: c.title,
        value: Number(c.id),
      }));
      setCategoryOptions(formattedOptions);

      // Map existing categories to Select options
      const preSelected = (existingCategories || [])
        .map((cat) => {
          // If backend sends object
          if (typeof cat === "object" && cat.id) {
            return formattedOptions.find((opt) => opt.value === Number(cat.id));
          }
          // If backend sends string title
          if (typeof cat === "string") {
            return formattedOptions.find((opt) => opt.label === cat);
          }
          return null;
        })
        .filter(Boolean);

      setSelectedCategories(preSelected);
    } catch (err) {
      showPopup("Failed to load categories ❌", "error");
    }
  };

  // ==================== Countries ====================
  const fetchCountries = async () => {
    try {
      const list = await getCountries();
      const options = list.map((c) => ({ label: c.name, value: Number(c.id) }));
      setCountryOptions(options);

      // If country exists, fetch states
      if (lead.country_id) fetchStates(lead.country_id);
    } catch (err) {
      showPopup("Failed to load countries ❌", "error");
    }
  };

  // ==================== States ====================
  const fetchStates = async (countryId) => {
    if (!countryId) return;
    try {
      const list = await getStates(countryId);
      const options = list.map((s) => ({ label: s.name, value: Number(s.id) }));
      setStateOptions(options);

      // If state exists, fetch cities
      if (lead.state_id) fetchCities(lead.state_id);
    } catch (err) {
      showPopup("Failed to load states ❌", "error");
    }
  };

  // ==================== Cities ====================
  const fetchCities = async (stateId) => {
    if (!stateId) return;
    try {
      const list = await getCities(stateId);
      const options = list.map((c) => ({ label: c.name, value: Number(c.id) }));
      setCityOptions(options);
    } catch (err) {
      showPopup("Failed to load cities ❌", "error");
    }
  };

  // ==================== Handlers ====================
  const handleCountryChange = (selected) => {
    setLead({ ...lead, country_id: selected?.value || null, state_id: null, city_id: null });
    setStateOptions([]);
    setCityOptions([]);
    if (selected?.value) fetchStates(selected.value);
  };

  const handleStateChange = (selected) => {
    setLead({ ...lead, state_id: selected?.value || null, city_id: null });
    setCityOptions([]);
    if (selected?.value) fetchCities(selected.value);
  };

  const handleCityChange = (selected) => {
    setLead({ ...lead, city_id: selected?.value || null });
  };

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const goToDashboard = () => {
    router.push("/admin/dashboard");
  };

  // ==================== Submit ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        country_id: lead.country_id,
        state_id: lead.state_id,
        city_id: lead.city_id,
        category_list: selectedCategories.map((sel) => Number(sel.value)),
      };

      console.log("✅ Payload:", payload);

      const res = await updateLead(lead.id, payload);
      if (res.success) {
        localStorage.setItem(
          "updatedLead",
          JSON.stringify({ id: lead.id, ...payload })
        );
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

  // ==================== Render ====================
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
            {/* Country */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Country</label>
              <Select
                placeholder="Select Country"
                options={countryOptions}
                value={countryOptions.find((c) => c.value === lead.country_id) || null}
                onChange={handleCountryChange}
                isClearable
              />
            </div>

            {/* State */}
            <div className={styles.formGroup}>
              <label className={styles.label}>State</label>
              <Select
                placeholder="Select State"
                options={stateOptions}
                value={stateOptions.find((s) => s.value === lead.state_id) || null}
                onChange={handleStateChange}
                isClearable
                isDisabled={!lead.country_id}
              />
            </div>

            {/* City */}
            <div className={styles.formGroup}>
              <label className={styles.label}>City</label>
              <Select
                placeholder="Select City"
                options={cityOptions}
                value={cityOptions.find((c) => c.value === lead.city_id) || null}
                onChange={handleCityChange}
                isClearable
                isDisabled={!lead.state_id}
              />
            </div>

            {/* Other Inputs */}
            {["name", "email", "phone", "message"].map((field) => (
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
                isClearable
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
