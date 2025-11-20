"use client";
import "./main.css";
import Image from "next/image";
import { AiFillClockCircle } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { useState } from "react";
 
export default function ServiceDetails({ params }) {
   const [modalImage, setModalImage] = useState(null);
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
     <div className="service-heading-box">
    <Image
      src="/icon/ac-service.png" // icon path
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
  <button className="btn-add">Add</button>
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
            <button className="btn-outline">View Detail</button>
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
            <button className="btn-outline">View Detail</button>
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
            <button className="btn-outline">View Detail</button>
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
            <button className="btn-outline">View Detail</button>
            <button className="btn-filled">Proceed to Pay</button>
          </div>
        </div>
        
      </div>
      {modalImage && (
  <div className="image-modal" onClick={() => setModalImage(null)}>
    <img src={modalImage} alt="Service Image" />
  </div>
)}
    </div>
    
  );
}
