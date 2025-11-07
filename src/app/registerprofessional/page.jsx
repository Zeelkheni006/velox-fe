// components/EasyRegisterProcess.js
'use client';
import React from 'react';
import Image from "next/image";
import './main.css';  
import { getCountries ,getCategoryList, getStates, getCities ,getSubcategoriesAndServices} from "../api/user-side/register-professional/location";
import { useState, useEffect } from "react";
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
  const [showCategoryInfoBox, setShowCategoryInfoBox] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
const [showPopup, setShowPopup] = useState(false);
const [popupCategoryTitle, setPopupCategoryTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
const [subcategories, setSubcategories] = useState([]);
const [services, setServices] = useState([]);

  // Fetch Countries & Categories on load
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
    alert("Form successfully submitted ✅");
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
  return (
    
    <div className="container">
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
        <div className="formBox">
          <h2 className="heading">Register as <span>a </span>Professional</h2>
          <p className="subheading">Join 1500+ partners across India</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="row">
              <input type="text" placeholder="Enter your name" required />
              <input type="tel" placeholder="Enter your phone" required />
            </div>

            <div className="row">
              <input type="email" placeholder="Email" required />

              {/* ✅ Country */}
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                required
              >
                <option value="">Select Country</option>
                {countries.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              {/* ✅ State */}
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={!selectedCountry}
                required
              >
                <option value="">Select State</option>
                {states.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              {/* ✅ City */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                required
              >
                <option value="">Select City</option>
                {cities.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* ✅ Category */}
 <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
            </select>
   <button type="button" className="category-info-btn" onClick={() => setShowCategoryInfoBox(prev => !prev)}>
              Category Info
            </button>


            <textarea placeholder="What do you do?" rows={4}></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
{showCategoryInfoBox && (
  <div className="category-info-container">
    {categories.map(cat => (
      <div key={cat.id} className="category-box" 
        onClick={() => handleCategoryClick(cat)}
        style={{cursor:"pointer"}}
      >
        <h4>{cat.title}</h4>
      </div>
    ))}
  </div>
)}

{/* ✅ Popup Overlay */}
{showPopup && (
  <div className="popup-overlay" onClick={() => setShowPopup(false)}>
    <div className="popup-container" onClick={(e) => e.stopPropagation()}>
      
      {/* ✅ Category dropdown inside popup */}
      <select 
        className="popup-category-dropdown"
        value={selectedCategoryId || ""} 
        onChange={(e) => {
          const selectedCat = categories.find(c => c.id == e.target.value);
          if (selectedCat) handleCategoryClick(selectedCat);
        }}
      >
        <option value="" disabled>Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.title}</option>
        ))}
      </select>

      <div className="popup-content">
        
        {/* ✅ Subcategories */}
        <div className="popup-left-box">
          <h4>Subcategories</h4>
          {subcategories.length > 0 ? (
            <ul className="subcategory-list">
              {subcategories.map((sc, i) => (
                <li key={i}
                  className={selectedSubcategoryId === sc.subcategory ? "active" : ""}
                  onClick={() => handleSubcategoryClick(sc)}
                >
                  {sc.subcategory}
                </li>
              ))}
            </ul>
          ) : <p>No Subcategories found</p>}
        </div>

        {/* ✅ Services */}
        <div className="popup-right-box">
          <h4>Services</h4>
          {services.length > 0 ? (
            <ul className="services-list">
              {services.map((srv, i) => <li key={i}>{srv}</li>)}
            </ul>
          ) : <p>Select subcategory to view services</p>}
        </div>

      </div>

      <button className="popup-close" onClick={() => setShowPopup(false)}>
        Close
      </button>

    </div>
  </div>
)}

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
