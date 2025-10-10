"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Layout from "../pages/page";
import styles from "../styles/adminAbout.module.css";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AdminAbout() {
    const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // ---------- About Section ----------
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDesc, setAboutDesc] = useState("");
  const aboutEditor = useRef(null);
  const handleAboutSubmit = () => alert("About section submitted!");

  // ---------- Mission Section ----------
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDesc, setMissionDesc] = useState("");
  const missionEditor = useRef(null);
  const handleMissionSubmit = () => alert("Mission section submitted!");

  // ---------- Vision Section ----------
  const [visionTitle, setVisionTitle] = useState("");
  const [visionDesc, setVisionDesc] = useState("");
  const visionEditor = useRef(null);
  const handleVisionSubmit = () => alert("Vision section submitted!");

  // ---------- Who We Are Section ----------
  const [whoTitle, setWhoTitle] = useState("");
  const [whoImage, setWhoImage] = useState(null);
  const [whoDesc, setWhoDesc] = useState("");
  const whoEditor = useRef(null);
  const handleWhoSubmit = () => {
    if (whoImage && whoImage.size > 500 * 1024) {
      alert("Max file size allowed: 500Kb");
      return;
    }
    alert("Who We Are section submitted!");
  };

  // ---------- Our Team ----------
  const [team, setTeam] = useState([
    { id: 1, name: "John Doe", image: "", designation: "CEO", status: "Active" },
  ]);
  const [teamEntries, setTeamEntries] = useState(10);
  const [teamSearch, setTeamSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
 const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const handleAddTeam = () => {
    const name = prompt("Enter name:");
    if (!name) return;
    setTeam([...team, { id: team.length + 1, name, image: "", designation: "", status: "Active" }]);
  };

  const toggleStatus = (id) => {
    setTeam(team.map(m => m.id === id ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" } : m));
  };

  const editTeam = (id) => {
      router.push(`/admin/edit-about?id=${id}`);
    
  };

  // ---------- Team Search & Pagination ----------
  const filteredTeam = useMemo(() => {
    return team.filter(t => t.name.toLowerCase().includes(teamSearch.toLowerCase()));
  }, [team, teamSearch]);

  const totalPages = Math.ceil(filteredTeam.length / teamEntries);
  const startIndex = (currentPage - 1) * teamEntries;
  const endIndex = Math.min(startIndex + teamEntries, filteredTeam.length);
  const currentTeam = filteredTeam.slice(startIndex, endIndex);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
const navigateToAddAbout = () => {
  router.push("/admin/admin-add/add-about");
};
  useEffect(() => setMounted(true), []);


  return (
    <Layout>
      <div className={styles.container}>
           <div className={styles.headerContainer}>
                  <div>
                    <span className={styles.breadcrumb}>About</span> &gt;{" "}
                    <span className={styles.breadcrumbActive}>About</span>
                  </div>
                </div>
        {/* About Section */}

        <section className={styles.section}>
          <h2>About Section</h2>
          <label>Title:</label>
          <input
            type="text"
            value={aboutTitle}
            onChange={(e) => setAboutTitle(e.target.value)}
          />
          <label>Description:</label>
          {mounted && (
  <JoditEditor
    ref={aboutEditor}   
    value={aboutDesc}  
    config={{
      readonly: false,
      height: 200,
      toolbarSticky: false,
      buttons: [
        'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'ul', 'ol', '|',
        'link', 'image', 'video', '|',
        'align', '|',
        'source', '|',
        'help'
      ]
    }}
    tabIndex={1}
    onBlur={(newContent) => setDescription(newContent)}
  />
)}
          <span>Max file size allowed: 500Kb</span>
          <button onClick={handleAboutSubmit} className={styles.submitBtn}>
            Submit
          </button>
        </section>

        {/* Mission Section */}
        <section className={styles.section}>
          <h2>Mission Section</h2>
          <label>Title:</label>
          <input
            type="text"
            value={missionTitle}
            onChange={(e) => setMissionTitle(e.target.value)}
          />
          <label>Description:</label>
         {mounted && (
  <JoditEditor
    ref={aboutEditor} 
     value={aboutDesc}  
    config={{
      readonly: false,
      height: 200,
      toolbarSticky: false,
      buttons: [
        'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'ul', 'ol', '|',
        'link', 'image', 'video', '|',
        'align', '|',
        'source', '|',
        'help'
      ]
    }}
    tabIndex={1}
    onBlur={(newContent) => setDescription(newContent)}
  />
)}
          <span>Max file size allowed: 500Kb</span>
          <button onClick={handleMissionSubmit} className={styles.submitBtn}>
            Submit
          </button>
        </section>

        {/* Vision Section */}
        <section className={styles.section}>
          <h2>Vision Section</h2>
          <label>Title:</label>
          <input
            type="text"
            value={visionTitle}
            onChange={(e) => setVisionTitle(e.target.value)}
          />
          <label>Description:</label>
         {mounted && (
  <JoditEditor
       ref={aboutEditor} 
     value={aboutDesc}  
    config={{
      readonly: false,
      height: 200,
      toolbarSticky: false,
      buttons: [
        'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'ul', 'ol', '|',
        'link', 'image', 'video', '|',
        'align', '|',
        'source', '|',
        'help'
      ]
    }}
    tabIndex={1}
    onBlur={(newContent) => setDescription(newContent)}
  />
)}
          <span>Max file size allowed: 500Kb</span>
          <button onClick={handleVisionSubmit} className={styles.submitBtn}>
            Submit
          </button>
        </section>

        {/* Who We Are Section */}
        <section className={styles.section}>
          <h2>Who We Are Section</h2>
          <label>Title:</label>
          <input
            type="text"
            value={whoTitle}
            onChange={(e) => setWhoTitle(e.target.value)}
          />
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setWhoImage(e.target.files[0])}
          />
          <label>Description:</label>
         {mounted && (
  <JoditEditor
      ref={aboutEditor}
    value={aboutDesc}  
    config={{
      readonly: false,
      height: 200,
      toolbarSticky: false,
      buttons: [
        'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'ul', 'ol', '|',
        'link', 'image', 'video', '|',
        'align', '|',
        'source', '|',
        'help'
      ]
    }}
    tabIndex={1}
    onBlur={(newContent) => setDescription(newContent)}
  />
)}
          <span>Max file size allowed: 500Kb</span>
          <button onClick={handleWhoSubmit} className={styles.submitBtn}>
            Submit
          </button>
        </section>

        {/* Our Team Section */}
          <section className={styles.section}>
              <div className={styles.card}>
          <h2>Our Team</h2>
        <button className={styles.addBtn} onClick={navigateToAddAbout}>Add New</button>

          <div className={styles.controls}>
            <label>
              Show{" "}
              <select value={teamEntries}   className={styles.select}onChange={e => { setTeamEntries(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{" "} entries
            </label>
            <label className={styles.searchLabel}>
              Search:{" "}
              <input type="text"    className={styles.search}placeholder="Search..." value={teamSearch} onChange={e => { setTeamSearch(e.target.value); setCurrentPage(1); }} />
            </label>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTeam.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.image ? "Uploaded" : "No Image"}</td>
                  <td>{member.designation}</td>
                  <td>
                      <span
                        className={`${styles.status} ${
                          member.status === "Active"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                  <td>
                    <button
  className={styles.editbtn}
  onClick={() => editTeam(member.id)}
>
  Edit
</button>
                    <button
                      className={`${styles.actionBtn} ${member.status === "Active" ? styles.deactivateBtn : styles.activateBtn}`}
                      onClick={() => toggleStatus(member.id)}
                    >
                      {member.status === "Active" ? "InActive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span>
              {filteredTeam.length === 0
                ? "No entries found"
                : `Showing ${startIndex + 1} to ${endIndex} of ${filteredTeam.length} entries`}
            </span>
            <div className={styles.paginationControls}>
              <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span className={styles.pageNumber}>{currentPage}</span>
              <button className={styles.paginationButton} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
          </div>
        </section>  
        
      </div>
    </Layout>
  );
}
