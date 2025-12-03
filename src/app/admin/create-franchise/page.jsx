"use client";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../pages/page";
import Select from "react-select";
 import L from "leaflet";
import "leaflet/dist/leaflet.css";
 import "leaflet-draw/dist/leaflet.draw.css";
 import "leaflet-draw";
 import usePopup from "../components/popup"
 import PopupAlert from "../components/PopupAlert";
import dynamic from "next/dynamic";
import { fetchRequestedServices } from "../../api/manage_users/lead";
import styles from "../styles/Franchises.module.css";
import { fetchGooglePoints } from "../../api/admin-franchise/franchise"; 
import { SlHome } from "react-icons/sl";
import { useRouter,useSearchParams  } from "next/navigation";
import {getLeadDetails} from "../../api/manage_users/lead"
import {getAllCountries,getallStates,getallCities} from "../../api/user-side/register-professional/location"
export default function EditFranchise() {
    const router = useRouter();
    const [countries, setCountries] = useState([]);
const [states, setStates] = useState([]);
const [cities, setCities] = useState([]);
    const searchParams = useSearchParams();
const selectedLeadId = searchParams.get("leadId");
    const [serviceOptions, setServiceOptions] = useState([]);
    const { popupMessage, popupType, showPopup } = usePopup();
    const Select = dynamic(() => import("react-select"), { ssr: false });
  const [selectedServices, setSelectedServices] = useState([]);
  const [workingCities, setWorkingCities] = useState([{ label: "Jamnagar", value: "jamnagar" }]);
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
    longitude:"" ,
  });
useEffect(() => {
  if (selectedLeadId) {
    loadRequestedServices(selectedLeadId);
  }
}, [selectedLeadId]);
const loadRequestedServices = async (leadId) => {
  try {
    const response = await fetchRequestedServices(leadId);

    if (response?.success && Array.isArray(response.data)) {
      const options = response.data.map(item => ({
        label: item.title,
        value: item.id
      }));

      setServiceOptions(options);
      setSelectedServices(options); // Pre-select all returned services
    }

  } catch (err) {
    console.error("Failed to load requested services:", err);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => setWorkingCities([]);

  const leafletRef = useRef(null);
  const polygonRef = useRef(null);
  const pointsLayerRef = useRef(null);
  const cityLayerRef = useRef(null); // 🌟 City polygon layer

  // Function to draw working city polygon
  const drawWorkingCity = (map) => {
    if (!map) return;

    if (cityLayerRef.current) cityLayerRef.current.clearLayers();
    else cityLayerRef.current = new L.LayerGroup().addTo(map);

workingCities.forEach(city => {
  let geojson = null;

  // Example for Surat based on your uploaded map (coordinates must match city's actual boundary)
  if (city.value === "surat") {
    geojson = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [72.75, 21.21],
          [72.76, 21.21],
          [72.77, 21.22],
          [72.78, 21.23],
          [72.77, 21.24],
          [72.76, 21.25],
          [72.75, 21.25],
          [72.74, 21.24],
          [72.75, 21.23],
          [72.75, 21.21]
        ]]
      }
    };
  }

  if (geojson) {
    L.geoJSON(geojson, {
      style: { color: "red", weight: 4, fillOpacity: 0 } // red border, transparent fill
    }).addTo(cityLayerRef.current);
  }
});
  };

  useEffect(() => {
    if (!leafletRef.current) return;

    const map = L.map(leafletRef.current).setView([form.latitude, form.longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    pointsLayerRef.current = new L.LayerGroup().addTo(map);

    const drawControl = new L.Control.Draw({
      edit: { featureGroup: drawnItems },
      draw: {
        polygon: {
          allowIntersection: false,
          shapeOptions: { color: "red", fillColor: "red", fillOpacity: 0.3, weight: 2 }
        },
        circle: false,
        rectangle: false,
        marker: false,
        polyline: false,
      }
    });
    map.addControl(drawControl);

 map.on(L.Draw.Event.CREATED, (e) => {
  const layer = e.layer;

  // AUTO-CLOSE POLYGON
  if (layer instanceof L.Polygon) {
    let latlngs = layer.getLatLngs()[0];

    const first = latlngs[0];
    const last = latlngs[latlngs.length - 1];

    // If first & last point are not equal → close polygon
    if (first.lat !== last.lat || first.lng !== last.lng) {
      latlngs.push(first); // close loop
      layer.setLatLngs([latlngs]); // update polygon shape
    }
  }

  drawnItems.clearLayers();
  drawnItems.addLayer(layer);
  polygonRef.current = layer;
});

    drawWorkingCity(map);

    return () => map.remove();
  }, []);

  // Redraw city polygon when workingCities change
  useEffect(() => {
    if (leafletRef.current) {
      const map = leafletRef.current._leaflet_map; // Leaflet map reference
      if (map) drawWorkingCity(map);
    }
  }, [workingCities]);

 const handleLoadPoints = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) { showPopup("⚠️ Please login.","error"); return; }
  if (!polygonRef.current) { showPopup("Please draw a polygon first!","error"); return; }

  let latlngs = polygonRef.current.getLatLngs()[0];

  // Extract first point
  const first = latlngs[0];

  // Convert to array format
  let polygonPoints = latlngs.map(p => ({
    latitude: p.lat,
    longitude: p.lng
  }));

  // FORCE last point = first point
  const last = polygonPoints[polygonPoints.length - 1];
  if (last.latitude !== first.lat || last.longitude !== first.lng) {
    polygonPoints.push({
      latitude: first.lat,
      longitude: first.lng
    });
  }

  console.log("FINAL POLYGON POINTS:", polygonPoints); // <-- You will now see repeated first point

  try {
    const points = await fetchGooglePoints(polygonPoints);

    if (!points.length) { showPopup("⚠️ No points found."); return; }

    pointsLayerRef.current.clearLayers();
    points.forEach(p => L.marker([p.latitude, p.longitude]).addTo(pointsLayerRef.current));
    showPopup("✅ Points loaded!");

  } catch (err) {
    console.error(err);
    showPopup("❌ Failed to load points.","error");
  }
};

const addVertexMarkers = (polygonLayer) => {
  if (!leafletRef.current) return;

  const map = leafletRef.current._leaflet_map;
  const latlngs = polygonLayer.getLatLngs()[0];

  // Remove existing markers before adding new ones
  if (pointsLayerRef.current) pointsLayerRef.current.clearLayers();

  latlngs.forEach((point, index) => {
    const marker = L.circleMarker(point, {
      radius: 6,
      color: "red",
      fillColor: "white",
      fillOpacity: 1,
      weight: 2
    }).addTo(pointsLayerRef.current);

    // 3️⃣ DELETE POINT ON CLICK
    marker.on("click", () => {
      if (latlngs.length <= 4) {
        alert("Polygon must have minimum 3 points!");
        return;
      }

      latlngs.splice(index, 1); // Remove point

      // Fix auto-close after delete
      const first = latlngs[0];
      const last = latlngs[latlngs.length - 1];
      if (first.lat !== last.lat || first.lng !== last.lng) {
        latlngs[latlngs.length - 1] = first;
      }

      polygonLayer.setLatLngs([latlngs]);
      addVertexMarkers(polygonLayer); // Refresh markers
    });
  });
};


useEffect(() => {
  async function loadCountries() {
    try {
      const data = await getAllCountries();
      setCountries(data || []);
    } catch (err) {
      console.error("Failed to load countries:", err);
    }
  }
  loadCountries();
}, []);

const handleCountryChange = async (e) => {
  const countryId = e.target.value;
  setForm({ ...form, country: countryId, state: "", city: "" }); // reset state & city

  if (countryId) {
    const data = await getallStates(countryId);
    setStates(data || []);
  } else {
    setStates([]);
    setCities([]);
  }
};

const handleStateChange = async (e) => {
  const stateId = e.target.value;
  setForm({ ...form, state: stateId, city: "" }); // reset city

  if (stateId) {
    const data = await getallCities(stateId);
    setCities(data || []);
  } else {
    setCities([]);
  }
};

  const handleSubmit = (e) => { e.preventDefault(); showPopup("✅ Franchise updated!"); };
      const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/lead"); // Customer page
  };

useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!selectedLeadId || !token) return;

  const loadFranchiseData = async () => {
    try {
      const response = await getLeadDetails(selectedLeadId, token);
      if (!response.success || !response.data) return;

      const f = response.data.franchise_data;
      if (!f) return;

      const countryId = f.franchise_country?.id?.toString() || "";
      const stateId = f.franchise_state?.id?.toString() || "";
      const cityId = f.franchise_city_id?.id?.toString() || "";
      const cityName = f.franchise_city_id?.name?.toLowerCase() || "";

      // Load states
      let statesData = [];
      if (countryId) {
        statesData = await getallStates(countryId);
        setStates(statesData || []);
      }

      // Load cities
      let citiesData = [];
      if (stateId) {
        citiesData = await getallCities(stateId);
        setCities(citiesData || []);
      }

      // Set form values
      setForm({
        franchiseName: f.franchise_name || "",
        email: f.franchise_email || "",
        mobile: f.franchise_phone || "",
        pincode: f.franchise_pincode || "",
        firstAddress: f.franchise_address || "",
        secondAddress: "",
        country: countryId,
        state: stateId,
        city: cityId,
        commission: f.franchise_commission || "",
        deliveryHours: f.delivery_hours || "",
        deliveryMinutes: f.delivery_minutes || "",
        latitude: f.latitude || "",
        longitude: f.longitude || ""
      });

      // 🌟 Set workingCities for map drawing
      if (cityName) {
        setWorkingCities([{ label: f.franchise_city_id.name, value: cityName }]);
      }

    } catch (err) {
      console.error("Error loading franchise data:", err);
      showPopup("Error loading franchise data", "error");
    }
  };

  loadFranchiseData();
}, [selectedLeadId]);



  return (
    <Layout>
          <PopupAlert message={popupMessage} type={popupType} />
      
      <div className={styles.editcontainer}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}
              style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Lead</span>
               <span className={styles.separator}> | </span> 
                 <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
                       <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Add Franchise</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.addform}>
          <div className={styles.titleRow}>
  <h2 className={styles.edittitle}>Edit Franchise</h2>

  <button
    className={styles.ownerBtn}
    onClick={() => router.push(`/admin/owner-details`)}
  >
    Owner Details
  </button>
</div>

          <div className={styles.editgrid}>
            <div className={styles.editfull}>
              <label>SERVICES</label>
<Select
  isMulti
  options={serviceOptions}
  value={selectedServices}
  onChange={setSelectedServices}
/>

            </div>

<div>
  <label>FRANCHISE COUNTRY</label>
  <select
    name="country"
    value={form.country}
    onChange={async (e) => {
      const countryId = e.target.value;

      setForm({ ...form, country: countryId, state: "", city: "" });

      if (countryId) {
        const stateList = await getallStates(countryId);
        setStates(stateList || []);
        setCities([]); // reset city list
      }
    }}
  >
 
    {countries.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))}
  </select>
</div>


<div>
  <label>FRANCHISE STATE</label>
  <select
    name="state"
    value={form.state}
    onChange={async (e) => {
      const stateId = e.target.value;

      setForm({ ...form, state: stateId, city: "" });

      if (stateId) {
        const cityList = await getallCities(stateId);
        setCities(cityList || []);
      }
    }}
  >
    <option value="">Select State</option>
    {states.map((s) => (
      <option key={s.id} value={s.id}>
        {s.name}
      </option>
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
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))}
  </select>
</div>

            <div><label>FRANCHISE PINCODE</label><input name="pincode" value={form.pincode} onChange={handleChange} /></div>
            <div className={styles.full}><label>FRANCHISE NAME</label><input name="franchiseName" value={form.franchiseName} onChange={handleChange} /></div>
            <div className={styles.full}><label>FIRST ADDRESS</label><input name="firstAddress" value={form.firstAddress} onChange={handleChange} /></div>
           
            <div><label>FRANCHISE MOBILE</label><input name="mobile" value={form.mobile} onChange={handleChange} /></div>
            <div><label>FRANCHISE EMAIL</label><input name="email" value={form.email} onChange={handleChange} /></div>
            <div><label>COMMISSION(%)</label><input name="commission" value={form.commission} onChange={handleChange} /></div>
            <div><label>LATITUDE</label><input name="latitude" value={form.latitude} onChange={handleChange} /></div>
            <div><label>LONGITUDE</label><input name="longitude" value={form.longitude} onChange={handleChange} /></div>

            <div className={styles.editfull}>
             
              <button type="button" className={styles.editresetBtn} onClick={handleReset}>Reset Area</button>
            </div>
          </div>

          <h3 className={styles.mapTitle}>Service Area (Draw Polygon)</h3>
          <div ref={leafletRef} style={{ height: "400px", width: "100%", borderRadius: "8px", marginTop: "10px" }} />

          <button type="button" className={styles.submitBtn} style={{ marginTop: "10px" }} onClick={handleLoadPoints}>
            LOAD POINTS
          </button>
          <button type="submit" className={styles.submitBtn}>UPDATE</button>
        </form>
      </div>
    </Layout>
  );
}
