"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams,useSearchParams  } from "next/navigation";
import Layout from "../pages/page";
 import usePopup from "../components/popup"
 import PopupAlert from "../components/PopupAlert";
import dynamic from "next/dynamic";
import Script from "next/script";
import styles from "../styles/Franchises.module.css";
import { fetchGooglePoints } from "../../api/admin-franchise/franchise"; 
import { getallStates, getallCities } from "../../api/user-side/register-professional/location";
import { fetchFranchiseById } from "../../api/manage_users/franchise";
 import {getServiceTitleIds } from "../../api/admin-service/category-list"
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";
 import { TbPolygon } from "react-icons/tb";  
 const ReactSelect = dynamic(() => import("react-select"), { ssr: false });
export default function EditFranchise() {
  const searchParams = useSearchParams();
    const router = useRouter();
     const Select = dynamic(() => import("react-select"), { ssr: false });
     const id = searchParams.get("id");
const [initialServices, setInitialServices] = useState([]);
  const [loading, setLoading] = useState(true);
 const [serviceOptions, setServiceOptions] = useState([]);
    const { popupMessage, popupType, showPopup } = usePopup();
  const pendingZoomRef = useRef(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const mapRef = useRef(null);
const mapInstance = useRef(null);
  const [showPolygonMenu, setShowPolygonMenu] = useState(false);
const markerRef = useRef(null);
const workingAreaRef = useRef([]); 
const polygonRef = useRef(null);
   const [form, setForm] = useState({
  country: "",
  state: "",
  city: "",
  franchiseName: "",
  firstAddress: "",
  mobile: "",
  commission: "",
  pincode: "",
  email: "",

});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
const waitForMap = (cb) => {
  const interval = setInterval(() => {
    if (window.google && mapInstance.current) {
      clearInterval(interval);
      cb();
    }
  }, 300);
};

  const hasStoredPolygon = useRef(false);
useEffect(() => {
  if (!id) return;

  const loadFranchise = async () => {
    try {
      const res = await fetchFranchiseById(id);
      const franchise = res?.data?.franchise_info || {};
const workingAreaRaw = res?.data?.working_area;

      // Set form values
      setForm({
        country: "",
        franchiseName: franchise.franchise_name || "",
        mobile: franchise.franchise_phone || "",
        email: franchise.franchise_email || "",
        firstAddress: franchise.address || "",
        pincode: franchise.pincode || "",
        city: franchise.city || "",
        state: franchise.state || "",
        commission: franchise.commission_rate || "",
      });

      // Services
      const mappedServices = (franchise.services || []).map((s) => ({
        label: s,
        value: s,
      }));
      setInitialServices(mappedServices);
      setSelectedServices(mappedServices);

      // 🔹 Auto zoom to city
      if (franchise.city) {
        pendingZoomRef.current = { name: franchise.city };
        if (mapInstance.current) {
          zoomToLocation({ name: franchise.city });
          pendingZoomRef.current = null;
        }
      }

    
// 🔹 Load working_area polygon if exists
if (workingAreaRaw) {
  let areaPoints = [];

  if (Array.isArray(workingAreaRaw)) {
    areaPoints = workingAreaRaw;
  } else if (typeof workingAreaRaw === "string") {
    try {
      areaPoints = JSON.parse(workingAreaRaw.replace(/'/g, '"'));
    } catch (e) {
      console.error("Polygon parse error", e);
    }
  }

  if (areaPoints.length >= 3) {
    const first = areaPoints[0];
    const last = areaPoints[areaPoints.length - 1];

    if (
      Number(first.latitude) === Number(last.latitude) &&
      Number(first.longitude) === Number(last.longitude)
    ) {
      areaPoints.pop();
    }

    // ✅ IMPORTANT
    setWorkingArea(areaPoints);
     workingAreaRef.current = areaPoints;
      hasStoredPolygon.current = true;
  }
  setIsFranchiseLoaded(true);
}

    } catch (err) {
      console.error("Edit fetch error:", err);
    }
  };

  loadFranchise();
}, [id]);
const [isMapReady, setIsMapReady] = useState(false);
const [workingArea, setWorkingArea] = useState([]);
useEffect(() => {
  if (!isMapReady) return;
  if (workingArea.length < 3) return;

  drawWorkingAreaPolygonFromStored();
}, [isMapReady, workingArea]);


const drawWorkingAreaPolygonFromStored = () => {
  if (!mapInstance.current) return;

  // remove old polygon
  if (polygonRef.current) {
    polygonRef.current.setMap(null);
  }

  const polygon = new window.google.maps.Polygon({
    paths: workingArea.map(p => ({
      lat: Number(p.latitude),
      lng: Number(p.longitude),
    })),
    strokeColor: "#FF0000",
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    editable: true,
  });

  polygon.setMap(mapInstance.current);
  polygonRef.current = polygon;

  // 🔥 AUTO FIT BOUNDS
  const bounds = new window.google.maps.LatLngBounds();
  workingArea.forEach(p =>
    bounds.extend({
      lat: Number(p.latitude),
      lng: Number(p.longitude),
    })
  );

  mapInstance.current.fitBounds(bounds);
};




const initMap = () => {
  if (!window.google || mapInstance.current) return;
 if (hasStoredPolygon.current) {
    console.log("✅ Stored polygon exists, skipping drawingManager");
  }
  const map = new window.google.maps.Map(mapRef.current, {
    center: { lat: 20.5937, lng: 78.9629 },
    zoom: 4,
    mapTypeControl: false,
  }); 

  mapInstance.current = map;

  // 🔹 Apply pending zoom
  if (pendingZoomRef.current) {
    zoomToLocation(pendingZoomRef.current);
    pendingZoomRef.current = null;
  }

  // ✅ ONLY allow drawing if NO backend polygon
  if (!hasStoredPolygon.current) {
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

    window.google.maps.event.addListener(drawingManager, "overlaycomplete", (e) => {
      if (e.type === "polygon") {
        if (polygonRef.current) polygonRef.current.setMap(null);
        polygonRef.current = e.overlay;
        drawingManager.setDrawingMode(null);
        showPopup("✅ Polygon drawn");
      }
    });
  }

  setIsMapReady(true);
};




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

    // if (markerRef.current) markerRef.current.setMap(null);

    // markerRef.current = new window.google.maps.Marker({
    //   position: { lat, lng },
    //   map: mapInstance.current,
    //   title: name || "Franchise Location",
    // });
  }
}
  // Redraw city polygon when workingCities change

 const handleLoadPoints = async () => {
  if (!workingAreaRef.current.length && polygonRef.current) {
    // fallback if polygon exists but ref empty
    const path = polygonRef.current.getPath();
    workingAreaRef.current = path.getArray().map(p => ({
      latitude: p.lat(),
      longitude: p.lng(),
    }));
  }

  if (!workingAreaRef.current.length) {
    showPopup("⚠️ No polygon available!", "error");
    return;
  }

  const polygonPoints = [...workingAreaRef.current];

  // ✅ close polygon
  const first = polygonPoints[0];
  const last = polygonPoints[polygonPoints.length - 1];
  if (
    first.latitude !== last.latitude ||
    first.longitude !== last.longitude
  ) {
    polygonPoints.push({ ...first });
  }

  console.log("FINAL STORED POLYGON 👉", polygonPoints);

  try {
    const points = await fetchGooglePoints(polygonPoints);
    showPopup("✅ Points loaded!");
  } catch (err) {
    showPopup("❌ Failed to load points", "error");
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
  const loadServices = async () => {
    try {
      const services = await getServiceTitleIds();
      setServiceOptions(services);

      console.log("SERVICE OPTIONS 👉", services);
    } catch (err) {
      showPopup("❌ Failed to load services", "error");
    }
  };

  loadServices();
}, []);


  const handleSubmit = (e) => { e.preventDefault(); showPopup("✅ Franchise updated!"); };
      const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
    const goToManageCustomer = () => {
    router.push("/admin/franchises"); // Customer page
  };
const [states, setStates] = useState([]);
const [cities, setCities] = useState([]);

useEffect(() => {
  const loadStates = async () => {
    const data = await getallStates(1); // India
    setStates(data);

   if (form.state && typeof form.state === "string") {
  const matchedState = data.find(
    (s) => s.name.toLowerCase() === form.state.toLowerCase()
      );

      if (matchedState) {
        setForm((prev) => ({
          ...prev,
          state: matchedState.id,
        }));

        // load cities of that state
        const cityData = await getallCities(matchedState.id);
        setCities(cityData);

        // ✅ AUTO SELECT CITY
        if (form.city) {
          const matchedCity = cityData.find(
            (c) => c.name.toLowerCase() === form.city.toLowerCase()
          );
          if (matchedCity) {
            setForm((prev) => ({
              ...prev,
              city: matchedCity.id,
            }));

            // 🔹 Set pending zoom for map
            pendingZoomRef.current = { name: matchedCity.name };
          }
        }
      }
    }
  };

  loadStates();
}, [form.state, form.city]);



const handleStateChange = async (e) => {
  const stateId = e.target.value;

  setForm({
    ...form,
    state: stateId,
    city: "",
  });

  if (stateId) {
    const cityData = await getallCities(stateId);
    setCities(cityData);

    // 🔹 If form.city already set (edit mode), auto zoom to city
    if (form.city) {
      const matchedCity = cityData.find(c => c.id == form.city);
      if (matchedCity) {
        zoomToLocation({ name: matchedCity.name });
      }
    }
  } else {
    setCities([]);
  }
};
const [isScriptLoaded, setIsScriptLoaded] = useState(false);  
const [isFranchiseLoaded, setIsFranchiseLoaded] = useState(false);
useEffect(() => {
  if (isScriptLoaded) {
    initMap();
  }
}, [isScriptLoaded]);

  return (
    <Layout>
          <PopupAlert message={popupMessage} type={popupType} />
       <Script
                  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_BASE_URL}&libraries=drawing`}
                  strategy="afterInteractive"
                  // onLoad={initMap} 
                  onLoad={() => setIsScriptLoaded(true)}
                />
                
      <div className={styles.editcontainer}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}
              style={{ cursor: "pointer"}}
        onClick={goToManageCustomer}>Franchise</span>
               <span className={styles.separator}> | </span> 
                 <SlHome
                      style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                      onClick={goToDashboard}
                      title="Go to Dashboard"
                    />
                       <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Edit Franchise</span>
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
  onClick={() => {
    setSelectedServices(initialServices);
    setForm({
      ...form,
      services: initialServices.map(s => s.value),
    });
  }}
>
  Reset
</button>

    </div>
   <ReactSelect
  isMulti
  options={serviceOptions}
  value={selectedServices}
  onChange={(selected) => {
    setSelectedServices(selected);
    setForm({
      ...form,
      services: selected.map((s) => s.value),
    });
  }}
  closeMenuOnSelect={false}
  hideSelectedOptions={false}
  placeholder="Select services"
   styles={{
        control: (base) => ({ ...base, minHeight: "32px", height: "35px", fontSize: "13px" }),
        option: (base, state) => ({
          ...base,
          fontSize: "12px",
          padding: "4px 8px",
          backgroundColor: state.isFocused ? "#f1f1f1" : "white",
          color: "black",
        }),
      }}
/>
            </div>

                       <div>
  <label>STATE</label>
  <select
    name="state"
    value={form.state}
    onChange={handleStateChange}
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
  <label>CITY</label>
<select
  name="city"
  value={form.city}
  disabled={!form.state}
  onChange={async (e) => {
    const cityId = e.target.value;
    handleChange(e); // updates form

    const selectedCity = cities.find(c => c.id == cityId);
    if (selectedCity) {
      // 🔹 Zoom map to selected city
      zoomToLocation({ name: selectedCity.name });
    }
  }}
>
  <option value="">Select City</option>
  {cities.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>

</div>

            <div><label>PINCODE</label><input name="pincode" value={form.pincode} onChange={handleChange} /></div>
            <div className={styles.full}><label>FRANCHISE NAME</label><input name="franchiseName" value={form.franchiseName} onChange={handleChange} /></div>
            <div className={styles.full}><label>FIRST ADDRESS</label><input name="firstAddress" value={form.firstAddress} onChange={handleChange} /></div>
           

            <div><label>MOBILE</label><input name="mobile" value={form.mobile} onChange={handleChange} /></div>
            <div><label>EMAIL</label><input name="email" value={form.email} onChange={handleChange} />
</div>
            <div><label>COMMISSION(%)</label><input name="commission" value={form.commission} onChange={handleChange} /></div>
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


  {/*  MAP TYPE ICON BUTTONS (LEFT SIDE) */}
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

          <button type="button" className={styles.submitBtn} style={{ marginTop: "10px" }} onClick={handleLoadPoints}>
            LOAD POINTS
          </button>
          <button type="submit" className={styles.submitBtn}>UPDATE</button>
        </form>
      </div>
    </Layout>
  );
}
