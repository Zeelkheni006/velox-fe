"use client";

import React, { useState } from "react";
import Layout from "../pages/page";
import styles from "../styles/customcreditplan.module.css";
import { SlHome } from "react-icons/sl";
import { useRouter } from "next/navigation";

export default function CustomCreditPlanPage() {
  const [checked, setChecked] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState("");
  const [price, setPrice] = useState("10"); // example base price
  const [credit, setCredit] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checked) {
      alert(
        `Custom Plan:\nPrice: ${price}\nCredit: ${credit}\nAmount: ${amount}\nFranchise: ${selectedFranchise}`
      );
    } else {
      alert(`Selected Plan: ${selectedPlan}\nFranchise: ${selectedFranchise}`);
    }
  };

  const handleCreditChange = (e) => {
    const value = e.target.value;
    setCredit(value);
    if (price) setAmount(Number(price) * Number(value));
  };
  const goToDashboard = () => {
    router.push("/admin/dashboard"); // Replace with your dashboard route
  };
  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}style={{ cursor: "pointer"}}>Custome Credit plan</span>
                  <span className={styles.separator}> | </span>
                           <SlHome
                                  style={{ verticalAlign: "middle", margin: "0 5px", cursor: "pointer" }}
                                  onClick={goToDashboard}
                                  title="Go to Dashboard"
                                />
                       <span> &gt; </span>
            <span className={styles.breadcrumbActive}>Custom Credit Plan</span>
          </div>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Custom Credit Plan</h3>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Checkbox */}
            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                id="customPlanCheck"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="customPlanCheck">
                Please Check If You Want To Purchase Custom Plan.
              </label>
            </div>

            {/* Conditional Fields */}
            {!checked && (
              <>
                <div className={styles.formGroup}>
                  <label>Credit Plans</label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                  >
                    <option value="">Select Credit Plans</option>
                    <option value="Basic">Basic Plan</option>
                    <option value="Standard">Standard Plan</option>
                    <option value="Premium">Premium Plan</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Franchise</label>
                  <select
                    value={selectedFranchise}
                    onChange={(e) => setSelectedFranchise(e.target.value)}
                  >
                    <option value="">Select Franchise</option>
                    <option value="Franchise 1">Franchise 1</option>
                    <option value="Franchise 2">Franchise 2</option>
                  </select>
                </div>
              </>
            )}

            {checked && (
              <>
                <div className={styles.formGroup}>
                  <label>Franchise</label>
                  <select
                    value={selectedFranchise}
                    onChange={(e) => setSelectedFranchise(e.target.value)}
                  >
                    <option value="">Select Franchise</option>
                    <option value="Franchise 1">Franchise 1</option>
                    <option value="Franchise 2">Franchise 2</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Price for one Credit</label>
                  <input
                    type="number"
                    placeholder="Price per credit"
                    value={price}
                    readOnly
                    className={styles.readOnlyInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Credit</label>
                  <input
                    type="text"
                    placeholder="Enter Credit"
                    value={credit}
                    onChange={handleCreditChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Amount</label>
                  <input
                    type="text"
                    placeholder="Total Amount"
                    value={amount}
                    readOnly
                    className={styles.readOnlyInput}
                  />
                </div>
              </>
            )}

            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
