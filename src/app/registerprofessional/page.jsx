  // components/EasyRegisterProcess.js
  'use client';
  import React from 'react';
  import Image from "next/image";
  import './main.css';  
  import { getCountries ,getCategoryList, getStates, getCities ,getSubcategoriesAndServices} from "../api/user-side/register-professional/location";
  import { useState, useEffect } from "react";
  import usePopup from '../admin/components/popup';
  import PopupAlert from "../admin/components/PopupAlert";
  import { IoMdCloudUpload } from "react-icons/io";
  import { submitFranchiseRequest } from "../api/user-side/register-professional/personal-details";
import Select from "react-select";

  const data = [
      {
        image: '/images/no-marketing.jpg',
        title: 'NO MARKETING',
        desc: 'They get continue work With us without any own marketing',
      },
      {
        image: '/images/more-money.jpg',
        title: 'MORE MONEY',
        desc: 'They can earn more Income with us.',
      },
      {
        image: '/images/servies-products-kit.jpg',
        title: 'SERVICE PRODUCTS KIT',
        desc: 'We take care of their all needs for professional products',
      },
      {
        image: '/images/professional-training.jpg',
        title: 'PROFESSIONAL TRAINIG',
        desc: 'We give them training for best performance.',
      },
      {
        image: '/images/enjoy-your-job.jpg',
        title: 'ENJOY YOUR JOB',
        desc: 'You can work parttime or full time as your need.',
      },
      {
        image: '/images/search.webp',
        title: 'DONT SEARCH',
        desc: 'You dont need to find work for you VELOX SOLUTION give you work and all detail about your work.',
      },
      {
        image: '/images/just.webp',
        title: 'JUST DO WORK',
        desc: 'You just only follow companys lead and service there',
      },
      {
        image: '/images/Free Insurance.jpg',
        title: 'FREE INSURANCE',
        desc: 'Velox solution covers all vendors by Free accidental insurance.',
      },
    
    ];
  const EasyRegisterProcess = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
 
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
  
  const [popupCategoryTitle, setPopupCategoryTitle] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);

    const [pancardFile, setPancardFile] = useState(null);
    const [step, setStep] = useState(1);
    const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [ownerName, setOwnerName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [email, setEmail] = useState("");
const [pincode, setPincode] = useState("");
const [selectedCategories, setSelectedCategories] = useState([]);
const { popupMessage, popupType, showPopup } = usePopup();
const [franchiseCategory, setFranchiseCategory] = useState("");
const [franchiseName, setFranchiseName] = useState("");
const [franchisePhone, setFranchisePhone] = useState("");
const [franchiseEmail, setFranchiseEmail] = useState("");
const [franchiseAddress, setFranchiseAddress] = useState("");
const [franchisePincode, setFranchisePincode] = useState("");
const [franchiseCountry, setFranchiseCountry] = useState("");
const [franchiseState, setFranchiseState] = useState("");
const [franchiseCity, setFranchiseCity] = useState("");
const [franchiseCategories, setFranchiseCategories] = useState([]);
const [franchiseMessage, setFranchiseMessage] = useState("");
    // Fetch Countries & Categories on load
    const categoryOptions = categories?.map((cat) => ({
  value: cat.id,
  label: cat.title
})) || [];

    useEffect(() => {
      getCountries().then(setCountries);
      getCategoryList().then(setCategories);
    }, []);

    // Fetch States when Country changes
    useEffect(() => {
      if (!selectedCountry) {
        setStates([]);
        setCities([]);
        setSelectedState("");
        setSelectedCity("");
        return;
      }
      getStates(selectedCountry).then(setStates);
    }, [selectedCountry]);

    // Fetch Cities when State changes
    useEffect(() => {
      if (!selectedState) {
        setCities([]);
        setSelectedCity("");
        return;
      }
      getCities(selectedState).then(setCities);
    }, [selectedState]);

    const handleSubmit = (e) => {
      e.preventDefault();
      showPopup("Form successfully submitted ✅");
      console.log({
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        category: selectedCategory,
      });
    };

  const handleCategoryClick = async (cat) => { setPopupCategoryTitle(cat.title); setShowPopup(true); setSelectedCategoryId(cat.id); const response = await getSubcategoriesAndServices(cat.id); console.log("Popup Response:", response); setSubcategories(response || []); setServices([]); setSelectedSubcategoryId(null); };

  const handleSubcategoryClick = (subcat) => {
    setSelectedSubcategoryId(subcat.subcategory);
    setServices(subcat.services || []);
  };
const handleFinalSubmit = async () => {
  const formData = new FormData();

  formData.append("owner_name", ownerName);
  formData.append("owner_phone", phone);
  formData.append("owner_email", email);
  formData.append("owner_address", address);
  formData.append("owner_pincode", pincode);
  formData.append("owner_country_id", selectedCountry);
  formData.append("owner_state_id", selectedState);
  formData.append("owner_city_id", selectedCity);

  // Franchise info
  formData.append("franchise_name", ownerName);
  formData.append("franchise_address", address);
  formData.append("franchise_city_id", selectedCity);
  formData.append("franchise_state_id", selectedState);
  formData.append("franchise_country_id", selectedCountry);
  formData.append("franchise_pincode", pincode);
  formData.append("franchise_email", email);
  formData.append("franchise_phone", phone);

  // 🌟 MULTIPLE CATEGORY ARRAY
const categoryIds = selectedCategories.map(item => item.value);
formData.append("category_list", JSON.stringify(categoryIds)); // correct

  formData.append("message", franchiseMessage);

  // Files
  if (pancardFile) formData.append("pan_card_image", pancardFile);
  if (aadharFront) formData.append("adhar_card_front_image", aadharFront);
  if (aadharBack) formData.append("adhar_card_back_image", aadharBack);

  try {
    const data = await submitFranchiseRequest(formData);
    console.log("FINAL RESPONSE:", data);
    if (data.success) alert("Request submitted successfully 🎉");
    else alert(data.message || "Something went wrong ❌");
  } catch (error) {
    console.log(error);
  }
};

const validateStep1 = () => {
  if (!ownerName.trim()) {
    showPopup("Please enter your name","error");
    return false;
  }
  if (!phone.trim()) {
    showPopup("Please enter phone number","error");
    return false;
  }
  if (!address.trim()) {
    showPopup("Please enter address","error");
    return false;
  }
  if (!email.trim()) {
    showPopup("Please enter email","error");
    return false;
  }
  if (!pincode.trim()) {
    showPopup("Please enter pincode","error");
    return false;
  }
  if (!selectedCountry) {
    showPopup("Please select country","error");
    return false;
  }
  if (!selectedState) {
    showPopup("Please select state","error");
    return false;
  }
  if (!selectedCity) {
    showPopup("Please select city","error");
    return false;
  }

  return true;
};
const validateStep2 = () => {
  if (!ownerName.trim()) {
    showPopup("Please enter Name","error");
    return false;
  }
  if (!phone.trim()) {
    showPopup("Please enter Phone","error");
    return false;
  }
  if (!address.trim()) {
    showPopup("Please enter Address","error");
    return false;
  }
  if (!email.trim()) {
    showPopup("Please enter Email","error");
    return false;
  }
  if (!pincode.trim()) {
    showPopup("Please enter Pincode","error");
    return false;
  }
  if (!selectedCountry) {
    showPopup("Please select Country","error");
    return false;
  }
  if (!selectedState) {
    showPopup("Please select State","error");
    return false;
  }
  if (!selectedCity) {
    showPopup("Please select City","error");
    return false;
  }
  if (selectedCategories.length === 0) {
    showPopup("Please select at least one Category","error");
    return false;
  }
  if (!franchiseMessage.trim()) {
    showPopup("Please enter Message","error");
    return false;
  }

  return true;
};
const validateStep3 = () => {
  if (!pancardFile) {
    alert("Please upload Pancard");
    return false;
  }

  if (!aadharFront) {
    alert("Please upload Aadhar Front");
    return false;
  }

  if (!aadharBack) {
    alert("Please upload Aadhar Back");
    return false;
  }

  return true;
};

    return (
      
      <div className="container">
            <PopupAlert message={popupMessage} type={popupType} />
        <h2 className="title">Easy <span>Register</span> Process</h2>
        <div className="steps">
          <div className="step">
            <div className="circle1">1</div>
            <div className="text">
              <h3>Feel The Form</h3>
              <p>
                First of all you give us what you are doing In which category
                you are the best ever in the world.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="circle2">2</div>
            <div className="text">
              <h3>Call From Our HR Team</h3>
              <p>
                Our HR team will call you and get the perfect and full details
                about your franchise worker and etc.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="circle3">3</div>
            <div className="text">
              <h3>Document Verified</h3>
              <p>
                Document verification process for the customer and your safety
                to help both of you.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="circle4">4</div>
            <div className="text">
              <h3>Enjoy Your Franchise</h3>
              <p>
                Enjoy your franchise with orders and help your customers to give
                them full fill services.
              </p>
            </div>
          </div>
        </div>
        <p className="query">
          Now Our Franchise first Easy registration verification and get the
          order and earn more income and give the satisfaction to our valuable
          customers
        </p>
        <p className="contact">
          For Franchise Query: <strong>+91 90 818 818 89</strong>
        </p>
          <div className="leftSection">
          <Image
            src="/images/golden.jpg"
            alt="VELEX Professionals"
            width={600}
            height={600}
            className="image"
          />
        </div>

  <div className="rightSection">

    {/* 🔵 Step Indicator */}
  

    {step === 1 && (
      <div className="formBox">
<div className="stepIndicator">
  <div 
    className="stepItem"
    style={{ cursor: "pointer" }}
    onClick={() => setStep(1)}
  >
    <span className="stepLabel">Personal Details</span>
    <div className={`stepCircle ${step === 1 ? "active" : ""}`}>1</div>
  </div>

  <div className="stepLine"></div>

  <div
    className="stepItem"
    style={{ cursor: "pointer" }}
    onClick={() => {
      if (validateStep1()) setStep(2);
    }}
  >
    <span className="stepLabel">Franchise Info</span>
    <div className={`stepCircle ${step === 2 ? "active" : ""}`}>2</div>
  </div>

  <div className="stepLine"></div>

  <div
    className="stepItem"
    style={{ cursor: "pointer" }}
    onClick={() => {
      if (validateStep1() && validateStep2()) setStep(3);
    }}
  >
    <span className="stepLabel">KYC Document</span>
    <div className={`stepCircle ${step === 3 ? "active" : ""}`}>3</div>
  </div>
</div>


        <h2 className="heading">Personal <span>Details</span></h2>
      

        <form onSubmit={handleSubmit} className="form">

          <div className="row">
          <input
  type="text"
  placeholder="Enter your name"
  required
  value={ownerName}
  onChange={(e) => setOwnerName(e.target.value)}
/>

<input
  type="tel"
  placeholder="Enter your phone"
  required
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>
          </div>

          <div className="row">
           <input
  type="text"
  placeholder="Address Line 1"
  required
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>
          </div>

          <div className="row">
          
             <input
  type="email"
  placeholder="Email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type='text'
  placeholder='Pincode'
  required
  value={pincode}
  onChange={(e) => setPincode(e.target.value)}
/>
          </div>

          <div className="row">
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>
              <option value="">Select Country</option>
              {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

          
          </div>

          <div className="row">
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required disabled={!selectedState}>
              <option value="">Select City</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required disabled={!selectedCountry}>
              <option value="">Select State</option>
              {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            {/* Category */}
          
          </div>

          {/* NEXT BUTTON – go to page 2 */}
      <div className="buttonrow">
<button
  type="button"
  className="nextBtn"
  onClick={() => {
    if (validateStep1()) setStep(step + 1);
  }}
>
  Next →
</button>
  </div>  

        </form>

        
      </div>
    )}

    {/* STEP 2 (Franchise Info) */}
  {step === 2 && (
    <div className="formBox">
 <div className="stepIndicator">
  {/* STEP 1 */}
  <div
    className="stepItem"
    style={{ cursor: "pointer" }}
    onClick={() => setStep(1)}
  >
    <span className="stepLabel">Personal Details</span>
    <div className={`stepCircle ${step === 1 ? "active" : ""}`}>1</div>
  </div>

  <div className="stepLine"></div>

  {/* STEP 2 */}
  <div
    className="stepItem"
    style={{ cursor: "pointer" }}
    onClick={() => {
      if (validateStep1()) setStep(2);
    }}
  >
    <span className="stepLabel">Franchise Info</span>
    <div className={`stepCircle ${step === 2 ? "active" : ""}`}>2</div>
  </div>

  <div className="stepLine"></div>

  {/* STEP 3 */}
  <div
    className="stepItem"
    style={{ cursor: "pointer" }}
    onClick={() => {
      if (validateStep1() && validateStep2()) setStep(3);
    }}
  >
    <span className="stepLabel">KYC Document</span>
    <div className={`stepCircle ${step === 3 ? "active" : ""}`}>3</div>
  </div>
</div>


      <h2 className="heading">Franchise <span>Info</span></h2>

      <form onSubmit={handleSubmit} className="form">

        {/* Name & Phone */}
        <div className="row">
        <input type="text" placeholder="Enter Name" value={franchiseName} onChange={(e) => setFranchiseName(e.target.value)} required />
<input type="tel" placeholder="Enter Phone" value={franchisePhone} onChange={(e) => setFranchisePhone(e.target.value)} required />
        </div>

        {/* Email */}
        <div className="row">
         <input type="text" placeholder="Address Line 1" value={franchiseAddress} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        {/* Address & Pincode */}
        <div className="row">

                 <input type="email" placeholder="Enter Email" value={franchiseEmail} onChange={(e) => setFranchiseAddress(e.target.value)} required />
         <input type="text" placeholder="Pincode" value={franchisePincode} onChange={(e) => setFranchisePincode(e.target.value)} required />
        </div>

        {/* Country & State */}
        <div className="row">
          <select value={franchiseCountry} onChange={(e) => setFranchiseCountry(e.target.value)} required>
            <option value="">Select Country</option>
            {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select value={franchiseState} onChange={(e) => setFranchiseState(e.target.value)} required disabled={!selectedCountry}>
            <option value="">Select State</option>
            {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        {/* City & Category */}
        <div className="row">
          <select value={franchiseCity} onChange={(e) => setFranchiseCity(e.target.value)} required disabled={!selectedState}>
            <option value="">Select City</option>
            {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>


 </div>

    <div style={{ width: "100%" }}>
      <Select
        isMulti
        placeholder="Select Categories"
        options={categoryOptions}
        value={selectedCategories}
        onChange={(selected) => setSelectedCategories(selected || [])}
      />
  
  </div>



        

        {/* Message */}
        <div className="row">
          <textarea placeholder="Message" rows={4} onChange={(e) => setFranchiseMessage(e.target.value)}></textarea>
        </div>

      
  <div className="buttonRow">
    {/* Back button on the left */}
    <button
      type="button"
      className="nextBtn"
      onClick={() => setStep(step - 1)}
    >
      ← Back
    </button>

    {/* Next button on the right */}
    <button
      type="button"
      className="nextBtn"
      onClick={() =>{
        if (validateStep2())
       setStep(step + 1);}}
    >
      Next →
    </button>
  </div>

      </form>
    </div>
  )}

  {step === 3 && (
    <div className="formBox">

      {/* Step Indicator */}
    <div className="stepIndicator">
    <div 
      className="stepItem"
      style={{ cursor: "pointer" }}
      onClick={() => setStep(1)}
    >
      <span className="stepLabel">Personal Details</span>
      <div className={`stepCircle ${step === 1 ? "active" : ""}`}>1</div>
    </div>

    <div className="stepLine"></div>

    <div 
      className="stepItem"
      style={{ cursor: "pointer" }}
      onClick={() => setStep(2)}
    >
      <span className="stepLabel">Franchise Info</span>
      <div className={`stepCircle ${step === 2 ? "active" : ""}`}>2</div>
    </div>

    <div className="stepLine"></div>

    <div 
      className="stepItem"
      style={{ cursor: "pointer" }}
      onClick={() => setStep(3)}
    >
      <span className="stepLabel">KYC Document</span>
      <div className={`stepCircle ${step === 3 ? "active" : ""}`}>3</div>
    </div>
  </div>


      <h2 className="heading">Documents <span>Upload</span></h2>

      <form className="form">

        {/* Top row: Pancard */}
      <div className="row" style={{ marginBottom: " 50px" }}>
    {/* Pancard Upload */}
    <div style={{ flex: 1 }}>
      <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Pancard Upload</h4>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            cursor: "pointer",
            minWidth: "250px"
          }}
        >
          <IoMdCloudUpload style={{ fontSize: "32px", marginBottom: "8px" }} />
          <span>Click to Upload Pancard</span>
          <input
            type="file"
            accept="image/*"
            required
            style={{ display: "none" }}
            onChange={(e) => e.target.files && setPancardFile(e.target.files[0])}
          />

          {/* Show uploaded file name */}
          {pancardFile && (
            <div style={{ marginTop: "10px" }}>Uploaded: {pancardFile.name}</div>
          )}
        </label>
      </div>
    </div>
  </div>

  {/* Aadhar Uploads (Front & Back) */}
  <div className="row1">
    {/* Aadhar Front */}
    <div style={{ flex: 1 }}>
      <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Aadhar Front Upload</h4>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            cursor: "pointer",
            minWidth: "250px"
          }}
        >
          <IoMdCloudUpload style={{ fontSize: "32px", marginBottom: "8px" }} />
          <span>Click to Upload Aadhar Front</span>
          <input
            type="file"
            accept="image/*"
            required
            style={{ display: "none" }}
            onChange={(e) => e.target.files && setAadharFront(e.target.files[0])}
          />

          {/* Show uploaded file name */}
          {aadharFront && (
            <div style={{ marginTop: "10px" }}>Uploaded: {aadharFront.name}</div>
          )}
        </label>
      </div>
    </div>

    {/* Aadhar Back */}
    <div style={{ flex: 1 }}>
      <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Aadhar Back Upload</h4>
      <div style={{ display: "flex", justifyContent: "center" , }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            cursor: "pointer",
            minWidth: "250px"
          }}
        >
          <IoMdCloudUpload style={{ fontSize: "32px", marginBottom: "8px" }} />
          <span>Click to Upload Aadhar Back</span>
          <input
            type="file"
            accept="image/*"
            required
            style={{ display: "none" }}
            onChange={(e) => e.target.files && setAadharBack(e.target.files[0])}
          />

          {/* Show uploaded file name */}
          {aadharBack && (
            <div style={{ marginTop: "10px" }}>Uploaded: {aadharBack.name}</div>
          )}
        </label>
      </div>
    </div>
  </div>
        {/* Navigation buttons */}
        <div className="btnRow">
          <button type="button" className="nextBtn" onClick={() => setStep(2)}>← Back</button>
     <button
  type="button"
  className="nextBtn"
  onClick={() => {
    if (validateStep3()) {
      handleFinalSubmit();
    }
  }}
>
  Submit
</button>
        </div>

      </form>
    </div>
  )}

  </div>

        <div className="container-benefits">
        <h2 className="heading">
          Benefits for <span>Vendors</span>
        </h2>

        <div className="cards">
          {data.map((item, index) => (
            <div key={index} className="card">
              <Image
                src={item.image}
                alt={item.title}
                width={350}
                height={250}
                className="image-benefits"
              />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
        
      </div>
      </div> 

    );
  };

  export default EasyRegisterProcess;
