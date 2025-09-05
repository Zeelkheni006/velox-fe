// components/EasyRegisterProcess.js
import React from 'react';
import Image from "next/image";
import './main.css';  

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

          <form className="form">
            <div className="row">
              <input type="text" placeholder="Enter your name" required />
              <input type="tel" placeholder="Enter your phone" required />
            </div>

            <div className="row">
              <input type="email" placeholder="Email" required />
              <select required>
                <option value="">Select Country</option>
                <option>India</option>
              </select>
            </div>

            <div className="row">
              <select required>
                <option value="">Select State</option>
                <option>Gujarat</option>
              </select>
              <select required>
                <option value="">Select City</option>
                <option>Ahmedabad</option>
              </select>
            </div>

            <textarea placeholder="What do you do?" rows={4} />

            <button type="submit">Submit</button>
          </form>
        </div>
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
