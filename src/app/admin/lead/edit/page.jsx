"use client";
import dynamic from "next/dynamic";
import styles from "../../styles/Leads.module.css";
import Layout from "../../pages/page";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams ,useParams } from 'next/navigation';
import { SlHome } from "react-icons/sl";
import { getallStates, getallCities, getCategoryList } from "../../../api/user-side/register-professional/location";
import { getLeadDetails ,updateLead } from "../../../api/manage_users/lead";
import { useRef } from "react"; 
import usePopup from "../../components/popup"
import PopupAlert from "../../components/PopupAlert";
const ReactSelect = dynamic(() => import("react-select"), { ssr: false });
export default function EditFranchise() {
  const hasLoadedInitialData = useRef(false);
    const router = useRouter();
const searchParams = useSearchParams();
// const leadId = searchParams.get("id");

const [token, setToken] = useState(null);
const { popupMessage, popupType, showPopup } = usePopup();
const [leadId, setLeadId] = useState(null);
useEffect(() => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log("LEAD ID =", id);
    setLeadId(id);
  }
}, []);
useEffect(() => {
  if (typeof window !== "undefined") {
    const savedToken = localStorage.getItem("access_token"); 
    console.log("TOKEN LOADED =", savedToken);
    setToken(savedToken);
  }
}, []);

  const [states, setStates] = useState([]);
  const [ownerCities, setOwnerCities] = useState([]);
  const [franchiseCities, setFranchiseCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
 const [loading, setLoading] = useState(true);
  const [kycFiles, setKycFiles] = useState({
    adharFront: "",
    adharBack: "",
    panCard: ""
  });
  const [form, setForm] = useState({
    owner_name: "",
    owner_email: "",
    owner_phone: "",
    owner_pincode: "",
    owner_address: "",
    owner_state_id: "",
    owner_city_id: "",
    franchise_name: "",
    franchise_email: "",
    franchise_phone: "",
    franchise_pincode: "",
    franchise_address: "",
    franchise_state_id: "",
    franchise_city_id: "",
    message: "",
  });

useEffect(() => {
  async function loadInitialData() {
    const [stateData, categoryData] = await Promise.all([
      getallStates(1),
      getCategoryList()
    ]);
    setStates(stateData || []);
    setCategories(categoryData || []);
  }
  loadInitialData();
}, []);



useEffect(() => {
  if (!leadId || !token) return;

  async function fetchLead() {
    try {
      const res = await getLeadDetails(leadId, token);
      console.log("API RESPONSE =", res);

      if (!res.success) {
        console.warn("API Error:", res.message);
        return;
      }

      const { owner_data = {}, franchise_data = {}, kyc_documents = {} } = res.data;

      setForm({
        owner_name: owner_data?.owner_name || "",
        owner_email: owner_data?.owner_email || "",
        owner_phone: owner_data?.owner_phone || "",
        owner_pincode: owner_data?.owner_pincode || "",
        owner_address: owner_data?.owner_address || "",
        owner_state_id: owner_data?.owner_state_id?.id || "",
        owner_city_id: owner_data?.owner_city_id?.id || "",
        franchise_name: franchise_data?.franchise_name || "",
        franchise_email: franchise_data?.franchise_email || "",
        franchise_phone: franchise_data?.franchise_phone || "",
        franchise_pincode: franchise_data?.franchise_pincode || "",
        franchise_address: franchise_data?.franchise_address || "",
        franchise_state_id: franchise_data?.franchise_state_id?.id || "",
        franchise_city_id: franchise_data?.franchise_city_id?.id || "",
        message: franchise_data?.message || "",
      });

      setSelectedCategories(
        (franchise_data?.category_list || []).map(c => ({
          value: c.id,
          label: c.title
        }))
      );

      const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

      setKycFiles({
        adharFront: kyc_documents?.adhar_card_front_image ? BASE + kyc_documents.adhar_card_front_image : "",
        adharBack: kyc_documents?.adhar_card_back_image ? BASE + kyc_documents.adhar_card_back_image : "",
        panCard: kyc_documents?.pan_card_image ? BASE + kyc_documents.pan_card_image : ""
      });

    } catch (err) {
      console.error("Lead fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchLead();
}, [leadId, token]);

const handleOwnerStateChange = async (e) => {
  const stateId = e.target.value;
  setForm({ ...form, owner_state_id: stateId, owner_city_id: "" });

  if (stateId) {
    const citiesData = await getallCities(stateId);
    setOwnerCities(citiesData || []);
  }
};


  const handleFranchiseStateChange = async (e) => {
    const stateId = e.target.value;
    setForm({ ...form, franchise_state_id: stateId, franchise_city_id: "" });
     if (stateId) {
       const citiesData = await getallCities(stateId);
       setFranchiseCities(citiesData || []);
    } else {
       setFranchiseCities([]);
    }
   };

  const handleOwnerCityChange = (e) => setForm({ ...form, owner_city_id: e.target.value });
  const handleFranchiseCityChange = (e) => setForm({ ...form, franchise_city_id: e.target.value });

  const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.title }));
  const goToDashboard = () => router.push("/admin/dashboard");

  const handleUpdateLead = async () => {
  try {
    if (!leadId || !token) {
      showPopup("Lead ID or Token missing!","error");
      return;
    }

    const formData = new FormData();

    // Owner fields
    formData.append("owner_name", form.owner_name);
    formData.append("owner_email", form.owner_email);
    formData.append("owner_phone", form.owner_phone);
    formData.append("owner_pincode", form.owner_pincode);
    formData.append("owner_address", form.owner_address);
formData.append("owner_state_id", form.owner_state_id);
formData.append("owner_city_id", form.owner_city_id);

    // Franchise fields
    formData.append("franchise_name", form.franchise_name);
    formData.append("franchise_email", form.franchise_email);
    formData.append("franchise_phone", form.franchise_phone);
    formData.append("franchise_pincode", form.franchise_pincode);
    formData.append("franchise_address", form.franchise_address);
formData.append("franchise_state_id", form.franchise_state_id);
formData.append("franchise_city_id", form.franchise_city_id);
    formData.append("message", form.message);

    // Categories
    const categoryIds = selectedCategories.map((c) => c.value);
    formData.append("category_list", JSON.stringify(categoryIds));

    // Files
    const front = document.getElementById("adharFront")?.files[0];
    const back = document.getElementById("adharBack")?.files[0];
    const pan = document.getElementById("panCard")?.files[0];

    if (front) formData.append("adhar_card_front_image", front);
    if (back) formData.append("adhar_card_back_image", back);
    if (pan) formData.append("pan_card_image", pan);

    // CALL API
    const data = await updateLead(leadId, token, formData);
    console.log("UPDATE RESPONSE =", data);

    if (data.success) {
      showPopup("Lead Updated Successfully!");
      router.push("/admin/lead");
    } else {
      showPopup(data.message || "Update failed","error");
    }

  } catch (err) {
    console.error("Update error:", err);
    showPopup("Error updating lead!","error");
  }
};

  return (
    <Layout>
      <div className={styles.container}>
         <PopupAlert message={popupMessage} type={popupType} />
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb} onClick={() => router.push("/admin/lead")} style={{ cursor: "pointer" }}>Lead</span>
            <span className={styles.separator}> | </span>
            <SlHome style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }} onClick={goToDashboard} title="Go to Dashboard" />
            <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Edit Lead</span>
          </div>
        </div>
     
        <div className={styles.twoColWrap}>
          <div className={styles.editcard}>
            <h2 className={styles.sectiontitle}>Owner Details</h2>
            <div className={styles.gridbox}>
              <div>
                <label className={styles.label}>Owner Name</label>
                <input type="text" className={styles.input} value={form.owner_name} onChange={e => setForm({ ...form, owner_name: e.target.value })} />
              </div>
              <div>
                <label className={styles.label}>Owner Email</label>
                <input type="email" className={styles.input} value={form.owner_email} onChange={e => setForm({ ...form, owner_email: e.target.value })} />
              </div>
              <div>
                <label className={styles.label}>Owner Phone</label>
                <input type="text" className={styles.input} value={form.owner_phone} onChange={e => setForm({ ...form, owner_phone: e.target.value })} />
              </div>
              <div>
                <label className={styles.label}>Owner Pincode</label>
                <input type="text" className={styles.input} value={form.owner_pincode} onChange={e => setForm({ ...form, owner_pincode: e.target.value })} />
              </div>
              <div>
                <label className={styles.label}>Owner State</label>
                <select className={styles.input} value={form.owner_state_id} onChange={handleOwnerStateChange}>
                  <option value="">Select State</option>
                  {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className={styles.label}>Owner City</label>
                <select className={styles.input} value={form.owner_city_id} onChange={handleOwnerCityChange}>
                  <option value="">Select City</option>
                  {ownerCities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <label className={styles.label}>Owner Address</label>
            <textarea className={`${styles.input} ${styles.full}`} rows={3} value={form.owner_address} onChange={e => setForm({ ...form, owner_address: e.target.value })} />
          </div>

          {/* Franchise Info */}
          <div className={styles.editcard}>
            <h2 className={styles.sectiontitle}>Franchise Info</h2>
            <div className={styles.gridbox}>
              <div>
                <label className={styles.label}>Franchise Name</label>
                <input type="text" className={styles.input} value={form.franchise_name} onChange={e => setForm({ ...form, franchise_name: e.target.value })} />
              </div>
              <div>
                <label className={styles.label}>Franchise Email</label>
                <input type="email" className={styles.input} value={form.franchise_email} onChange={e => setForm({ ...form, franchise_email: e.target.value })} />
              </div>
              <div>
                <label className={styles.label}>Franchise Phone</label>
                <input type="text" className={styles.input} value={form.franchise_phone} onChange={e => setForm({ ...form, franchise_phone: e.target.value })} />
              </div>
              <div>
                <label className={styles.label}>Franchise Pincode</label>
                <input type="text" className={styles.input} value={form.franchise_pincode} onChange={e => setForm({ ...form, franchise_pincode: e.target.value })} />
              </div>
              <div>
                <label className={styles.label}>Franchise State</label>
                <select className={styles.input} value={form.franchise_state_id} onChange={handleFranchiseStateChange}>
                  <option value="">Select State</option>
                  {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className={styles.label}>Franchise City</label>
                <select className={styles.input} value={form.franchise_city_id} onChange={handleFranchiseCityChange}>
                  <option value="">Select City</option>
                  {franchiseCities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <label className={styles.label}>Franchise Address</label>
            <textarea className={`${styles.input} ${styles.full}`} rows={3} value={form.franchise_address} onChange={e => setForm({ ...form, franchise_address: e.target.value })} />

            <label className={styles.label}>Franchise Category</label>
           <ReactSelect
  isMulti
  placeholder="Select Categories"
  options={categoryOptions}
  value={selectedCategories}
  onChange={setSelectedCategories}
/>

            <label className={styles.label}>Franchise Message</label>
            <textarea className={`${styles.input} ${styles.full}`} rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          </div>
        </div>

        {/* KYC Section */}
        <div className={styles.editcard}>
          <h2 className={styles.sectiontitle}>KYC Documents</h2>
          <div className={styles.kycRow}>
            {["adharFront","adharBack","panCard"].map((key) => (
              <div className={styles.kycBox} key={key}>
                <label className={styles.label}>{key.replace(/([A-Z])/g, ' $1')}</label>
                <div className={styles.previewBox}>
                  {kycFiles[key] && <img src={kycFiles[key]} alt={key} className={styles.previewImg} />}
                </div>
                <input type="file" id={key} className={styles.fileInput} />
                <label htmlFor={key} className={styles.chooseBtn}>Change File</label>
              </div>
            ))}
          </div>
         <button 
  type="button"
  className={styles.btnupdate}
  onClick={handleUpdateLead}
>
  Update
</button>

        </div>
      </div>
    </Layout>
  );
}
