"use client";

import React from "react";
import styles from "../styles/roles.module.css";
import Layout from "../pages/page";
import ScrollToTopButton from "../components/ScrollToTopButton";
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
  return (
    <Layout>
      <div className={styles.container1}>
              <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <span>Roles</span> &gt; <span className={styles.active}>Edit Roles</span>
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
            readOnly={isEditMode} // optional: prevent changing role name during edit
          />

          <h2 className={styles.cardTitle1}>Permissions</h2>

          {/* Category Permission Row */}
          <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Category</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>CATEGORIES *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
            <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Sub Category</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SUB CATEGORY *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Services</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SERVICES *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>MANAGE MEDIA *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>BEST SERVICES  *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SERVICE SPECIFICATIONS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SERVICE FAQ *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
               <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Packages</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>PACKAGES *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>MANAGE MEDIA *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
                 <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Leads</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>LEADS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD USER *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
                <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Franchises</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISES *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISES *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
            <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Offers</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>OFFERS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
              <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>BEST OFFERS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
                <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Gifts</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>GIFTS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD USER *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SEND GIFTS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
          <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Orders</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ORDERS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>VIEW *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>INVOICE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE ASSIGNED *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>UNALLOCATED ORDERS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>VIEW *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE ASSIGNED *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Accounts</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ACCOUNTS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>INCOME *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE FEES *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE OUTSTANDINGS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
          <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Payments</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>PAYMENTS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>CREDIT PLANS  *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
               <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT CREDIT PRICE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
            <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>CUSTOME PLANS  *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
          </div>
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Ratings</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SERVICE RATINGS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>PACKAGE RATING  *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ORDER REVIEW   *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
               <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>TESTIMONIAL  *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Slider</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SLIDER *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
           <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Manage Pages</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ABOUT US *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>BLOG *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>NEWS LETTER *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>SEND NEWS LETTER *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>REFERRAL PROGRAM *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
                   <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>REQUESET QUOTES *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FOLLOWUPS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>CONTACT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
             <div className={styles.permissionSection}>
            <h3 className={styles.sectionHeading}>Franchise (Only For Franchise Role)</h3>
            <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE SERVICE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE ORDERS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>VIEW *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>INVOICE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE TIMING *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE WORKER *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>EDIT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>MANAGE CREDIT  *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ADD *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>REQUEST  *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>DELETE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>STATUS *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>FRANCHISE PROFILE *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
                  <div className={styles.permissionRow}>
              <div className={styles.permissionGroup}>
                <label className={styles.permissionLabel}>ACCOUNT *</label>
                <input type="checkbox" className={styles.toggle} />
              </div>
            </div>
          </div>
             
      
          <button className={styles.btncreate}> {isEditMode ? 'Save' : 'Update'}</button>
            
        </div>
          
      </div>
      <ScrollToTopButton />
    </Layout>
  );
};

export default AddRole;
