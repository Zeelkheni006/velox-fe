"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
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
    </main>
  );
}
