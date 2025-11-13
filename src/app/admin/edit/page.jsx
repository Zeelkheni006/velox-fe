"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
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
const [submitting, setSubmitting] = useState(false);
const submitLock = useRef(false);
  // ==================== Load Lead Data ====================
 const initialized = useRef(false); // 🔒 prevent double API calls

useEffect(() => {
   if (initialized.current) return;
    initialized.current = true;
  const initData = async () => {
    const storedLead = localStorage.getItem("editLeadData");
    if (!storedLead) return;

    const leadData = JSON.parse(storedLead);

    // Normalize IDs
    const normalizedLead = {
      ...leadData,
      country_id: leadData.country_id
        ? Number(leadData.country_id)
        : leadData.country?.id
        ? Number(leadData.country.id)
        : null,
      state_id: leadData.state_id
        ? Number(leadData.state_id)
        : leadData.state?.id
        ? Number(leadData.state.id)
        : null,
      city_id: leadData.city_id
        ? Number(leadData.city_id)
        : leadData.city?.id
        ? Number(leadData.city.id)
        : null,
      categories: leadData.categories || [],
    };

    setLead(normalizedLead);

    // Fetch categories and countries
    const [catData, countryData] = await Promise.all([
      getCategoryList(),
      getCountries(),
    ]);

    setCategoryOptions(catData.map((c) => ({ label: c.title, value: Number(c.id) })));
    setCountryOptions(countryData.map((c) => ({ label: c.name, value: Number(c.id) })));

    // ✅ Preselect categories
    const preSelectedCats = (normalizedLead.categories || []).map((cat) => {
      if (typeof cat === "object" && cat.id) return { label: cat.title || cat.name, value: Number(cat.id) };
      if (typeof cat === "string") return { label: cat, value: cat }; // fallback
      return null;
    }).filter(Boolean);

    setSelectedCategories(preSelectedCats);

    // Fetch states & cities only if IDs exist
    if (normalizedLead.country_id) {
      const stateData = await getStates(normalizedLead.country_id);
      const formattedStates = stateData.map((s) => ({ label: s.name, value: Number(s.id) }));
      setStateOptions(formattedStates);

      if (normalizedLead.state_id) {
        const cityData = await getCities(normalizedLead.state_id);
        const formattedCities = cityData.map((c) => ({ label: c.name, value: Number(c.id) }));
        setCityOptions(formattedCities);
      }
    }
  };

  initData();
}, []);


  // ==================== Fetch Functions ====================
  const fetchStates = async (countryId) => {
    if (!countryId) return;
    try {
      const list = await getStates(countryId);
      const options = list.map((s) => ({ label: s.name, value: Number(s.id) }));
      setStateOptions(options);
    } catch (err) {
      showPopup("Failed to load states ❌", "error");
    }
  };

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
    const countryId = selected ? Number(selected.value) : null;
    setLead((prev) => ({
      ...prev,
      country_id: countryId,
      state_id: null,
      city_id: null,
    }));
    setStateOptions([]);
    setCityOptions([]);
    if (countryId) fetchStates(countryId);
  };

  const handleStateChange = (selected) => {
    const stateId = selected ? Number(selected.value) : null;
    setLead((prev) => ({
      ...prev,
      state_id: stateId,
      city_id: null,
    }));
    setCityOptions([]);
    if (stateId) fetchCities(stateId);
  };

  const handleCityChange = (selected) => {
    setLead((prev) => ({
      ...prev,
      city_id: selected ? Number(selected.value) : null,
    }));
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
  if (submitting || submitLock.current) return;
  submitLock.current = true; // lock
  setSubmitting(true);
    try {
      const originalLead = JSON.parse(localStorage.getItem("editLeadData") || "{}");

      const updatedPayload = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        country_id: lead.country_id ? Number(lead.country_id) : null,
        state_id: lead.state_id ? Number(lead.state_id) : null,
        city_id: lead.city_id ? Number(lead.city_id) : null,
        category_list: selectedCategories.map((sel) => Number(sel.value)),
      };

      // ✅ Only send changed fields
      const changedData = {};
      Object.keys(updatedPayload).forEach((key) => {
        const newVal = updatedPayload[key];
        const oldVal =
          key === "category_list"
            ? (originalLead.categories || []).map((c) => Number(c.id))
            : originalLead[key];

        const isChanged =
          JSON.stringify(newVal) !== JSON.stringify(oldVal);

        if (isChanged) changedData[key] = newVal;
      });

      console.log("🟡 Changed Data to Send:", changedData);

      if (Object.keys(changedData).length === 0) {
        showPopup("No changes detected!", "info");
        return;
      }

      const res = await updateLead(lead.id, changedData);

      if (res.success) {
        showPopup("✅ Updated Successfully!", "success");
        localStorage.setItem(
          "updatedLead",
          JSON.stringify({ ...originalLead, ...changedData })
        );
        setTimeout(() => router.push("/admin/lead"), 600);
      } else {
        showPopup(res.message || "❌ Update failed!", "error");
      }
    } catch (err) {
      console.error("updateLead error:", err);
      showPopup("❌ Server error!", "error");
    }finally {
    setSubmitting(false); // ✅ allow new submission after finish
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

           <button type="submit" className={styles.button} disabled={submitting}>
              Update Lead
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
  