"use client";
import "./main.css";
import Image from "next/image";
import { AiFillClockCircle } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { useState } from "react";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";

export default function ServiceDetails({ params }) {
  const [showGallery, setShowGallery] = useState(false);
   const [modalImage, setModalImage] = useState(null);
   const [openDetail, setOpenDetail] = useState(false);
   const [active, setActive] = useState(false);
     const [count, setCount] = useState(0);
       const { category } = params;
          console.log(params.slug);
     const galleryImages = [
  "/images/image1.jpg",
  "/images/image1.jpg",
  "/images/image1.jpg",
  "/images/image1.jpg",
  "/images/image1.jpg",
];
  const service = {
    title: "Split AC Regular Water Jet Service",
    banner_image: "/images/image1.jpg",
    rating: 5,
    rating_count: 32,
    price: 699,
    time: 60,
    points: [
      "Indoor Unit Filter & Coil Cleaning",
      "Drain Pipe & Tray Cleaning",
      "Removes Dust, Dirt & Mold",
      "Improves Cooling Efficiency",
      "Reduces Power Consumption",
      "Prevents Water Leakage",
    ],
  };

  return (
    <div className="service-detail-container">
       <p>Slug: {params.slug}</p>
 <div
  className={`service-heading-box ${active ? "active" : ""}`}
  onClick={() => setActive(!active)}
>
  <Image
    src="/icon/ac-service.png"
    alt="AC Service"
    width={30}
    height={30}
    className="service-heading-icon"
  />
  <p className="service-heading-text">Split AC</p>
</div>
      <div className="service-box">
      <p className="all-services-heading">All Services</p>
        <div className="service-detail-box">
         <div className="service-banner">
  <Image
    src={service.banner_image} 
    alt={service.title}
    width={300}
    height={100}
    className="banner-img"
    onClick={() => setModalImage(service.banner_image)}
    style={{ cursor: "pointer" }}
  />
</div>

        <div className="service-title-row">
  <h1 className="service-title">{service.title}</h1>
  {count === 0 ? (
        <button className="btn-add" onClick={() => setCount(1)}>
          Add
        </button>
      ) : (
        <div className="qty-box">
          <button onClick={() => setCount(count - 1)}>-</button>
          <span>{count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      )}
</div>
          <div className="service-rating">
            ⭐ {service.rating} ({service.rating_count} ratings)
          </div>
          <div className="service-price">₹{service.price}</div>
          <p className="service-time"> <AiFillClockCircle />Estimated Time: {service.time} min</p>
          <ul className="service-points">
            {service.points.map((point, index) => (
              <li key={index}><FcApproval />
 {point}</li>
            ))}
          </ul>
          <div className="service-actions">
            <button className="btn-outline" onClick={() => setOpenDetail(true)}>View Detail</button>
            <button className="btn-filled">Proceed to Pay</button>
          </div>
        </div>

        {/* Right Box (duplicate content, image can change if needed) */}
        <div className="service-detail-box">
          <div className="service-banner">
            <Image
              src="/images/image2.jpg" // right image
              alt={service.title}
              width={300}
              height={100}
              className="banner-img"
            />
          </div>

                <div className="service-title-row">
  <h1 className="service-title">{service.title}</h1>
  <button className="btn-add">Add</button>
</div>
          <div className="service-rating">
            ⭐ {service.rating} ({service.rating_count} ratings)
          </div>
          <div className="service-price">₹{service.price}</div>
          <p className="service-time"><AiFillClockCircle /> Estimated Time: {service.time} min</p>
          <ul className="service-points">
            {service.points.map((point, index) => (
              <li key={index}><FcApproval /> {point}</li>
            ))}
          </ul>
          <div className="service-actions">
           <button className="btn-outline" onClick={() => setOpenDetail(true)}>View Detail</button>
            <button className="btn-filled">Proceed to Pay</button>
          </div>
        </div>

         <div className="service-detail-box">
          <div className="service-banner">
            <Image
              src="/images/image2.jpg" // right image
              alt={service.title}
              width={300}
              height={100}
              className="banner-img"
            />
          </div>

               <div className="service-title-row">
  <h1 className="service-title">{service.title}</h1>
  <button className="btn-add">Add</button>
</div>
          <div className="service-rating">
            ⭐ {service.rating} ({service.rating_count} ratings)
          </div>
          <div className="service-price">₹{service.price}</div>
          <p className="service-time"><AiFillClockCircle /> Estimated Time: {service.time} min</p>
          <ul className="service-points">
            {service.points.map((point, index) => (
              <li key={index}><FcApproval /> {point}</li>
            ))}
          </ul>
          <div className="service-actions">
           <button className="btn-outline" onClick={() => setOpenDetail(true)}>View Detail</button>
            <button className="btn-filled">Proceed to Pay</button>
          </div>
        </div>
               <div className="service-detail-box">
          <div className="service-banner">
            <Image
              src="/images/image2.jpg" // right image
              alt={service.title}
              width={300}
              height={100}
              className="banner-img"
            />
          </div>

             <div className="service-title-row">
  <h1 className="service-title">{service.title}</h1>
  <button className="btn-add">Add</button>
</div>
          <div className="service-rating">
            ⭐ {service.rating} ({service.rating_count} ratings)
          </div>
          <div className="service-price">₹{service.price}</div>
          <p className="service-time"><AiFillClockCircle /> Estimated Time: {service.time} min</p>
          <ul className="service-points">
            {service.points.map((point, index) => (
              <li key={index}><FcApproval />{point}</li>
            ))}
          </ul>
          <div className="service-actions">
           <button className="btn-outline" onClick={() => setOpenDetail(true)}>View Detail</button>
            <button className="btn-filled">Proceed to Pay</button>
          </div>
        </div>
        
      </div>
{modalImage && (
  <div className="image-modal" onClick={() => setModalImage(null)}>

    {/* 🔹 Top Right Controls */}
    <div className="modal-controls" onClick={(e) => e.stopPropagation()}>
      
      {/* Close Button */}
      <button className="modal-btn" onClick={() => setModalImage(null)}>✖</button>

      {/* Grid Button */}
      <button 
        className="modal-btn" 
        onClick={() => setShowGallery(!showGallery)}
      >
        <TfiLayoutGrid3Alt size={20} />
      </button>

    </div>

    {/* Main Image */}
    <img src={modalImage} alt="Service Image" className="modal-main-img" />

    {/* 🔹 Gallery (5 Images) */}
    {showGallery && (
      <div className="modal-gallery">
        {galleryImages.map((img, i) => (
          <img
            key={i}
            src={img}
            className="thumb-img"
            onClick={(e) => {
              e.stopPropagation();
              setModalImage(img);
            }}
          />
        ))}
      </div>
    )}

  </div>
)}


{openDetail && (
  <div className="side-modal-overlay" onClick={() => setOpenDetail(false)}>
    <div className="side-modal" onClick={(e) => e.stopPropagation()}>

      {/* top bar */}
      <div className="side-modal-header">
        <h2>{service.title}</h2>
        <button className="close-btn" onClick={() => setOpenDetail(false)}>✖</button>
      </div>

  

      {/* image */}
      <div className="side-modal-img-box">
        <img src={service.banner_image} className="side-modal-img" />
      </div>

      {/* Title + Price Row */}
      <div className="details-row">
        <h3 className="title-left">{service.title}</h3>
        <h3 className="price-right">₹{service.price}</h3>
      </div>

      {/* Ratings */}
      <p className="rating-left">⭐ {service.rating} Ratings</p>

      <div className="time">
      <p className="time-left"><AiFillClockCircle /> Estimated Time: {service.time} min</p>
</div>
      <ul className="side-modal-points">
        {service.points.map((point, index) => (
          <li key={index}><FcApproval /> {point}</li>
        ))}
      </ul>

      {/* Specifications Section */}
      <h3 className="spec-title">Specifications</h3>

   <div className="spec-card">   {/* <-- added wrapper */}
  <div className="spec-box">
    <img
      src="/images/image2.jpg"
      className="spec-small-img"
    />

    <div className="spec-text">
      <h4 className="spec-heading">High Pressure Power Jets</h4>
      <p className="spec-desc">
        Our Professional Team Cleans Units with High Pressure Power Jets during AC Service.
      </p>
    </div>
  </div>
</div>
   <div className="spec-card">   {/* <-- added wrapper */}
  <div className="spec-box">
 

    <div className="spec-text">
      <h4 className="spec-heading">High Pressure Power Jets</h4>
      <p className="spec-desc">
        Our Professional Team Cleans Units with High Pressure Power Jets during AC Service.
      </p>
    </div>
       <img
      src="/images/image1.jpg"
      className="spec-small-img"
    />
  </div>
</div>
  <div className="spec-card">   {/* <-- added wrapper */}
  <div className="spec-box">
    <img
      src="/images/image2.jpg"
      className="spec-small-img"
    />

    <div className="spec-text">
      <h4 className="spec-heading">High Pressure Power Jets</h4>
      <p className="spec-desc">
        Our Professional Team Cleans Units with High Pressure Power Jets during AC Service.
      </p>
    </div>
  </div>
</div>
<div className="spec-bottom-img-box">
  <img
    src="/images/download.png"   // change your second image here
    className="spec-bottom-img"
  />
</div> 
<div className="spec-bottom-img-box1"> 
  <img
    src="/images/download1.png"   // change your second image here
    className="spec-bottom-img1"
  />
  </div> 
  <div className="spec-bottom-img-box1"> 
  <img
    src="/images/download3.jpg"   // change your second image here
    className="spec-bottom-img1"
  />
  </div> 
  <h3 className="review-title">Most Helpful Reviews</h3>

<div className="review-box">
  {/* left image */}
  <img
    src="/images/profile.png"  // your small reviewer image
    className="review-user-img"
  />

  {/* middle part */}
  <div className="review-user-info">
    <h4 className="review-name">Manan Bhadresha</h4>
    <p className="review-location">Jamnagar, 09 March, 2022</p>
  </div>

  {/* right rating */}
  <div className="review-rating">
    ⭐ 5.0
  </div>
</div>
<div className="review-box">
  {/* left image */}
  <img
    src="/images/profile.png"  // your small reviewer image
    className="review-user-img"
  />

  {/* middle part */}
  <div className="review-user-info">
    <h4 className="review-name">Manan Bhadresha</h4>
    <p className="review-location">Jamnagar, 09 March, 2022</p>
  </div>

  {/* right rating */}
  <div className="review-rating">
    ⭐ 5.0
  </div>
</div>
<div className="review-box">
  {/* left image */}
  <img
    src="/images/profile.png"  // your small reviewer image
    className="review-user-img"
  />

  {/* middle part */}
  <div className="review-user-info">
    <h4 className="review-name">Manan Bhadresha</h4>
    <p className="review-location">Jamnagar, 09 March, 2022</p>
  </div>

  {/* right rating */}
  <div className="review-rating">
    ⭐ 5.0
  </div>
</div>
    </div>
  </div>
)}


    </div>
    
  );
}
