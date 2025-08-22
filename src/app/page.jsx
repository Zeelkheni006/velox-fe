"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./main.css";

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
const stats = [
  {
    id: 1,
    icon: "/icon/icon-1.png", // replace with your icon path
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

export default function Home() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <main>
      <section id="hero-slider" className="relative overflow-hidden">
        {/* Wrapper for all slides */}
        <div
          className="slides-wrapper flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
            width: `${slides.length * 15}%`,
            height: `${slides.length * 13}%`
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative h-[50vh]">
              <Image
                src={slide.img}
                alt={`Slide ${index}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover z-0"
              />

              {/* Overlay Content */}
              <div
                className="carousel-caption d-flex flex-col items-center justify-center text-center"
                style={{
                  position: "absolute",
                 top: "25%",
                  left: "90%",
                  transform: "translateX(-50%)",
                  width: "100%",
                  height: "100%",
                  zIndex: "2",
                  
                }}
              >
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center z-20"> 
                <h1 className={`${slide.color} text-4xl font-bold`}>{slide.title}</h1>
                <p className={`${slide.color} mt-2`}>{slide.desc}</p>
                </div>
                {/* Search Bar (Optional: only on first slide) */}
                
                  <div className="search-container  mt-5 w-full max-w-xl">
                    <form
                      action="#"
                      method="GET"
                      className="flex mt-5 items-center bg-white rounded-full shadow-lg overflow-hidden mx-auto max-w-xl"
                    >
                      <input
                        type="text"
                        placeholder="Enter a location"
                        name="location"
                        className="flex-1 px-3 py-2 search-input"
                      />
                      <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 font-semibold search-btn"
                      >
                        Go
                      </button>
                    </form>
                  </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full z-30"
        >
          ❮
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full z-30"
        >
          ❯
        </button>

        {/* Dot Indicators */}
         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30 bg-black/40 px-3 py-2 rounded-full">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 ${
                current === index ? "bg-white w-6" : "bg-gray-400"
              }`}
            ></div>
          ))}
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
      <section className="py-10 px-4 ">
        <div className="best-service">
          <h2 className="text-center text-2xl font-bold mb-2">Best Services</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 rounded"></div>

          <Swiper
          className="best-service-swiper"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
             slidesPerGroup={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
                640: { slidesPerView: 1, slidesPerGroup: 1 },
                768: { slidesPerView: 2, slidesPerGroup: 2 },
                1024: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
          >
            {bestServices.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl service ">
                  <div className="relative w-full h-48">
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
            <div class="stat-card">
                <div class="corner-border"></div>
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

          <button className="about-btn">Read More About Us</button>
        </div>

        {/* Right Image */}
        <div className="about-image" data-aos="fade-left">
          <Image
            src="/images/about.png" // 👈 replace with your actual image
            alt="About Velox Team"
            width={500}
            height={400}
          />
        </div>
      </div>
    </section>
    </main>
  );
}
