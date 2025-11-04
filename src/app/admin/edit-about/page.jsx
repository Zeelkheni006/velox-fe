"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Layout from "../pages/page";
import styles from "../styles/adminAbout.module.css";

export default function EditAbout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const memberId = searchParams.get("id");

  // Dummy data; in real app, fetch from API or context
  const dummyTeam = [
    { id: 1, name: "John Doe", image: "", designation: "CEO", status: "Active" },
    { id: 2, name: "Jane Smith", image: "", designation: "Manager", status: "Active" },
  ];

  // Find selected member
  const selectedMember = dummyTeam.find((m) => m.id === Number(memberId));

  // Form states
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    if (selectedMember) {
      setName(selectedMember.name);
      setDesignation(selectedMember.designation);
      setImage(selectedMember.image); // could be URL or file placeholder
    }
  }, [selectedMember]);

  const handleSubmit = () => {
    alert("Team member updated!");
    router.push("/admin/admin-about"); // redirect back to team list
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.breadcrumb}>About Us</span> &gt; <span className={styles.breadcrumbActive}>Edit Our Team</span>
          </div>
        </div>

        <section className={styles.section}>
          <h2>Edit Our Team</h2>

          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

          <label>Designation:</label>
          <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />

          <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
        </section>
      </div>
    </Layout>
  );
}
