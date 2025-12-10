    "use client";
    import React, { useState, useEffect, useRef } from "react";
    import Layout from "../pages/page";
    import dynamic from "next/dynamic";
    import Script from "next/script";
    import usePopup from "../components/popup";
    import PopupAlert from "../components/PopupAlert";
    import { SlHome } from "react-icons/sl";
    import { useRouter, useSearchParams } from "next/navigation";
  import { TbPolygon } from "react-icons/tb";  
    // import { fetchRequestedServices } from "../../api/manage_users/lead";
    import { getAllCountries, getallStates, getallCities } from "../../api/user-side/register-professional/location";
    import {getFranchiseOwnersData,makeFranchise} from "../../api/manage_users/franchise";
    import { fetchGooglePoints } from "../../api/admin-franchise/franchise";
    import styles from "../styles/Franchises.module.css";

    export default function EditFranchise() {
      const router = useRouter();
      const searchParams = useSearchParams();
      const selectedLeadId = searchParams.get("leadId");
  const markerRef = useRef(null);
      const Select = dynamic(() => import("react-select"), { ssr: false });
      const { popupMessage, popupType, showPopup } = usePopup();
  const [showPolygonMenu, setShowPolygonMenu] = useState(false);
      const [countries, setCountries] = useState([]);
      const [states, setStates] = useState([]);
      const [cities, setCities] = useState([]);
      const [serviceOptions, setServiceOptions] = useState([]);
      const [selectedServices, setSelectedServices] = useState([]);
const ownerEmailParam = searchParams.get("owner_email");

const [initialServices, setInitialServices] = useState([]);
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

      // const loadRequestedServices = async (leadId) => {
      //   const response = await fetchRequestedServices(leadId);
      //   if (response?.success && Array.isArray(response.data)) {
      //     const options = response.data.map((item) => ({ label: item.title, value: item.id }));
      //     setServiceOptions(options);
      //     setSelectedServices(options);
      //   }
      // };
    // Get coordinates from Nominatim
    async function getCoordinatesByName(name) {
      if (!name) return null;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}`
        );
        const data = await res.json();
        if (data?.length > 0) {
          return {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          };
        }
      } catch (err) {
        console.error("Geo Name Error:", err);
      }
      return null;
    }

    // Zoom and optionally show marker
  async function zoomToLocation({ latitude, longitude, name }) {
    if (!mapInstance.current) return;

    let lat = latitude;
    let lng = longitude;

    if ((!lat || !lng) && name) {
      const loc = await getCoordinatesByName(name);
      if (loc) {
        lat = loc.latitude;
        lng = loc.longitude;
      }
    }

    if (lat && lng) {
      mapInstance.current.setCenter({ lat, lng });
      mapInstance.current.setZoom(12);

      // Remove previous marker
      if (markerRef.current) markerRef.current.setMap(null);

      // Add red marker at location
      // markerRef.current = new window.google.maps.Marker({
      //   position: { lat, lng },
      //   map: mapInstance.current,
      //   title: name || "Franchise Location",
      
      // });
    }
  }
    // 📝 Load Existing Franchise Data
    

      // 🌐 Initialize Google Map
  let currentPolygon = null;

  const initMap = () => {
    if (!window.google || mapInstance.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 4,
      mapTypeControl: false,
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

    // ⚡ Capture polygon once drawn
    window.google.maps.event.addListener(drawingManager, "overlaycomplete", (e) => {
      if (e.type === "polygon") {
        // Remove previous polygon if exists
        if (polygonRef.current) polygonRef.current.setMap(null);
        
        polygonRef.current = e.overlay; // Save the new polygon reference
        drawingManager.setDrawingMode(null); // Stop drawing
        showPopup("✅ Polygon drawn");
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

    // ✅ Add the first point again at the end to close the polygon
    if (polygonPoints.length > 0) {
      polygonPoints.push({ 
        latitude: polygonPoints[0].latitude, 
        longitude: polygonPoints[0].longitude 
      });
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
  // submit button code 
   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Prepare services
    const serviceIds = selectedServices.map((s) => s.value);

    // Prepare polygon points
    let rawPolygonPoints = [];
    if (polygonRef.current) {
      const path = polygonRef.current.getPath();
      for (let i = 0; i < path.getLength(); i++) {
        const p = path.getAt(i);
        rawPolygonPoints.push({ latitude: p.lat(), longitude: p.lng() });
      }
      // Close polygon
      if (rawPolygonPoints.length > 0) {
        rawPolygonPoints.push({
          latitude: rawPolygonPoints[0].latitude,
          longitude: rawPolygonPoints[0].longitude,
        });
      }
    }

    const payload = {
      franchise_name: form.franchiseName,
      franchise_email: form.email,
      franchise_phone: form.mobile,
      franchise_address: form.firstAddress,
      franchise_country_id: Number(form.country) || null,
      franchise_state_id: Number(form.state) || null,
      franchise_city_id: Number(form.city) || null,
      franchise_pincode: form.pincode,
      latitude: Number(form.latitude) || 0,
      longitude: Number(form.longitude) || 0,
      commission: form.commission || 0,
      delivery_hours: form.deliveryHours || 0,
      delivery_minutes: form.deliveryMinutes || 0,
      service_ids: serviceIds,
      raw_polygon_points: rawPolygonPoints,
      owner_email: ownerEmailParam,
    };

    showPopup("⏳ Submitting franchise...", "info");

    const res = await makeFranchise(payload);

    if (res.success) {
      showPopup("✅ Franchise updated successfully!", "success");
      router.push("/admin/franchises-user");
    } else {
      showPopup(res.message || "❌ Submission failed", "error");
    }
  } catch (err) {
    console.error("Submit Error:", err);
    showPopup(err.message || "❌ Something went wrong", "error");
  }
};


    const fetchFranchiseOwnerData = async (email) => {
  const res = await getFranchiseOwnersData(email);

  if (res?.success && res.data) {
    const f = res.data.franchise_data;  // Franchise
    const o = res.data.owner_data;      // Owner

    // 🌟 service_list → only ids
    const selected = Array.isArray(f?.service_list)
      ? f.service_list.map((service) => ({
          value: service.id,
          label: service.title,
        }))
      : [];
setSelectedServices(selected); // ✅ show in Select
    // Optional: also set serviceOptions if you want to allow new selections
    setServiceOptions(selected);
setInitialServices(selected); 
    setForm({
      country: f?.frachise_country_id?.id || "",
      state: f?.franchise_state_id?.id || "",
      city: f?.franchise_city_id?.id || "",
      franchiseName: f?.franchise_name || "",
      firstAddress: f?.franchise_address || "",
      secondAddress: "",
      mobile: f?.franchise_phone || "",
      commission: "",
      pincode: f?.franchise_pincode || "",
      email: f?.franchise_email || "",
      latitude: "",
      longitude: "",
      deliveryHours: "",
      deliveryMinutes: "",
      services: f?.service_list || "", // 🎉 Auto select services here
    });

    showPopup("Franchise data loaded ✔", "success");

    // Load States & Cities
    if (f?.frachise_country_id?.id)
      setStates(await getallStates(f.frachise_country_id.id));

    if (f?.franchise_state_id?.id)
      setCities(await getallCities(f.franchise_state_id.id));

    // Map Auto Zoom
    if (f?.franchise_city_id?.name) {
      zoomToLocation({ name: f.franchise_city_id.name });
    } else if (f?.franchise_state_id?.name) {
      zoomToLocation({ name: f.franchise_state_id.name });
    } else if (f?.frachise_country_id?.name) {
      zoomToLocation({ name: f.frachise_country_id.name });
    }

  } else {
    showPopup(res?.message || "Data not found!", "error");
  }
};

useEffect(() => {
  if (ownerEmailParam) fetchFranchiseOwnerData(ownerEmailParam);
}, [ownerEmailParam]);

useEffect(() => {
  if (window?.location?.search.includes("from=franchises-user")) {
    window.history.replaceState(null, "", "/admin/franchises-user");
  }
}, []);

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
                <span className={styles.breadcrumb} style={{ cursor: "pointer"}} onClick={() => router.push("/admin/franchises-user")}>
                  Franchise-user
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
             <div
  className={styles.editfull}
  style={{ display: "flex", flexDirection: "column", gap: "6px" }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <label style={{ marginRight: "10px", fontSize: "13px" }}>SERVICES</label>

    <button
      type="button"
      style={{
        padding: "2px 6px",
        fontSize: "12px",
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f5f5f5"
      }}
      onClick={() => setSelectedServices(initialServices)}
    >
      Reset
    </button>
  </div>

  <Select
    isMulti
    options={serviceOptions}
    value={selectedServices}
    onChange={setSelectedServices}
    styles={{
      control: (base) => ({
        ...base,
        minHeight: "32px",
        height: "35px",
        fontSize: "13px",
      }),
      menu: (base) => ({
        ...base,
        fontSize: "12px",
        minHeight: "15px",
        padding: "0",
      }),
      option: (base, state) => ({
        ...base,
        fontSize: "12px",
        padding: "4px 8px",
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
        const selectedCountry = countries.find(ct => ct.id.toString() === c.toString());
        setForm({ ...form, country: c, state: "", city: "" });
        if (selectedCountry) {
          zoomToLocation({ name: selectedCountry.name });
        }
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
        const selectedState = states.find(st => st.id.toString() === s.toString());
        setForm({ ...form, state: s, city: "" });
        if (selectedState) zoomToLocation({ name: selectedState.name });
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
      onChange={async (e) => {
        const c = e.target.value;
        const selectedCity = cities.find(ct => ct.id.toString() === c.toString());
        setForm({ ...form, city: c });
        if (selectedCity) zoomToLocation({ name: selectedCity.name });
      }}
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

  <div
    style={{
      position: "relative",
      width: "100%",
      height: "400px",
      borderRadius: "8px",
      marginTop: "10px",
    }}
  >
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
      }}
    />

    {/* 🎯 Bottom Button Group */}
  {/* 🌍 MAP TYPE ICON BUTTONS (LEFT SIDE) */}
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      zIndex: 10,
    }}
  >
    {/* Satellite */}
    <button
      onClick={() => mapInstance.current?.setMapTypeId("satellite")}
      className={styles.mapTypeBtn}
      title="Satellite"
    >
      🛰
    </button>

    {/* Roadmap */}
    <button
      onClick={() => mapInstance.current?.setMapTypeId("roadmap")}
      className={styles.mapTypeBtn}
      title="Road"
    >
      🗺️
    </button>

    {/* Hybrid */}
    <button
      onClick={() => mapInstance.current?.setMapTypeId("hybrid")}
      className={styles.mapTypeBtn}
      title="Hybrid"
    >
      🌐
    </button>

    {/* Terrain */}
    <button
      onClick={() => mapInstance.current?.setMapTypeId("terrain")}
      className={styles.mapTypeBtn}
      title="Terrain"
    >
      ⛰️
    </button>
  <button
    type="button"
    className={styles.mapTypeBtn}
    onClick={() => {
      setShowPolygonMenu(!showPolygonMenu);
    }}
  >
    <TbPolygon />
  </button>

  {showPolygonMenu && (
    <div className={styles.mapPolygonBar}>
  <button
    onClick={() => {
      if (!polygonRef.current) return showPopup("⚠️ Draw polygon first!", "info");

      const path = polygonRef.current.getPath();
      if (path.getLength() > 0) {
        const lastPoint = path.getAt(path.getLength() - 1);
        
        // 🆕 Save removed point for redo
        if (!window._polygonRedo) window._polygonRedo = [];
        window._polygonRedo.push(new window.google.maps.LatLng(lastPoint.lat(), lastPoint.lng()));

        path.removeAt(path.getLength() - 1);
        showPopup("❌ Last point removed (Undo)");
      } else showPopup("⚠️ Nothing to remove");
    }}
  >
    Delete Last Point (Undo)
  </button>


  <button
    onClick={() => {
      if (!polygonRef.current) return showPopup("⚠️ No polygon!", "error");

      const path = polygonRef.current.getPath();

      // ✅ Close the polygon by adding first point at the end if not already
      if (path.getLength() >= 3) {
        const start = path.getAt(0);
        const end = path.getAt(path.getLength() - 1);
        if (start.lat() !== end.lat() || start.lng() !== end.lng()) {
          path.push(new window.google.maps.LatLng(start.lat(), start.lng()));
        }
      }

      // ✅ Apply fill & stroke options
      polygonRef.current.setOptions({
        fillColor: "#FF0000",
        fillOpacity: 0.3,
        strokeColor: "#FF0000",
        strokeWeight: 2,
        editable: false,
      });

      showPopup("✅ Polygon Finished & Filled");
      setShowPolygonMenu(false);
    }}
  >
    Finish
  </button>


    <button
  onClick={() => {
    if (polygonRef.current) polygonRef.current.setMap(null);
    polygonRef.current = null;
    window._polygonRedo = []; // 🧹 Clear redo
    showPopup(" Polygon cleared");
    setShowPolygonMenu(false);
  }}
  >
    Cancel
  </button>

    </div>
  )}

  <button
   type="button"
    className={styles.mapTypeBtn}
    onClick={() => {
      if (!polygonRef.current) return showPopup("⚠️ Draw polygon first!", "error");

      // 🆙 Restore last removed point
      if (window._polygonRedo && window._polygonRedo.length > 0) {
        const restored = window._polygonRedo.pop();
        polygonRef.current.getPath().push(restored);
        showPopup("🔁 Point Restored (Redo)");
      } else {
        showPopup("⚠️ Nothing to restore");
      }
    }}
  >
   ↪️
  </button>
  </div>
 
  </div>
              <button type="button" className={styles.submitBtn} onClick={handleLoadPoints}>
                LOAD POINTS
              </button>
              <button type="submit" className={styles.submitBtn}>SUBMIT</button>
            </form>
          </div>
        </Layout>
      );
    }
  // ?leadId=51