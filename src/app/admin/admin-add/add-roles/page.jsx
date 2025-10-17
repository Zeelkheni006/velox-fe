"use client";

import Layout from "../../pages/page";
import { useState } from "react";
import { FaLayerGroup, FaNetworkWired, FaCogs, FaStar } from "react-icons/fa";
import styles from "../../styles/roles.module.css";

export default function ServiceDashboard() {
  const [expanded, setExpanded] = useState("categories");
  const [roleName, setRoleName] = useState("");

  // ===== Category lists =====
  const [categories, setCategories] = useState([
    { name: "Category", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);

  const [subCategories, setSubCategories] = useState([
    { name: "Sub Category", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);

  const [services, setServices] = useState([
    { name: "Service", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
    { name: "Manage Media", enabled: false },
  ]);

  const [bestServices, setBestServices] = useState([
    { name: "Best Service", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);

  const [serviceSpecs, setServiceSpecs] = useState([
    { name: "Service Specification", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);

  const [serviceFaq, setServiceFaq] = useState([
    { name: "Service FAQ", enabled: false },
    { name: "Add", enabled: false },
    { name: "Edit", enabled: false },
    { name: "Delete", enabled: false },
    { name: "Status", enabled: false },
  ]);
  const [packages, setPackages] = useState([
  { name: "Package", enabled: false },
  { name: "Add", enabled: false },
  { name: "Edit", enabled: false },
  { name: "Delete", enabled: false },
  { name: "Status", enabled: false },
  { name: "Manage Media", enabled: false },
]);

  // ===== Toggle Functions =====
  const toggleItem = (index, type) => {
    let data;
    if (type === "categories") data = [...categories];
    else if (type === "subcategories") data = [...subCategories];
    else if (type === "services") data = [...services];
    else if (type === "bestservices") data = [...bestServices];
    else if (type === "serviceSpecs") data = [...serviceSpecs];
    else if (type === "serviceFaq") data = [...serviceFaq];
      else if (type === "packages") data = [...packages];

    data[index].enabled = !data[index].enabled;

    // Child ON → enable parent
    if (index > 0 && data[index].enabled) data[0].enabled = true;

    // All children OFF → disable parent
    if (index > 0 && !data.slice(1).some((item) => item.enabled)) data[0].enabled = false;

    // Parent OFF → disable all
    if (index === 0 && !data[0].enabled) data.forEach((item) => (item.enabled = false));

    if (type === "categories") setCategories(data);
    else if (type === "subcategories") setSubCategories(data);
    else if (type === "services") setServices(data);
    else if (type === "bestservices") setBestServices(data);
    else if (type === "serviceSpecs") setServiceSpecs(data);
      else if (type === "serviceFaq") setServiceFaq(data);
    else if (type === "packages") setPackages(data);
    else setServiceFaq(data);
  };

  const toggleAll = (checked, type) => {
    let updated;
    if (type === "categories") updated = categories.map((c) => ({ ...c, enabled: checked }));
    else if (type === "subcategories") updated = subCategories.map((c) => ({ ...c, enabled: checked }));
    else if (type === "services") updated = services.map((c) => ({ ...c, enabled: checked }));
    else if (type === "bestservices") updated = bestServices.map((c) => ({ ...c, enabled: checked }));
    else if (type === "serviceSpecs") updated = serviceSpecs.map((c) => ({ ...c, enabled: checked }));
    else if (type === "serviceFaq") updated = serviceFaq.map((c) => ({ ...c, enabled: checked }));
 else if (type === "packages") updated = packages.map((c) => ({ ...c, enabled: checked }));

    if (type === "categories") setCategories(updated);
    else if (type === "subcategories") setSubCategories(updated);
    else if (type === "services") setServices(updated);
    else if (type === "bestservices") setBestServices(updated);
    else if (type === "serviceSpecs") setServiceSpecs(updated);
    else if (type === "serviceFaq") setServiceFaq(updated);
      else if (type === "packages") setPackages(updated);
  };

  // ===== Panels =====
  const panels = [
    { id: "categories", title: "Categories", icon: <FaLayerGroup /> },
    { id: "subcategories", title: "Sub Categories", icon: <FaNetworkWired /> },
    { id: "services", title: "Services", icon: <FaCogs /> },
    { id: "packages", title: "Packages", icon: <FaStar /> },
  ];

  // ===== Render panel body =====
  const renderPanelBody = (items, type) => (
    <div className={styles.panelBody}>
      <div className={styles.actionsRow}>
        <label className={styles.selectAll}>
          <input type="checkbox" onChange={(e) => toggleAll(e.target.checked, type)} />
          Select All {type}
        </label>
      </div>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.categoryItem}>
            <label className={styles.categoryLabel}>{item.name}</label>
            <label className={styles.switch}>
              <input type="checkbox" checked={item.enabled} onChange={() => toggleItem(i, type)} />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  // ===== Render page =====
  return (
    <Layout>
      <div className={styles.rols}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <span>Roles</span> &gt; <span className={styles.active}>Add Roles</span>
          </div>
        </div>

        <div className={styles.card1}>
          <h2 className={styles.name}>NAME *</h2>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter role name"
            className={styles.input}
          />

          <h2 className={styles.cardTitle1}>Permissions</h2>

          {panels.map((panel) => (
            <div key={panel.id} className={styles.panelBox}>
              <div
                className={`${styles.panelHeader} ${expanded === panel.id ? styles.panelHeaderActive : ""}`}
                onClick={() => setExpanded(expanded === panel.id ? null : panel.id)}
              >
                <div className={styles.panelTitle}>
                  {panel.icon} {panel.title}
                </div>
                <span className={styles.arrow}>{expanded === panel.id ? "▴" : "▾"}</span>
              </div>

              {expanded === panel.id && panel.id === "categories" && renderPanelBody(categories, "categories")}
              {expanded === panel.id && panel.id === "subcategories" && renderPanelBody(subCategories, "subcategories")}
              {expanded === panel.id && panel.id === "services" && (
                <div>
                 
                  {renderPanelBody(services, "services")}

                  <hr className={styles.divider} />

                  
                  {renderPanelBody(bestServices, "bestservices")}

                  <hr className={styles.divider} />

                  
                  {renderPanelBody(serviceSpecs, "serviceSpecs")}

                  <hr className={styles.divider} />

                 
                  {renderPanelBody(serviceFaq, "serviceFaq")}
                </div>
              )}

              {expanded === panel.id && panel.id === "packages" && (
                 <div>
                  {renderPanelBody(packages, "packages")}
                </div>
             
             )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
