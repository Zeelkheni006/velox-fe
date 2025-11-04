// components/ServiceCards.js
import Image from 'next/image';
import './main.css';
import React from 'react';
import Link from 'next/link';

const services = [
  {
    date: '24 Apr',
    title: 'We Provide Better Home Service.',
    desc: 'Introduction to Velox Home-Based Service Solution: No matter how big or small your home is, there are ways to make it m',
    image: '/images/home-service.jpg',
  },
  {
    date: '18 Jan',
    title: 'Solar Panel Cleaning',
    desc: 'Solar Panel is easy and for Comfort to our Daily Life for Living Better Way. Solar Panels are Produced Energy form Sun',
    image: '/images/solar panel cleaning.jpg',
  },
  {
    date: '17 Jan',
    title: 'Kitchen Cleaning',
    desc: 'Clean Clutter off your Counters... Kitchen is our Daily Life Need. Your kitchen is the Heart of your Home. That mig',
    image: '/images/Kitchen Cleaning.jpg',
  },
   {
    date: '24 Apr',
    title: 'Car Washing',
    desc: 'We Guarantee a Clean CarDo you know your Car is Joined direct your Personalities??? And dirty and Unhygienic car is al',
    image: '/images/car-cleaning.jpg',
  },
  {
    date: '18 Jan',
    title: 'Home Cleaning',
    desc: 'Cleaning is most important in our daily life. In our life we are so busy so it is the more difficult to keep clean and',
    image: '/images/Home Cleaning.jpg',
  },
  {
    date: '17 Jan',
    title: 'AC Service and Repair',
    desc: 'Why We Need to Service Our AC: Essential Benefits and TipsWhen the temperature rises, the first thing we reach for is of',
    image: '/images/AC Service and Repair.webp',
  },
];

export default function ServiceCards() {
  return (
    <div className='container'>
    <div className="cardsContainer">
      {services.map((item, index) => (
        <div key={index} className="card">
          <div className="imageWrapper">
            <Image
              src={item.image}
              alt={item.title}
              layout="responsive"
              width={400}
              height={250}
              className="image"
            />
            <span className="date">{item.date}</span>
          </div>
          <div className="content">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
  <Link href={`/blog-view`}>
  <button className="readMore">READ MORE</button>
</Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
