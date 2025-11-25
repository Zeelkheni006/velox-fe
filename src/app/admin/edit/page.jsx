"use client";
import dynamic from "next/dynamic";
import styles from "../styles/Leads.module.css";
import Layout from "../pages/page";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { SlHome } from "react-icons/sl";
import { getStates, getCities, getCategoryList } from "../../api/user-side/register-professional/location";
import { getLeadDetails } from "../../api/manage_users/lead";

export default function EditFranchise() {

    const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = searchParams.get("id");

  const ReactSelect = dynamic(() => import("react-select"), { ssr: false });
  const [states, setStates] = useState([]);
  const [ownerCities, setOwnerCities] = useState([]);
  const [franchiseCities, setFranchiseCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
 
  const [kycFiles, setKycFiles] = useState({
    aadharFront: "",
    aadharBack: "",
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

 

  // Fetch lead data
   useEffect(() => {
    async function loadInitialData() {
      const stateData = await getStates(1);
      const categoryData = await getCategoryList();
      setStates(stateData || []);
      setCategories(categoryData || []);
    }
    loadInitialData();
  }, []);

  // Fetch lead details
  useEffect(() => {
    if (!leadId) return;

    async function fetchLead() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await getLeadDetails(leadId, token); // <-- API call
        if (!res?.success) return;

        const { data } = res;
        const { owner_data = {}, franchise_data = {}, kyc_documents = {} } = data;

        // Populate form
        setForm({
          owner_name: owner_data.owner_name || "",
          owner_email: owner_data.owner_email || "",
          owner_phone: owner_data.owner_phone || "",
          owner_pincode: owner_data.owner_pincode || "",
          owner_address: owner_data.owner_address || "",
          owner_state_id: owner_data.owner_state_id || "",
          owner_city_id: owner_data.owner_city_id || "",
          franchise_name: franchise_data.franchise_name || "",
          franchise_email: franchise_data.franchise_email || "",
          franchise_phone: franchise_data.franchise_phone || "",
          franchise_pincode: franchise_data.franchise_pincode || "",
          franchise_address: franchise_data.franchise_address || "",
          franchise_state_id: franchise_data.franchise_state_id || "",
          franchise_city_id: franchise_data.franchise_city_id || "",
          message: franchise_data.message || "",
        });

        // Categories
        setSelectedCategories((franchise_data.category_list || []).map(c => ({
          value: c.id,
          label: c.title
        })));

        // Cities
        if (owner_data.owner_state_id) {
          const ownerCitiesData = await getCities(owner_data.owner_state_id);
          setOwnerCities(ownerCitiesData || []);
        }
        if (franchise_data.franchise_state_id) {
          const franchiseCitiesData = await getCities(franchise_data.franchise_state_id);
          setFranchiseCities(franchiseCitiesData || []);
        }

        // KYC
        setKycFiles({
          aadharFront: kyc_documents.adhar_card_front_image || "",
          aadharBack: kyc_documents.adhar_card_back_image || "",
          panCard: kyc_documents.pan_card_image || ""
        });

      } catch (err) {
        console.error(err);
      }
    }

    fetchLead();
  }, [leadId]);


  // Handle state changes separately for owner and franchise
  const handleOwnerStateChange = async (e) => {
    const stateId = e.target.value;
    setForm({ ...form, owner_state_id: stateId, owner_city_id: "" });
    if (stateId) {
      const citiesData = await getCities(stateId);
      setOwnerCities(citiesData || []);
    } else {
      setOwnerCities([]);
    }
  };

  const handleFranchiseStateChange = async (e) => {
    const stateId = e.target.value;
    setForm({ ...form, franchise_state_id: stateId, franchise_city_id: "" });
    if (stateId) {
      const citiesData = await getCities(stateId);
      setFranchiseCities(citiesData || []);
    } else {
      setFranchiseCities([]);
    }
  };

  const handleOwnerCityChange = (e) => setForm({ ...form, owner_city_id: e.target.value });
  const handleFranchiseCityChange = (e) => setForm({ ...form, franchise_city_id: e.target.value });

  const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.title }));
  const goToDashboard = () => router.push("/admin/dashboard");

  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb} onClick={() => router.push("/admin/lead")} style={{ cursor: "pointer" }}>Lead</span>
            <span className={styles.separator}> | </span>
            <SlHome style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }} onClick={goToDashboard} title="Go to Dashboard" />
            <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Edit Lead</span>
          </div>
        </div>

        {/* Owner & Franchise Info */}
        <div className={styles.twoColWrap}>
          {/* Owner Details */}
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
            {["aadharFront","aadharBack","panCard"].map((key) => (
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
          <button className={styles.btnupdate}>Update</button>
        </div>
      </div>
    </Layout>
  );
}
