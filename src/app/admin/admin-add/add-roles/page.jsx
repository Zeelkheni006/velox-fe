"use client";

import React from "react";
import styles from "../../styles/roles.module.css";
import Layout from "../../pages/page";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

const AddRole = () => {
 
 const searchParams = useSearchParams();
 const [roleName, setRoleName] = useState('');

  const isEditMode = Boolean(roleName);

  const [formData, setFormData] = useState({
    name: '',
    permissions: '',
  });

  // Dummy role data (same as in rolesData)
  const rolesData = [
    // ...paste your rolesData array here or import it
  ];

  useEffect(() => {
    if (isEditMode) {
      const roleToEdit = rolesData.find(role => role.name === roleName);
      if (roleToEdit) {
        setFormData({
          name: roleToEdit.name,
          permissions: roleToEdit.permissions.join(', '),
        });
      }
    }
  }, [roleName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Call your "update" API
      console.log("Saving updated role:", formData);
    } else {
      // Call your "create" API
      console.log("Creating new role:", formData);
    }
  };

const [sections, setSections] = useState({
  category: { main: false, add: false, edit: false, delete: false, status: false },
  subCategory: { main: false, add: false, edit: false, delete: false, status: false },
  services: { main: false, add: false, edit: false, delete: false, status: false, manageMedia: false,   serviceFAQ: false },
  bestServices:{main:false, add:false,edit:false,delete:false,status:false },
  serviceSpecs:{main:false,add:false,edit:false,delete:false,status:false},
  serviceFAQ:{main:false,add:false,edit:false,delete:false,status:false},
  packages: { main: false, add: false, edit: false, delete: false, status: false, manageMedia: false },
  leads: { main: false, add: false, edit: false, delete: false, status: false, addUser: false },
  franchises: { main: false, add: false, edit: false, delete: false, status: false },
  franchisesuser: { main: false, edit: false, delete: false },
  offers: { main: false, add: false, edit: false, delete: false, status: false},
  bestOffers:{ main: false, add: false, edit: false, delete: false, status: false },
  gifts: { main: false, add: false, edit: false, delete: false, status: false, addUser: false},
  sendGifts:{main:false},
  orders: { main: false, view: false, delete: false, status: false, invoice: false, franchiseAssigned: false },
  UnallocatedOrders:{ main: false, view: false, delete: false, status: false,  franchiseAssigned: false },
  accounts: { main: false, income: false, franchiseFees: false, franchiseOutstandings: false },
  payments: { main: false, add: false, edit: false, delete: false},
  creditPlans:{main: false, add: false, edit: false, delete: false, status: false,editCreditPrice: false},
  customPlans:{main: false},
  serviceRating: {main : false,add: false, edit: false, delete: false, status: false},
  packageRating:{main:false,add: false, edit: false, delete: false, status: false},
  orderReview:{main:false},
  testimonial:{main:false,add: false, edit: false, status: false},
  slider: { main: false, add: false, edit: false, delete: false, status: false },
  aboutUs: { main:false, add: false, edit: false, delete: false, },
  blog:{main:false,add: false, edit: false, delete: false, status: false},
  newsletter:{main:false ,SendNewsLetter:false,delete: false},
  ReferralProgram :{main:false},
  requestQuotes:{main:false,delete: false, status: false},
  followUps:{main:false ,delete: false, status: false},
  contact:{main:false ,delete: false, status: false},
  franchiseservice: {main:false, edit: false },
  franchiseorders:{main:false,view: false, status: false, invoice: false},
  franchiseTiming:{main:false,add: false,edit:false,delete: false},
  franchiseworker:{main:false,add: false,edit:false,delete: false,status:false},
  manageCredit:{main:false,add: false},
  request:{main:false,delete:false, status:false},
  franchiseprofile:{main:false},
account:{main:false},
});

  // Handle checkbox changes
 const handleSectionToggle = (sectionName, key) => {
  setSections((prev) => {
    const section = { ...prev[sectionName] };
    section[key] = !section[key];

    // ✅ If a dependent checkbox is turned ON → auto-enable parent
    if (key !== "main" && section[key]) {
      if ('main' in section) section.main = true;
    }

    // ✅ If parent is turned OFF → turn OFF all dependents
    if (key === "main" && !section[key]) {
      Object.keys(section).forEach(k => section[k] = false);
    }

    return { ...prev, [sectionName]: section };
  });
};
  return (
    <Layout>
      <div className={styles.container1}>
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
            // optional: prevent changing role name during edit
          />

          <h2 className={styles.cardTitle1}>Permissions</h2>

          {/* Category Permission Row */}
        <div className={styles.permissionSection}>
        <h3 className={styles.sectionHeading}>
    Category
    {/* Master toggle button for the entire category */}
    <input
      type="checkbox"
      className={styles.toggle1}
      checked={
        sections.category.main &&
        sections.category.add &&
        sections.category.edit &&
        sections.category.delete &&
        sections.category.status
      }
      onChange={(e) => {
        const checked = e.target.checked;
        setSections((prev) => ({
          ...prev,
          category: {
            main: checked,
            add: checked,
            edit: checked,
            delete: checked,
            status: checked,
          },
        }));
      }}
    />
  </h3>
 
      <div className={styles.permissionRow}>
   <div className={styles.permissionGroup}>
  <label className={styles.permissionLabel}>CATEGORIES *</label>
  <input
    type="checkbox"
    className={styles.toggle}
    checked={sections.category.main}
    onChange={() => handleSectionToggle("category", "main")}
  />
</div>

   <div className={styles.permissionGroup}>
  <label className={styles.permissionLabel}>ADD *</label>
  <input
    type="checkbox"
    className={styles.toggle}
    checked={sections.category.add}
    onChange={() => handleSectionToggle("category", "add")}
  />
</div>

     <div className={styles.permissionGroup}>
  <label className={styles.permissionLabel}>EDIT *</label>
  <input
    type="checkbox"
    className={styles.toggle}
    checked={sections.category.edit}
    onChange={() => handleSectionToggle("category", "edit")}
  />
</div>

        <div className={styles.permissionGroup}>
          <label className={styles.permissionLabel}>DELETE *</label>
          <input
            type="checkbox"
            className={styles.toggle}
            checked={sections.category.delete}
            onChange={() => handleSectionToggle("category","delete")}
          />
        </div>

        <div className={styles.permissionGroup}>
          <label className={styles.permissionLabel}>STATUS *</label>
          <input
            type="checkbox"
            className={styles.toggle}
            checked={sections.category.status}
            onChange={() => handleSectionToggle("category","status")}
          />
        </div>
      </div>
    </div>
            <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Sub Category
                  <input
      type="checkbox"
      className={styles.toggle1}
      checked={
        sections.subCategory.main &&
        sections.subCategory.add &&
        sections.subCategory.edit &&
        sections.subCategory.delete &&
        sections.subCategory.status
      }
      onChange={(e) => {
        const checked = e.target.checked;
        setSections((prev) => ({
          ...prev,
          subCategory: {
            main: checked,
            add: checked,
            edit: checked,
            delete: checked,
            status: checked,
          },
        }));
      }}
    />
            </h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SUB CATEGORY *</label>
                <input
    type="checkbox"
    className={styles.toggle}
    checked={sections.subCategory.main}
    onChange={() => handleSectionToggle("subCategory", "main")}
  />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                  <input
    type="checkbox"
    className={styles.toggle}
    checked={sections.subCategory.add}
    onChange={() => handleSectionToggle("subCategory", "add")}
  />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
              <input
    type="checkbox"
    className={styles.toggle}
    checked={sections.subCategory.edit}
    onChange={() => handleSectionToggle("subCategory", "edit")}
  />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.subCategory.delete}
        onChange={() => handleSectionToggle("subCategory", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.subCategory.status}
        onChange={() => handleSectionToggle("subCategory", "status")}
      />
              </div>
            </div>
          </div>  
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Services</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SERVICES *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.services.main}
        onChange={() => handleSectionToggle("services", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.services.add}
        onChange={() => handleSectionToggle("services", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.services.edit}
        onChange={() => handleSectionToggle("services", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.services.delete}
        onChange={() => handleSectionToggle("services", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.services.status}
        onChange={() => handleSectionToggle("services", "status")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>MANAGE MEDIA *</label>
                            <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.services.manageMedia}
        onChange={() => handleSectionToggle("services", "manageMedia")}
      />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>BEST SERVICES  *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestServices.main}
        onChange={() => handleSectionToggle("bestServices", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
               <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestServices.add}
        onChange={() => handleSectionToggle("bestServices", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestServices.edit}
        onChange={() => handleSectionToggle("bestServices", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestServices.delete}
        onChange={() => handleSectionToggle("bestServices", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestServices.status}
        onChange={() => handleSectionToggle("bestServices", "status")}
      />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SERVICE SPECIFICATIONS *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceSpecs.main}
        onChange={() => handleSectionToggle("serviceSpecs", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceSpecs.add}
        onChange={() => handleSectionToggle("serviceSpecs", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceSpecs.edit}
        onChange={() => handleSectionToggle("serviceSpecs", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceSpecs.delete}
        onChange={() => handleSectionToggle("serviceSpecs", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceSpecs.status}
        onChange={() => handleSectionToggle("serviceSpecs", "status")}
      />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SERVICE FAQ *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceFAQ.main}
        onChange={() => handleSectionToggle("serviceFAQ", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceFAQ.add}
        onChange={() => handleSectionToggle("serviceFAQ", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceFAQ.edit}
        onChange={() => handleSectionToggle("serviceFAQ", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceFAQ.delete}
        onChange={() => handleSectionToggle("serviceFAQ", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceFAQ.status}
        onChange={() => handleSectionToggle("serviceFAQ", "status")}
      />
              </div>
            </div>
          </div>
               <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Packages</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>PACKAGES *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packages.main}
        onChange={() => handleSectionToggle("packages", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
              <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packages.add}
        onChange={() => handleSectionToggle("packages", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packages.edit}
        onChange={() => handleSectionToggle("packages", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packages.delete}
        onChange={() => handleSectionToggle("packages", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packages.status}
        onChange={() => handleSectionToggle("packages", "status")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>MANAGE MEDIA *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packages.manageMedia}
        onChange={() => handleSectionToggle("packages", "manageMedia")}
      />
              </div>
            </div>
          </div>
                 <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Leads</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>LEADS *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.leads.main}
        onChange={() => handleSectionToggle("leads", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.leads.add}
        onChange={() => handleSectionToggle("leads", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.leads.edit}
        onChange={() => handleSectionToggle("leads", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.leads.delete}
        onChange={() => handleSectionToggle("leads", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.leads.status}
        onChange={() => handleSectionToggle("leads", "status")}
      />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD USER *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.leads.addUser }
        onChange={() => handleSectionToggle("leads", "addUser ")}
      />
              </div>
            </div>
          </div>
                <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Franchises</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISES *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchises.main}
        onChange={() => handleSectionToggle("franchises", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchises.add}
        onChange={() => handleSectionToggle("franchises", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchises.edit}
        onChange={() => handleSectionToggle("franchises", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchises.delete}
        onChange={() => handleSectionToggle("franchises", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchises.status}
        onChange={() => handleSectionToggle("franchises", "status")}
      />
              </div>
            </div>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISES USER*</label>
                      <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchisesuser.main}
        onChange={() => handleSectionToggle("franchisesuser", "main")}
      />
              </div>
              
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchisesuser.edit}
        onChange={() => handleSectionToggle("franchisesuser", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchisesuser.delete}
        onChange={() => handleSectionToggle("franchisesuser", "delete")}
      />
              </div>
            </div>
          </div>
            <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Offers</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>OFFERS *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.offers.main}
        onChange={() => handleSectionToggle("offers", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
               <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.offers.add}
        onChange={() => handleSectionToggle("offers", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.offers.edit}
        onChange={() => handleSectionToggle("offers", "edit")}
      />  
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.offers.delete}
        onChange={() => handleSectionToggle("offers", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.offers.status}
        onChange={() => handleSectionToggle("offers", "status")}
      />
              </div>
            </div>
              <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>BEST OFFERS *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestOffers .main}
        onChange={() => handleSectionToggle("bestOffers", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestOffers.add}
        onChange={() => handleSectionToggle("bestOffers", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestOffers.edit}
        onChange={() => handleSectionToggle("bestOffers", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestOffers.delete}
        onChange={() => handleSectionToggle("bestOffers", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.bestOffers.status}
        onChange={() => handleSectionToggle("bestOffers", "status")}
      />
              </div>
            </div>
          </div>
                <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Gifts</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>GIFTS *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.gifts.main}
        onChange={() => handleSectionToggle("gifts", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.gifts.add}
        onChange={() => handleSectionToggle("gifts", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.gifts.edit}
        onChange={() => handleSectionToggle("gifts", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.gifts.delete}
        onChange={() => handleSectionToggle("gifts", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                      <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.gifts.status}
        onChange={() => handleSectionToggle("gifts", "status")}
      />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD USER *</label>
                      <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.gifts.status}
        onChange={() => handleSectionToggle("gifts", "status")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SEND GIFTS *</label>
                             <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.sendGifts.main}
        onChange={() => handleSectionToggle("sendGifts", "main")}
      />
              </div>
            </div>
          </div>
          <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Orders</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ORDERS *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.orders.main}
        onChange={() => handleSectionToggle("orders", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>VIEW *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.orders.view}
        onChange={() => handleSectionToggle("orders", "view")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.orders.delete}
        onChange={() => handleSectionToggle("orders", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.orders.status}
        onChange={() => handleSectionToggle("orders", "status")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>INVOICE *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.orders.invoice}
        onChange={() => handleSectionToggle("orders", "invoice")}
      />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE ASSIGNED *</label>
                              <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.orders.franchiseAssigned}
        onChange={() => handleSectionToggle("orders", "franchiseAssigned")}
      />
              </div>
            </div>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>UNALLOCATED ORDERS *</label>
                              <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.UnallocatedOrders.main}
        onChange={() => handleSectionToggle("UnallocatedOrders", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>VIEW *</label>
                           <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.UnallocatedOrders.view}
        onChange={() => handleSectionToggle("UnallocatedOrders", "view")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.UnallocatedOrders.delete}
        onChange={() => handleSectionToggle("UnallocatedOrders", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.UnallocatedOrders.status}
        onChange={() => handleSectionToggle("UnallocatedOrders", "status")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE ASSIGNED *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.UnallocatedOrders.franchiseAssigned}
        onChange={() => handleSectionToggle("UnallocatedOrders", "franchiseAssigned")}
      />
              </div>
            </div>
          </div>
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Accounts</h3>
            <div className={styles.permissionRow1}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ACCOUNTS *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.accounts.main}
        onChange={() => handleSectionToggle("accounts", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>INCOME *</label>
                             <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.accounts.invoice}
        onChange={() => handleSectionToggle("accounts", "invoice")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE FEES *</label>
                            <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.accounts.franchiseFees}
        onChange={() => handleSectionToggle("accounts", "franchiseFees")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE OUTSTANDINGS *</label>
                           <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.accounts.franchiseOutstandings}
        onChange={() => handleSectionToggle("accounts", "franchiseOutstandings")}
      />
              </div>
            </div>
          </div>
          <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Payments</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>PAYMENTS *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.payments.main}
        onChange={() => handleSectionToggle("payments", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.payments.add}
        onChange={() => handleSectionToggle("payments", "add")}
      />

              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.payments.edit}
        onChange={() => handleSectionToggle("payments", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.payments.delete}
        onChange={() => handleSectionToggle("payments", "delete")}
      />
              </div>
            </div>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>CREDIT PLANS  *</label>
                        <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.creditPlans.main}
        onChange={() => handleSectionToggle("creditPlans", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.creditPlans.add}
        onChange={() => handleSectionToggle("creditPlans", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
               <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.creditPlans.edit}
        onChange={() => handleSectionToggle("creditPlans", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <nput
        type="checkbox"
        className={styles.toggle}
        checked={sections.creditPlans.delete}
        onChange={() => handleSectionToggle("creditPlans", "delete")}
      />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.creditPlans.status}
        onChange={() => handleSectionToggle("creditPlans", "status")}
      />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT CREDIT PRICE *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.creditPlans.editCreditPrice}
        onChange={() => handleSectionToggle("creditPlans", "editCreditPrice")}
      />
              </div>
            </div>
            <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>CUSTOME PLANS  *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.customPlans.main}
        onChange={() => handleSectionToggle("customPlans", "main")}
      />
              </div>
          </div>
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Ratings</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SERVICE RATINGS *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceRating.main}
        onChange={() => handleSectionToggle("serviceRating", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
               <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceRating.add}
        onChange={() => handleSectionToggle("serviceRating", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceRating.edit}
        onChange={() => handleSectionToggle("serviceRating", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceRating.delete}
        onChange={() => handleSectionToggle("serviceRating", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.serviceRating.status}
        onChange={() => handleSectionToggle("serviceRating", "status")}
      />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>PACKAGE RATING  *</label>
                      <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packageRating.main}
        onChange={() => handleSectionToggle("packageRating", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packageRating.add}
        onChange={() => handleSectionToggle("packageRating", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packageRating.edit}
        onChange={() => handleSectionToggle("packageRating", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packageRating.delete}
        onChange={() => handleSectionToggle("packageRating", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.packageRating.status}
        onChange={() => handleSectionToggle("packageRating", "status")}
      />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ORDER REVIEW   *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.orderReview.main}
        onChange={() => handleSectionToggle("orderReview", "main")}
      />
              </div>
            </div>
               <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>TESTIMONIAL  *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.testimonial.main}
        onChange={() => handleSectionToggle("testimonial", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.testimonial.add}
        onChange={() => handleSectionToggle("testimonial", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.testimonial.edit}
        onChange={() => handleSectionToggle("testimonial", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.testimonial.status}
        onChange={() => handleSectionToggle("testimonial", "status")}
      />
              </div>
            </div>
          </div>
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Slider</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SLIDER *</label>
               <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.slider.main}
        onChange={() => handleSectionToggle("slider", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.slider.add}
        onChange={() => handleSectionToggle("slider", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.slider.edit}
        onChange={() => handleSectionToggle("slider", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.slider.delete}
        onChange={() => handleSectionToggle("slider", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                      <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.slider.status}
        onChange={() => handleSectionToggle("slider", "status")}
      />
              </div>
            </div>
          </div>
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Manage Pages</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ABOUT US *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.aboutUs.main}
        onChange={() => handleSectionToggle("aboutUs", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.aboutUs.add}
        onChange={() => handleSectionToggle("aboutUs", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.aboutUs.edit}
        onChange={() => handleSectionToggle("aboutUs", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.aboutUs.delete}
        onChange={() => handleSectionToggle("aboutUs", "delete")}
      />
              </div>
            </div>
          </div>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>BLOG *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.blog.main}
        onChange={() => handleSectionToggle("blog", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
               <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.blog.add}
        onChange={() => handleSectionToggle("blog", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.blog.edit}
        onChange={() => handleSectionToggle("blog", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.blog.delete}
        onChange={() => handleSectionToggle("blog", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.blog.status}
        onChange={() => handleSectionToggle("blog", "status")}
      />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>NEWS LETTER *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.newsletter.main}
        onChange={() => handleSectionToggle("newsletter", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SEND NEWS LETTER *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.newsletter.SendNewsLetter}
        onChange={() => handleSectionToggle("newsletter", "SendNewsLetter")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.newsletter.delete}
        onChange={() => handleSectionToggle("newsletter", "delete")}
      />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>REFERRAL PROGRAM *</label>
                          <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.ReferralProgram.main}
        onChange={() => handleSectionToggle("ReferralProgram", "main")}
      />
              </div>
            </div>
                   <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>REQUESET QUOTES *</label>
                       <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.requestQuotes.main}
        onChange={() => handleSectionToggle("requestQuotes", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                           <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.requestQuotes.delete}
        onChange={() => handleSectionToggle("requestQuotes", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                 <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.requestQuotes.status}
        onChange={() => handleSectionToggle("requestQuotes", "status")}
      />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FOLLOWUPS *</label>
                          <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.followUps.main}
        onChange={() => handleSectionToggle("followUps", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.followUps.delete}
        onChange={() => handleSectionToggle("followUps", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.followUps.status}
        onChange={() => handleSectionToggle("followUps", "status")}
      />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>CONTACT *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.contact.main}
        onChange={() => handleSectionToggle("contact", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.contact.delete}
        onChange={() => handleSectionToggle("contact", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.contact.status}
        onChange={() => handleSectionToggle("contact", "status")}
      />
              </div>
            </div>
             <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Franchise (Only For Franchise Role)</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE SERVICE *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseservice.main}
        onChange={() => handleSectionToggle("franchiseservice", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseservice.edit}
        onChange={() => handleSectionToggle("franchiseservice", "edit")}
      />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE ORDERS *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseorders.main}
        onChange={() => handleSectionToggle("franchiseorders", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>VIEW *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseorders.add}
        onChange={() => handleSectionToggle("franchiseorders", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseorders.status}
        onChange={() => handleSectionToggle("franchiseorders", "status")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>INVOICE *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseorders.invoice}
        onChange={() => handleSectionToggle("franchiseorders", "invoice")}
      />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE TIMING *</label>
                            <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseTiming.main}
        onChange={() => handleSectionToggle("franchiseTiming", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseTiming.add}
        onChange={() => handleSectionToggle("franchiseTiming", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseTiming.edit}
        onChange={() => handleSectionToggle("franchiseTiming", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseTiming.delete}
        onChange={() => handleSectionToggle("franchiseTiming", "delete")}
      />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE WORKER *</label>
                   <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseworker.main}
        onChange={() => handleSectionToggle("franchiseworker", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseworker.add}
        onChange={() => handleSectionToggle("franchiseworker", "add")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseworker.edit}
        onChange={() => handleSectionToggle("franchiseworker", "edit")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseworker.delete}
        onChange={() => handleSectionToggle("franchiseworker", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseworker.status}
        onChange={() => handleSectionToggle("franchiseworker", "status")}
      />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>MANAGE CREDIT  *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.manageCredit.main}
        onChange={() => handleSectionToggle("manageCredit", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.manageCredit.add}
        onChange={() => handleSectionToggle("manageCredit", "add")}
      />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>REQUEST  *</label>
                    <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.request.main}
        onChange={() => handleSectionToggle("request", "main")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.request.delete}
        onChange={() => handleSectionToggle("request", "delete")}
      />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.request.status}
        onChange={() => handleSectionToggle("request", "status")}
      />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE PROFILE *</label>
                                  <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.franchiseprofile.main}
        onChange={() => handleSectionToggle("franchiseprofile", "main")}
      />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ACCOUNT *</label>
                     <input
        type="checkbox"
        className={styles.toggle}
        checked={sections.account.main}
        onChange={() => handleSectionToggle("account", "main")}
      />
              </div>
            </div>
          </div>
             
      
          <button className={styles.btncreate}> {isEditMode ? 'Save' : 'Create Role'}</button>
            
        </div>
          
      </div>
      <ScrollToTopButton />
    </Layout>
  );
};

export default AddRole;
