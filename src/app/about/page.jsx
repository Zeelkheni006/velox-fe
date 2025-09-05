import React from 'react';
import Image from "next/image";
import './main.css';  
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
const teamMembers = [
  {
    name: 'MAYANK RATHOD',
    title: 'M.D.',
    image: '/images/mayank.jpg', // Image must be placed inside public/images
  },
  {
    name: 'JALPA RATHOD',
    title: 'MANAGING DIRECTOR',
    image: '/images/jalpa.jpg',
  },
];
export default function aboutpage() {
    return (
        <section className="container">
      <h2 className="title">
        Velox Solution : Leading the Way in Doorstep Service Innovation
      </h2>

      <p className="description">
        At Velox Solution, we pride ourselves on offering top-notch services delivered by the best servicemen in the industry. We meticulously manage all services under our official trainers to ensure excellence in every job. Our comprehensive training programs guarantee that our servicemen perform at their best, whether it's AC service repair, beauty services, men's salon treatments, massage therapy, cleaning and disinfection, plumbing, carpentry, appliance repair, painting, and more. Our vision is to empower millions of service professionals worldwide to provide unparalleled doorstep services. Velox partners with tens of thousands of service providers, offering support in various aspects such as training, technology, product procurement, insurance, and more, to ensure they deliver exceptional service experiences.
      </p>

      <div className="cards">
        <div className="card-first">
          <h3>The Mission is</h3>
          <p>
            Our Mission is to Empower Millions of Service Professionals<br />
            By Delivering Services at Door Step<br />
            To our Customers in a Way<br />
            That has never been Experienced Before.<br />
            Velox will become the Bridge of Customer and Professionals<br />
            Velox want to give them best and New Services.
          </p>
        </div>

        <div className="card1">
          <h3>The Vision is</h3>
          <p>
            Customers are our First key Stakeholders.<br />
            Velox aim to Understand their Pain Points when It comes to hiring<br />
            Professionals and help them find the solution give them Best Services.<br />
            And our service site is not so slow complicated and odd<br />
            But It is very Fast, Easy and<br />
            You can get our service easily and get soon at your Door Step.
          </p>
        </div>
      </div>
  
      <div className="who-we-are">
      <div className="text-section">
        <h2>
          Who we are
          <span className="underline" />
        </h2>
        <p>
          Velox Solution started in November 2019. We're the biggest platform in India for
          doorstep services, especially in Gujarat. Velox makes it easy for customers to book reliable
          services right at their door, including beauty treatments, massage therapy, cleaning,
          plumbing, carpentry, appliance repair, painting, and more. Our goal is to empower millions
          of service professionals globally to provide top-notch services like never before, right at
          the customer's doorstep. We partner with tens of thousands of service professionals,
          supporting them with training, credit, product procurement, insurance, and technology to
          ensure they deliver the best service possible.
        </p>
      </div>

      <div className="image-section">
        <Image
          src="/images/about1.jpg" // Put your image in public/images/
          alt="Who we are"
          width={600}
          height={400}
          className="rounded-img"
        />
      </div>
    </div>
    
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stats-grid ">
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
          <div className="team-container">
      <h2 className="team-heading">
        Meet <span>Our Team</span>
        <div className="underline" />
      </h2>

      <div className="team-cards">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <div className="team-img">
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="rounded-img"
              />
            </div>
            <h4>{member.name}</h4>
            <span className="team-role">{member.title}</span>
          </div>
        ))}
      </div>
    </div>
        </section>  
    
    );
}