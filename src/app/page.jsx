"use client";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./main.css";
import { useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaMapMarkerAlt, FaTimesCircle } from "react-icons/fa";



// Array with image + text
const slides = [
  {
    img: "/images/first-image.webp",
    title: "FRANCHISE",
    desc: "VELOX SOLUTION FRANCHISE",
     color: "text-white", 
  },
  {
    img: "/images/image2.png",
    title: "FRANCHISE",
    desc: "VELOX SOLUTION FRANCHISE",
     color: "text-white",
  },
  {
    img: "/images/image-3.webp",
    title: "WE HAVE AC SPECIALIST IN RAJKOT",
    desc: "WE ARE PROVIDING AC SERVICES IN RAJKOT",
     color: "text-white",
  },
  {
    img: "/images/home-image.jpg",
    title: "Safe and Hygienic Service",
    desc: "High Quality & Hygienic Home Service.",
     color: "text-white",
  },
  {
    img: "/images/solar-cleaning.jpg",
    title: "SOLAR PANEL CLEANING",
    desc: "Trust Velox Professionals for solar panel cleaning",
     color: "text-white",
  },
  {
    img: "/images/surat.webp",
    title: "SURAT BRANCH",
    desc: "WE ARE PROVIDING AC SERVICES IN SURAT",
     color: "text-white",
  },
  {
    img: "/images/kitchen-image.jpg",
    title: "KITCHEN CLEANING",
    desc: "VELOX KITCHEN CLEANING",
     color: "text-white",
  },
];
const services = [
  { img: "/icon/ac-service.png", label: "AC Service" },
  { img: "/icon/spa.png", label: "Spa for Women" },
  { img: "/icon/cleaning.png", label: "Cleaning & Disinfection" },
  { img: "/icon/grooming.png", label: "Men Grooming" },
  { img: "/icon/sofa.png", label: "Sofa Cleaning" },
  { img: "/icon/car-wash.png", label: "Car Washing" },
  { img: "/icon/solar.png", label: "Solar Panel" },
  { img: "/icon/beauty.png", label: "Women Beauty Care" },
  { img: "/icon/pest.png", label: "Pest Control" },
  { img: "/icon/skin.png", label: "Skin Treatment" },
  { img: "/icon/nail.png", label: "NAIL Studio" },
  { img: "/icon/other.png", label: "Other" },
];

const bestServices = [
  {
    img: "/images/image1.jpg",
    title: "Velox AC Care+ Plan",
    category: "AC Service",
    
  },
  {
    img: "/images/image2.jpg",
    title: "Velox CoolCare AMC Plan",
    category: "AC Service",
    
  },
  {
    img: "/images/image3.jpg",
    title: "Velox FreshGuard Home Plan",
    category: "AC Service",
    
  },
   {
    img: "/images/image4.jpg",
    title: "Velox AC Care+ Plan",
    category: "AC Service",
    
  },
  {
    img: "/images/image5.jpg",
    title: "Velox CoolCare AMC Plan",
    category: "AC Service",
    
  },
  {
    img: "/images/image6.jpg",
    title: "Velox FreshGuard Home Plan",
    category: "AC Service",
    
  },
  {
    img: "/images/image7.jpg",
    title: "Velox AC Care+ Plan",
    category: "AC Service",
    
  },
  {
    img: "/images/image8.jpg",
    title: "Velox CoolCare AMC Plan",
    category: "AC Service",
    
  },
  {
    img: "/images/image9.jpg",
    title: "Velox FreshGuard Home Plan",
    category: "AC Service",
    
  },
];
const fullServices =
  bestServices.length < 6 ? [...bestServices, ...bestServices] : bestServices;
const stats = [
  {
    id: 1,
    icon: "/icon/icon-1.png", 
    value: "187",
    label: "Services",
  },
  {
    id: 2,
    icon: "/icon/icon-3.png",
    value: "15",
    label: "City",
  },
  {
    id: 3,
    icon: "/icon/icon-2.png",
    value: "22",
    label: "Franchises",
  },
  {
    id: 4,
    icon: "/icon/icon-4.png",
    value: "2113",
    label: "Happy Customer",
  },
];
const order = [
  {
    id: 1,
    icon: "/icon/search2.png", 
    value: "187",
    label: "Services",
  },
  {
    id: 2,
    icon: "/icon/search3.png",
    value: "15",
    label: "City",
  },
  {
    id: 3,
    icon: "/icon/enjoy3.png",
    value: "22",
    label: "Franchises",
  },
 
];
const reviews = [
    {
      name: 'divya sagathiya',
      image: '/images/user1.png', // replace with real image
      rating: 5,
    },
    {
      name: 'HIMAT VADHER',
      image: '/images/user2.png',
      rating: 5,
    },
  ];

export default function Home() {
     
 useEffect(() => {
   setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
   }, 100);
 }, []);
  // Auto Slide


  return (
    <main>

<section id="hero" className="heroSection">
        {/* Background Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} 
          navigation pagination={{ clickable: true }} 
          autoplay={{ delay: 5000, disableOnInteraction: false }}
           loop
          className="absolute inset-0 w-full h-full -z-10"
        >
          {slides.map((slide, index) => (
      <SwiperSlide key={index}>
        <div className="heroSlide">
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            priority={index === 0}
            className="heroImage"
          />
          <div className="heroOverlay"></div>
          <div className="heroContent">
            <h1 className="heroTitle">{slide.title}</h1>
            <p className="heroDesc">{slide.desc}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
        </Swiper>

        {/* 🔥 Static Search Box (doesn't slide) */}
   <div className="searchBox">
  <form className="searchForm">
    <div className="searchInputWrapper">
      {/* Left Search Icon */}
      <span className="searchIcon">
        <FaSearch />
      </span>
      <input
        type="text"
        placeholder="Enter a location"
        className="searchInput"
      />
      {/* Right Location Icon */}
      <span className="locationIcon">
        <FaMapMarkerAlt />
      </span>

      {/* Right Clear Icon */}
      <span className="clearIcon">
        <FaTimesCircle />
      </span>
    </div>

    {/* Button below input */}
    <button type="submit" className="searchButton">
      Go
    </button>
  </form>
</div>
      </section>


       <section className="services-section">
  <div className="services-grid">
    {services.map((service, index) => (
      <div key={index} className="service-card">
        <div className="service-image">   
          <Image src={service.img} alt={service.label} fill className="service-img" />
        </div>
        <p className="service-label">{service.label}</p>
      </div>
    ))}
  </div>
</section>
      <section className="py-10 px-4  ">
        <div className="best-service">
          <h2 className="text-center text-2xl font-bold mb-2">Best Services</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 rounded"></div>

          <Swiper
          className="best-service-swiper"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
             slidesPerGroup={3}
             loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
               0: { slidesPerView: 1, slidesPerGroup: 1 },
                320: { slidesPerView: 1, slidesPerGroup: 1 },
                375: { slidesPerView: 1, slidesPerGroup: 1 },
                640: { slidesPerView: 1, slidesPerGroup: 1 },
                768: { slidesPerView: 3, slidesPerGroup: 3 },
                1024: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
          >
              {fullServices.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl service ">
                  <div className="relative w-full h-48 ">
                    <Image src={service.img} alt={service.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-center text-orange-600">
                      {service.title}
                    </h3>
                    <p className="text-center text-gray-600 text-sm">{service.category}</p>
                    
                    
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </section>
         <section className=" stats-section py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stats-grid">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="relative bg-white rounded-2xl shadow-md text-center p-6 transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Orange Corner Border */}
            <div className="absolute bottom-0 left-0 w-full h-full rounded-2xl border-2 border-transparent">
              <div className="absolute bottom-0 left-0 w-1/3 h-1 border-b-4 border-orange-500 rounded-bl-xl"></div>
              <div className="absolute bottom-0 left-0 h-1/3 w-1 border-l-4 border-orange-500 rounded-bl-xl"></div>
            </div>
            <div className="stat-card">
                <div className="corner-border"></div>
            <div className="flex justify-center mb-3 stat-icon">
              <Image src={stat.icon} alt={stat.label} width={50} height={50} />
            </div>
            <h3 className="text-3xl font-bold text-orange-500 stat-value">{stat.value}</h3>
            <p className="text-gray-600 font-medium stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>  
    
    <section className="about-section">
      <div className="about-container">
        
        {/* Left Content */}
        <div data-aos="fade-right">
          <h2 className="about-title">
            About <span>VELOX</span>
          </h2>
          <div className="about-underline"></div>

          <p className="about-text">
            Velox Solution comes up with the AIM of providing the best service
            at your doorstep. We offer services like
            
              Cleaning & Disinfection, Salon For Women & Men, Paintwork, Car
              Washing, and AC Services
            
             delivered by professionals and experts.
          </p>

          <Link href="/about">
  <button className="about-btn">Read More About Us</button>
</Link>
        </div>

        {/* Right Image */}
        <div className="about-image" data-aos="fade-left">
          <Image
            src="/images/about.png" 
            alt="About Velox Team"
            width={500}
            height={400}
          />
        </div>
      </div>
    </section>
   <section className="py-12 bg-gray-50 easy-process-section">
  <div className="container mx-auto px-6 text-center">
    {/* Heading */}
    <h2 className="text-3xl font-bold mb-10 relative inline-block">
      Easy Ordering Process
       <span className="service-underline"></span>
    </h2>

    {/* Steps */}
    <div className="flex justify-center items-center relative steps-container">

      {/* Step 1 */}
      <div className="step flex flex-col items-center step ">
        <div className="icon w-24 h-24 flex items-center justify-center rounded-full border-2 border-orange-400 mb-4 icon-container">
          <Image src="/icon/search2.png" alt="Find Service" width={60} height={60} />
        </div>
         <div className="step-content">
        <h3 className="text-lg font-sercher">Find Your Service</h3>
        <p className="text-gray-600 mt-1 max-w-xs them-text">
          Whatever service you are looking for, select them.
        </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="step flex flex-col items-center step ">
        <div className="icon w-24 h-24 flex items-center justify-center rounded-full border-2 border-orange-400 mb-4 service-container">
          <Image src="/icon/service3.png" alt="Choose Options" width={60} height={60}/>
        </div>
        <div className="step-content">
        <h3 className="text-lg font-service">Choose Your Services Options</h3>
        <p className="text-gray-600 mt-1 max-w-xs select-them">
          Thousand of service providers available select one of them.
        </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="step flex flex-col items-center step ">
        <div className="icon w-24 h-24 flex items-center justify-center rounded-full border-2 border-orange-400 mb-4 enjoy-container">
          <Image src="/icon/enjoy3.png" alt="Enjoy Service" width={60} height={60}/>
        </div>
        <div className="step-content">
        <h3 className="text-lg font-enjoy">Enjoy Your Service</h3>
        <p className="text-gray-600 mt-1 max-w-xs deliver-them">
          Professional comes to your doorstep and deliver service.
        </p>
        </div>
      </div>

    </div>

    {/* Button */}
    <div className="mt-10 ">
      <button className=" bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg steps-btn">
        Book Now
      </button>
    </div>
  </div>
</section>

 <section className="offerSection">
      <div className="offer-container">
        <h2 className="title">
          Best Offer For Today
          <span className="underline"></span>
        </h2>

        <div className="card">
          <Image
            src="/images/offer.png" // put your image in public/images/
            alt="Velox Seasonal Care Plan"
            width={400}
            height={300}
            className="offerImage"
          />

          <div className="offerFooter">
            <p className="referText">Refer And Earn Offer</p>
            <p className="discountText">up to Rs.100 off</p>
          </div>
        </div>
      </div>
    </section>
         <section className="referSection">
      <div className="refer-container">
        {/* Left Content */}
        <div className="leftContent">
          <h2 className="title">
            Refer and Get Free Services
            <span className="underline"></span>
          </h2>
          <p className="subtitle">
            Invite your friends to Velox Solution. They get Rs. 50 off. You win up to Rs. 100
          </p>

          <div className="inputWrapper">
            <input
              type="text"
              placeholder="Enter Mobile Number"
              className="input"
            />
            <button className="sendBtn">Send</button>
          </div>

          <div className="storeBtns">
            <Image src="/images/google.webp"  alt="Google Play" width={150} height={50} />
            <Image src="/images/appstore.webp"  alt="App Store" width={150} height={50} />
          </div>
        </div>

        {/* Right Phone Images */}
        <div className="rightImage">
          <Image src="/images/app.png"className="storeimg" alt="Mobile App UI" width={500} height={400} />
        </div>
      </div>
    </section>
<section className="reviewSection">
      <h2 className="refer-title">
        Customers Review
        <span className="underline"></span>
      </h2>

      <div className="reviewContainer">
        {reviews.map((review, index) => (
          <div className="reviewCard" key={index}>
            <div className="quote">❝</div>
            <div className="userInfo">
              <Image
                src={review.image}
                alt={review.name}
                width={50}
                height={50}
                className="avatar"
              />
              <div>
                <p className="name">{review.name}</p>
                <div className="stars">
                  {Array(review.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

     <section className="enterpriseSection">
      <h2 className="enterprise-title">
        Enterprise Services
        <span className="underline"></span>
      </h2>

      <form className="form">
        <input type="text" placeholder="Name" className="input" />

        <div className="row">
          <input type="email" placeholder="E-mail" className="input" />
          <input type="tel" placeholder="Phone" className="input" />
        </div>

        <input type="text" placeholder="Address" className="input" />

        <textarea placeholder="Message" className="textarea"></textarea>

        <div className="row">
          <input type="date" className="input" />
          <input type="time" className="input" />
        </div>

        <button type="submit" className="submitBtn">Submit</button>
      </form>
    </section>
    </main>
  );
}
