"use client";

import React, { useState, useMemo } from "react";
import Layout from "../pages/page";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./location.css";


export default function LocationPage() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [locationsList, setLocationsList] = useState([]);

  // Sorting config
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Pagination and Search states
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Dropdown data
  const countries = ["India", "USA"];
  const states = {
    India: ["Gujarat", "Maharashtra", "Rajasthan"],
    USA: ["California", "Texas", "Florida"],
  };
  const cities = {
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
    California: ["Los Angeles", "San Francisco", "San Diego"],
    Texas: ["Houston", "Dallas", "Austin"],
    Florida: ["Miami", "Orlando", "Tampa"],
  };

  // Coordinates for map
  const coordinates = {
    India: { lat: 22.5937, lng: 78.9629 },
    USA: { lat: 37.0902, lng: -95.7129 },
    Gujarat: { lat: 22.2587, lng: 71.1924 },
    Maharashtra: { lat: 19.7515, lng: 75.7139 },
    Rajasthan: { lat: 27.0238, lng: 74.2179 },
    California: { lat: 36.7783, lng: -119.4179 },
    Texas: { lat: 31.9686, lng: -99.9018 },
    Florida: { lat: 27.9944, lng: -81.7603 },
    Ahmedabad: { lat: 23.0225, lng: 72.5714 },
    Surat: { lat: 21.1702, lng: 72.8311 },
    Vadodara: { lat: 22.3072, lng: 73.1812 },
    Mumbai: { lat: 19.076, lng: 72.8777 },
    Pune: { lat: 18.5204, lng: 73.8567 },
    Nagpur: { lat: 21.1458, lng: 79.0882 },
    Jaipur: { lat: 26.9124, lng: 75.7873 },
    Udaipur: { lat: 24.5854, lng: 73.7125 },
    Jodhpur: { lat: 26.2389, lng: 73.0243 },
    "Los Angeles": { lat: 34.0522, lng: -118.2437 },
    "San Francisco": { lat: 37.7749, lng: -122.4194 },
    "San Diego": { lat: 32.7157, lng: -117.1611 },
    Houston: { lat: 29.7604, lng: -95.3698 },
    Dallas: { lat: 32.7767, lng: -96.797 },
    Austin: { lat: 30.2672, lng: -97.7431 },
    Miami: { lat: 25.7617, lng: -80.1918 },
    Orlando: { lat: 28.5383, lng: -81.3792 },
    Tampa: { lat: 27.9506, lng: -82.4572 },
  };

  // Create map markers
  const markers = useMemo(() => {
    const m = [];
    if (country) m.push({ position: coordinates[country], color: "red" });
    if (state) m.push({ position: coordinates[state], color: "blue" });
    if (city) m.push({ position: coordinates[city], color: "green" });
    return m;
  }, [country, state, city]);

  const mapCenter = markers.length
    ? markers[markers.length - 1].position
    : { lat: 20, lng: 77 };

  // Add location entry
  const handleSubmit = () => {
    if (!country || !state || !city) {
      alert("Please select Country, State, and City first!");
      return;
    }
    const newEntry = { country, state, city };
    setLocationsList([...locationsList, newEntry]);
    setCountry("");
    setState("");
    setCity("");
  };

  // Delete entry
  const handleDelete = (index) => {
    const updated = locationsList.filter((_, i) => i !== index);
    setLocationsList(updated);
  };

  // ✅ Sorting logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...locationsList].sort((a, b) => {
      const aVal = a[key].toLowerCase();
      const bVal = b[key].toLowerCase();
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setLocationsList(sorted);
  };

  const SortArrow = ({ direction }) => (
    <span style={{ marginLeft: "5px", fontSize: "12px" }}>
      {direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}
    </span>
  );

  // Filtered, searched, and paginated data
  const filteredLocations = locationsList.filter(
    (loc) =>
      loc.country.toLowerCase().includes(search.toLowerCase()) ||
      loc.state.toLowerCase().includes(search.toLowerCase()) ||
      loc.city.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLocations.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, filteredLocations.length);
  const currentEntries = filteredLocations.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="location-container">
        <h2 className="title">Select Your Location</h2>

        {/* Select Boxes */}
        <div className="select-boxes">
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState("");
              setCity("");
            }}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setCity("");
            }}
            disabled={!country}
          >
            <option value="">Select State</option>
            {country &&
              states[country].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!state}
          >
            <option value="">Select City</option>
            {state &&
              cities[state].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>

        {/* Google Map */}
        <div className="map">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={mapCenter}
              zoom={markers.length ? 6 : 4}
              mapTypeId="roadmap"
              options={{
                streetViewControl: false,
                fullscreenControl: true,
                mapTypeControl: true,
                zoomControl: true,
              }}
            >
              {markers.map((m, index) => (
                <Marker
                  key={index}
                  position={m.position}
                  icon={{
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                    fillColor: m.color,
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 1.5,
                  }}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        {/* Table Section */}
        <div className="table-section">
          <h3 className="table-title">Selected Locations</h3>

          {/* Search and Entries */}
          <div className="showEntries">
            <label>
              Show{" "}
              <select
                className="select1"
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "}
              entries
            </label>

            <label className="searchLabel">
              Search:{" "}
              <input
                type="text"
                placeholder="Search..."
                className="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </label>
          </div>

          {/* Table */}
          <table className="location-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("country")} style={{ cursor: "pointer" }}>
                  Country{" "}
                  <SortArrow direction={sortConfig.key === "country" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("state")} style={{ cursor: "pointer" }}>
                  State{" "}
                  <SortArrow direction={sortConfig.key === "state" ? sortConfig.direction : null} />
                </th>
                <th onClick={() => handleSort("city")} style={{ cursor: "pointer" }}>
                  City{" "}
                  <SortArrow direction={sortConfig.key === "city" ? sortConfig.direction : null} />
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentEntries.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
                    No locations found
                  </td>
                </tr>
              ) : (
                currentEntries.map((loc, index) => (
                  <tr key={index}>
                    <td>{loc.country}</td>
                    <td>{loc.state}</td>
                    <td>{loc.city}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(startIndex + index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <span>
              {filteredLocations.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredLocations.length} entries`}
            </span>

            <div className="paginationControls">
              <button
                className="paginationButton"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pageNumber">{currentPage}</span>
              <button
                className="paginationButton"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
