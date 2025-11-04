import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaCalendarAlt, FaUser, FaLink } from 'react-icons/fa';
import './main.css'; // Import CSS

export default function BlogView() {
  const blog = {
    title: 'We Provide Better Home Service.',
    date: '24 Apr, 2023',
    author: 'Mital Chauhan',
    source: 'https://veloxsolution.com/serviceList',
    image: '/images/home-service.jpg',
    strong:'Introduction to Velox Home-Based Service Solution',
    content: [
      '- No matter how big or small your home is, there are ways to make it more comfortable and convenient. Home-based service solutions offer a range of options to help you improve your living space and make it easier to clean.',
      '- From energy efficiency and security systems to automation and home repairs, there are many ways to improve your home and make it more comfortable and convenient. Home-based service solutions can help you save money, too.',
      '- Home Services can also help you save time and money, while providing added convenience. Home-based service solutions can make your home safer, too. Finally, home-based service solutions can help you save money on repairs and maintenance. From Cleaning and Beauty Services and car washing, there are many ways to keep your home in good condition without spending a fortune. No matter what your budget or needs, there are home-based service solutions to help make your home more comfortable and convenient.'
    ],
    benefits: {
      title: 'Benefits of Velox Home-Based Services and Solutions',
      description: 'As technology continues to advance, so do the solutions available to make homes more comfortable and convenient. Home-based services and solutions can make life easier, save money and make the most of your space. Here are some of the benefits of choosing home-based services and solutions:',
      items: [
        { title: 'Low cost', description: 'Home-based solutions are often more affordable, and can be tailored to fit any budget.' },
        { title: 'Efficient', description: 'Home-based solutions are often more efficient than traditional ones, helping reduce energy costs and save time.' },
        { title: 'Flexible', description: 'They can be adjusted to fit any lifestyle and updated as your needs change.' },
        { title: 'Convenient', description: 'Accessible from any device and ideal for busy lifestyles.' },
        { title: 'Secure', description: 'Can be booked at your convenient time, ensuring your home and its contents remain safe.' },
      ],
      conclusion: 'Home-based services and solutions can make life easier, more efficient, and more secure. With the right solution, you can make your home more comfortable and convenient, while saving money in the process.'
    },
      advantages: {
    title: 'Advantages of Choosing Velox Home-Based Services',
    description: `Home-based services offer a number of advantages that can make life easier and more comfortable. From the convenience of having services come to your home, to the savings you can make on energy bills, here are some of the benefits of opting for home-based services.`,

    points: [
      {
        title: 'Convenience',
        content: `One of the biggest advantages of home-based services is convenience. You don't have to travel to a store or business to get what you need. Instead, you can have the service come to you. This saves you time and energy, and it's a great option for those with limited mobility.`
      },
      {
        title: 'Saving Money',
        content: `Another great advantage of home-based services is the potential to save money. Services such as Beauty care Services, Car washing, Home Cleaning, office Cleaning and Solar Panel Cleaning can all help you save on energy bills and other costs. By having the service come to you, you can avoid paying expensive travel fees.`
      },
      {
        title: 'Better Service',
        content: `Lastly, home-based services can provide better quality service. When a service comes to your home, they can assess the situation and address any issues quickly. This ensures that you get the best possible service and results. From convenience to savings, there are many advantages to choosing home-based services. Whether you're in need of Beauty care Services, Car washing, Home Cleaning, office Cleaning and Solar Panel Cleaning, you can enjoy the convenience and cost savings that come with having the service come to you.`
      }
    ]
  },
    tips: {
    title: 'Tips for Choosing the Right Home Solution',
    intro: `When it comes to making your home a more comfortable and convenient place to live, there are many solutions available.
    To help you decide on the best home solutions for your needs, here are some tips to keep in mind.`,
    points: [
      { title: 'Consider Your Space', description: 'Before selecting any home solutions, you need to consider your space.' },
      { title: 'Think About Functionality', description: 'When shopping for home solutions, consider what type of functionality you need.' },
      { title: 'Consider Your Budget', description: 'Home solutions can range from relatively inexpensive to quite expensive, so it’s important to consider your budget before making any purchases. Be sure to shop around for the best deals and compare prices to get the most value for your money.' },
      { title: 'Check Reviews', description: 'Before buying any home solutions, take the time to read reviews from customers who have used the product or service before. This can help you get a better idea of the quality and reliability of the product or service.' },
      { title: 'Stay Up-to-Date', description: 'Technology is constantly evolving, so it’s important to stay up-to-date on the latest trends and products. This can help you find the best home solutions for your needs and stay ahead of the curve.' }
    ],
    conclusion: `By following these tips, you can ensure that you're choosing the right home solutions for your needs.
    With the right products and services, you can make your home a more comfortable and convenient place to live.`
  },
    howHelp: {
    title: 'How Home Solutions Can Help Comfort and Convenience',
    description: `When it comes to making your home comfortable and convenient, there are a variety of home solutions that can help. 
    From smart home technology to energy-efficient appliances, there are plenty of ways to make your home more comfortable and convenient. 
    Smart home cleaning is an excellent way to make your home more comfortable and convenient.`,
    conclusion: `These are just a few of the home solutions that can help make your home more comfortable and convenient. 
    By investing in the right solutions, you can make your home more comfortable and convenient while also saving money on energy bills.`
  },
    recentPosts: [
      { title: 'We Provide Better Home Service.', date: 'Apr 24 - 2023', image: '/images/home-service.jpg', link: '/blog-view/better-home-service' },
      { title: 'Solar Panel Cleaning', date: 'Jan 18 - 2022', image: '/images/solar panel cleaning.jpg', link: '/blog-view/solar-panel-cleaning' },
      { title: 'Kitchen Cleaning', date: 'Jan 17 - 2022', image: '/images/Kitchen Cleaning.jpg', link: '/blog-view/kitchen-cleaning' },
      { title: 'Car Washing', date: 'Jan 17 - 2022', image: '/images/car-cleaning.jpg', link: '/blog-view/car-washing' }
    ],
    tags: ['AC-SERVICE', 'AC-REPAIR', 'TEST', 'CLEANING AND DISINFECTION', 'CAR WASHING','SOLAR PANEL CLEANING','CLEANING AND DISINFECTION','AC-SERVICE','CAR WASHING','AC REPAIR','SOLAR PANEL CLEANING','HOME SERVICE','WOMAN BEAUTY CARE','NAIL CARE','SALON AT HOME','KICHEN CLEANING','AFFORDABLE','AT HOME SOLUTION','NAIL ART','FACIAL','HAIRSPA','MANICURE','PADICURE','BATHROOM CLEANING','DEEP CLEANING','HOME CLEANING','AT YOUR HOME','LOW COST','CONVENIENT','WAXING','CLEANING']
  };

  return (
    <div className="blog-container">
      <main className="blog-main">
        <div className="blog-image">
          <Image src={blog.image} alt={blog.title} width={800} height={400} />
        </div>

        <h1 className="blog-title">{blog.title}</h1>

        <div className="blog-meta flex gap-4 text-sm text-gray-600 my-2">
          <span><FaCalendarAlt className="inline mr-1" /> {blog.date}</span>
          <span><FaUser className="inline mr-1" /> Post By: {blog.author}</span>
          <span><FaLink className="inline mr-1" /> Source: <a href={blog.source} target="_blank">{blog.source}</a></span>
        </div>
<h2>{blog.strong}</h2>
        <div className="blog-content">
          {blog.content.map((line, index) => (
            <li key={index}>{line.replace('- ', '')}</li>
          ))}

          {/* ✅ Benefits Section */}
          <section className="benefits-section">
            <h2>{blog.benefits.title}</h2>
            <p>{blog.benefits.description}</p>
            <ul>
              {blog.benefits.items.map((item, index) => (
                <li key={index}><strong>{item.title}:</strong> {item.description}</li>
              ))}
            </ul>
            <p>{blog.benefits.conclusion}</p>
          </section>

          {/* ✅ NEW: Advantages Section */}
    <section className="advantages-section mt-6">
  <h2>{blog.advantages.title}</h2>
  <p>{blog.advantages.description}</p>

 {blog.advantages.points.map((point, index) => (
  <div key={index} className="advantage-point mt-4">
    <h3 className="flex items-center gap-7">
    
      {point.title}
    </h3>
    <p>{point.content}</p>
  </div>
))}
</section>

  <section className="tips-section mt-6">
    <h2>{blog.tips.title}</h2>
    <p>{blog.tips.intro}</p>

    <ul className="list-disc pl-5 mt-3">
      {blog.tips.points.map((tip, index) => (
        <li key={index} className="mb-2">
          {tip.title}: {tip.description}
        </li>
      ))}
    </ul>

    <p className="mt-4">{blog.tips.conclusion}</p>
  </section>
    <section className="how-help-section mt-6">
    <h2>{blog.howHelp.title}</h2>
    <p>{blog.howHelp.description}</p>
    <p className="mt-3">{blog.howHelp.conclusion}</p>
  </section>
        </div>
      </main>

      {/* Sidebar */}
      <aside className="blog-sidebar">
                <div className="categories">
          <h3>Categories</h3>
          <ul>
            <li>AC Service (1)</li>
            <li>Spa for Women (0)</li>
            <li>Cleaning & Disinfection (3)</li>
            <li>Men Grooming (0)</li>
            <li>Sofa Cleaning (0)</li>
            <li>Car Washing (1)</li>
            <li>Solar Panel (1)</li>
            <li>Women Beauty Care (1)</li>
            <li>Pest Control (1)</li>
            <li>Nails Studio (1)</li>
          </ul>
        </div>
        <div className="recent-post">
          <h3>Recent Post</h3>
          <ul>
            {blog.recentPosts.map((post, index) => (
              <li key={index} className="recent-post-item">
                <Link href={post.link} className="flex gap-2 items-center">
                  <Image src={post.image} alt={post.title} width={70} height={60} className="rounded" />
                  <div>
                    <p>{post.title}</p>
                    <span className="post-date">{post.date}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="tags-section mt-4">
          <h3>Tags</h3>
          <div className="tags-container flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span key={index} className="tag-box px-3 py-1 border rounded-full bg-gray-100 cursor-pointer">{tag}</span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
