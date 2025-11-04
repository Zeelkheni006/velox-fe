import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    slug: 'web-design',
    title: 'Web Design',
    desc: 'Full-stack web design service',
    date: '2025-09-01',
    image: '/images/web-design.jpg',
    content: 'This is the full content for Web Design service...',
  },
  {
    slug: 'seo-optimization',
    title: 'SEO Optimization',
    desc: 'Improve your SEO ranking',
    date: '2025-08-15',
    image: '/images/seo.jpg',
    content: 'This is the full content for SEO Optimization...',
  },
];

export default function ServiceDetailPage({ params }) {
  const { slug } = params;

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <div style={{ padding: '2rem' }}><h4>404 - Service not found</h4></div>;
  }

  return (
    <div className="serviceDetail">
      <Link href="/services">
        <button className="backButton">← Back to Services</button>
      </Link>
      <div className="imageWrapper">
        <Image
          src={service.image}
          alt={service.title}
          width={800}
          height={400}
          layout="responsive"
        />
      </div>
      <div style={{ padding: '2rem' }}>
        <h1>{service.title}</h1>
        <p><strong>Date:</strong> {service.date}</p>
        <p>{service.content}</p>
      </div>
    </div>
  );
}
