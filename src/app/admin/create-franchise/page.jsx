"use client";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../pages/page";
import dynamic from "next/dynamic";
import Script from "next/script";
import usePopup from "../components/popup";
import PopupAlert from "../components/PopupAlert";
import { SlHome } from "react-icons/sl";
import { useRouter, useSearchParams } from "next/navigation";

import { fetchRequestedServices, getLeadDetails } from "../../api/manage_users/lead";
import { getAllCountries, getallStates, getallCities } from "../../api/user-side/register-professional/location";
import { fetchGooglePoints } from "../../api/admin-franchise/franchise";
import styles from "../styles/Franchises.module.css";

export default function EditFranchise() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedLeadId = searchParams.get("leadId");

  const Select = dynamic(() => import("react-select"), { ssr: false });
  const { popupMessage, popupType, showPopup } = usePopup();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const polygonRef = useRef(null);

  const [form, setForm] = useState({
    country: "",
    state: "",
    city: "",
    franchiseName: "",
    firstAddress: "",
    secondAddress: "",
    mobile: "",
    commission: "",
    pincode: "",
    email: "",
    deliveryHours: "",
    deliveryMinutes: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // 🌍 Load Countries
  useEffect(() => {
    const loadCountries = async () => {
      const response = await getAllCountries();
      const countryList = response?.data || response?.countries || response || [];
      setCountries(countryList);
    };
    loadCountries();
  }, []);

  // 📌 Load Requested Services
  useEffect(() => {
    if (selectedLeadId) loadRequestedServices(selectedLeadId);
  }, [selectedLeadId]);

  const loadRequestedServices = async (leadId) => {
    const response = await fetchRequestedServices(leadId);
    if (response?.success && Array.isArray(response.data)) {
      const options = response.data.map((item) => ({ label: item.title, value: item.id }));
      setServiceOptions(options);
      setSelectedServices(options);
    }
  };

  // 📝 Load Existing Franchise Data
  useEffect(() => {
    if (!selectedLeadId) return;
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const loadFranchiseData = async () => {
      try {
        const response = await getLeadDetails(selectedLeadId, token);
        const f = response.data?.franchise_data;
        if (!f) return;

        const countryId = f.frachise_country_id?.id?.toString() || "";
        const stateId = f.franchise_state_id?.id?.toString() || "";
        const cityId = f.franchise_city_id?.id?.toString() || "";
        const cityData = f.franchise_city_id;

        if (countryId) setStates(await getallStates(countryId));
        if (stateId) setCities(await getallCities(stateId));

        setForm({
          ...form,
          franchiseName: f.franchise_name || "",
          email: f.franchise_email || "",
          mobile: f.franchise_phone || "",
          pincode: f.franchise_pincode || "",
          firstAddress: f.franchise_address || "",
          commission: f.commission || "",
          latitude: f.latitude || "",
          longitude: f.longitude || "",
          country: countryId,
          state: stateId,
          city: cityId,
        });

        if (cityData && mapInstance.current) {
          const lat = parseFloat(cityData.latitude || 20.5937);
          const lng = parseFloat(cityData.longitude || 78.9629);
          mapInstance.current.setCenter({ lat, lng });
          mapInstance.current.setZoom(12);
        }
      } catch {
        showPopup("Error loading franchise data", "error");
      }
    };
    loadFranchiseData();
  }, [selectedLeadId]);

  // 🌐 Initialize Google Map
  const initMap = () => {
    if (!window.google || mapInstance.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 5,
    });
    mapInstance.current = map;

    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ["polygon"],
      },
      polygonOptions: {
        fillColor: "#FF0000",
        fillOpacity: 0.3,
        strokeWeight: 2,
        editable: true,
      },
    });
    drawingManager.setMap(map);

    window.google.maps.event.addListener(drawingManager, "overlaycomplete", (event) => {
      if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
        if (polygonRef.current) polygonRef.current.setMap(null);
        polygonRef.current = event.overlay;
      }
    });
  };

  // 🌐 Load Points
  const handleLoadPoints = async () => {
    if (!polygonRef.current) return showPopup("Please draw a polygon first!", "error");

    const path = polygonRef.current.getPath();
    const polygonPoints = [];
    for (let i = 0; i < path.getLength(); i++) {
      const p = path.getAt(i);
      polygonPoints.push({ latitude: p.lat(), longitude: p.lng() });
    }

    try {
      const points = await fetchGooglePoints(polygonPoints);
      if (!points.length) return showPopup("⚠️ No points found.");

      points.forEach((p) => {
        new window.google.maps.Marker({
          position: { lat: p.latitude, lng: p.longitude },
          map: mapInstance.current,
        });
      });
      showPopup("✅ Points loaded!");
    } catch {
      showPopup("❌ Failed to load points.", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showPopup("✅ Franchise updated!");
  };

  return (
    <Layout>
      <PopupAlert message={popupMessage} type={popupType} />

      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_BASE_URL}&libraries=drawing`}
        strategy="afterInteractive"
        onLoad={initMap}
      />

      <div className={styles.editcontainer}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb} onClick={() => router.push("/admin/lead")}>
              Lead
            </span>
            <span className={styles.separator}> | </span>
            <SlHome style={{ margin: "0 5px", cursor: "pointer" }} onClick={() => router.push("/admin/dashboard")} />
            <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Add Franchise</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.addform}>
          <h2 className={styles.edittitle}>Edit Franchise</h2>

          <div className={styles.editgrid}>
            <div className={styles.editfull}>
              <label>SERVICES</label>
              <Select
  isMulti
  options={serviceOptions}
  value={selectedServices}
  onChange={setSelectedServices}
  styles={{
    control: (base) => ({
      ...base,
      minHeight: "32px",
      height: "32px",
      fontSize: "13px",
    }),
    menu: (base) => ({
      ...base,
      fontSize: "12px",      // 👉 dropdown text size
      minHeight: "10px",
      padding: "0",
    }),
    option: (base, state) => ({
      ...base,
      fontSize: "12px",      // 👉 single option text
      padding: "4px 8px",    // 👉 reduce option height
      backgroundColor: state.isFocused ? "#f1f1f1" : "white",
      cursor: "pointer",
    }),
    valueContainer: (base) => ({
      ...base,
      height: "32px",
      padding: "0 6px",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "32px",
    }),
  }}
/>

            </div>

            {/* Country / State / City selects */}
            <div>
              <label>FRANCHISE COUNTRY</label>
              <select
                name="country"
                value={form.country}
                onChange={async (e) => {
                  const c = e.target.value;
                  setForm({ ...form, country: c, state: "", city: "" });
                  if (c) setStates(await getallStates(c));
                }}
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>FRANCHISE STATE</label>
              <select
                name="state"
                value={form.state}
                onChange={async (e) => {
                  const s = e.target.value;
                  setForm({ ...form, state: s, city: "" });
                  if (s) setCities(await getallCities(s));
                }}
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>FRANCHISE CITY</label>
              <select
                name="city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Other fields */}
            <div><label>FRANCHISE PINCODE</label><input name="pincode" value={form.pincode} onChange={handleChange} /></div>
            <div className={styles.full}><label>FRANCHISE NAME</label><input name="franchiseName" value={form.franchiseName} onChange={handleChange} /></div>
            <div className={styles.full}><label>FIRST ADDRESS</label><input name="firstAddress" value={form.firstAddress} onChange={handleChange} /></div>
            <div><label>FRANCHISE MOBILE</label><input name="mobile" value={form.mobile} onChange={handleChange} /></div>
            <div><label>FRANCHISE EMAIL</label><input name="email" value={form.email} onChange={handleChange} /></div>
            <div><label>COMMISSION(%)</label><input name="commission" value={form.commission} onChange={handleChange} /></div>
            <div><label>LATITUDE</label><input name="latitude" value={form.latitude} onChange={handleChange} /></div>
            <div><label>LONGITUDE</label><input name="longitude" value={form.longitude} onChange={handleChange} /></div>

            <div className={styles.editfull}>
              <button
                type="button"
                className={styles.editresetBtn}
                onClick={() => {
                  if (polygonRef.current) polygonRef.current.setMap(null);
                  polygonRef.current = null;
                }}
              >
                Reset Area
              </button>
            </div>
          </div>

          <h3 className={styles.mapTitle}>Service Area (Draw Polygon)</h3>
          <div ref={mapRef} style={{ height: "400px", width: "100%", borderRadius: "8px", marginTop: "10px" }} />

          <button type="button" className={styles.submitBtn} onClick={handleLoadPoints}>
            LOAD POINTS
          </button>
          <button type="submit" className={styles.submitBtn}>UPDATE</button>
        </form>
      </div>
    </Layout>
  );
}
