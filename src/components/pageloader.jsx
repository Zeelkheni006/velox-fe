"use client";
import "../app/main.css";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

const images = [
  "/images/loaderImages/1.webp",
  "/images/loaderImages/2.webp",
  "/images/loaderImages/3.webp",
  "/images/loaderImages/4.webp",
];

export default function PageLoader() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    // enable animation immediately after first paint
    requestAnimationFrame(() => {
      setAnimate(true);
      setOrder((prev) => [prev[1], prev[3], prev[0], prev[2]]);
    });

    const interval = setInterval(() => {
      setOrder((prev) => [prev[1], prev[3], prev[0], prev[2]]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-loader">
      <div className={`loader-diamond ${animate ? "animate" : ""}`}>
        <Image src={images[order[0]]} className="top" width={65} height={65} alt="" />
        <Image src={images[order[1]]} className="left1" width={65} height={65} alt="" />
        <Image src={images[order[2]]} className="right1" width={65} height={65} alt="" />
        <Image src={images[order[3]]} className="bottom" width={65} height={65} alt="" />
      </div>

     
    </div>
  );
}
