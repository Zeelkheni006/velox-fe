'use client';
import styles from '../styles/Categories.module.css';
import Layout from "../pages/page";
import { useRouter } from 'next/navigation';

const categories = [
  { title: 'NAIL Studio', logo: '/icon/nail.png', status: 'ACTIVE' },
  { title: 'R O Water Purifier', logo: '/icon/water.png', status: 'INACTIVE' },
  { title: 'Skin Treatment', logo: '/icon/skin.png', status: 'ACTIVE' },
  { title: 'Pest Control', logo: '/icon/pest.png', status: 'ACTIVE' },
  { title: 'Women Beauty Care', logo: '/icon/beauty.png', status: 'ACTIVE' },
  { title: 'Solar Panel', logo: '/icon/solar.png', status: 'ACTIVE' },
  { title: 'Car Washing', logo: '/icon/car-wash.png', status: 'ACTIVE' },
  { title: 'Sofa Cleaning', logo: '/icon/sofa.png', status: 'ACTIVE' },
  { title: 'Men Grooming', logo: '/icon/grooming.png', status: 'ACTIVE' },
];

export default function Categories() {
      const router = useRouter(); // ✅ Initialize router

  const handleAddCategory = () => {
    router.push('/admin/add-categories'); // ✅ Navigate to Add Category page
  };
  return (
    <Layout>
    <div className={styles.container}>
         <div className={styles.headerContainer}>
                  <div>
                    <span className={styles.breadcrumb}>Category</span> &gt;{" "}
                    <span className={styles.breadcrumbActive}>Category</span>
                  </div>
                </div>
          <div className={styles.card}>      
      <h3>Categories</h3>
          <button className={styles.addBtn} onClick={handleAddCategory}>
            + Add New
          </button>
  <div className={styles.showEntries}>
            Show{" "}
            <select
              className={styles.select1}
              
              
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>{" "}
            entries
          </div>
            <div className={styles.controls}>
           
          </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Logo</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={index}>
              <td>{cat.title}</td>
              <td>
                <img src={cat.logo} alt={cat.title} className={styles.logo} />
              </td>
              <td>
                <span className={`${styles.status} ${cat.status === 'ACTIVE' ? styles.active : styles.inactive}`}>
                  {cat.status}
                </span>
              </td>
              <td>
               <button
  className={styles.editBtn}
  onClick={() => router.push(`/admin/edit-category?title=${encodeURIComponent(cat.title)}`)}
>
  Edit
</button>
                <button className={styles.deleteBtn}>Delete</button>
                <button className={cat.status === 'ACTIVE' ? styles.inactiveBtn : styles.activeBtn}>
                  {cat.status === 'ACTIVE' ? 'In Active' : 'Active'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div> 
    </div>
    </Layout>
  );
}
