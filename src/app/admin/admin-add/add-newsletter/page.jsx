"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Layout from "../../pages/page";
import styles from "../../styles/newsletter.module.css";

// Load JoditEditor dynamically (client-side only)
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function SendNewsletter() {
  const [sendAll, setSendAll] = useState(false);
  const [selectedMail, setSelectedMail] = useState("");
  const [description, setDescription] = useState("");
  const editor = useRef(null); // ref for JoditEditor

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ sendAll, selectedMail, description });
    alert("Newsletter submitted!");
  };

  return (
    <Layout>
      <div className={styles.addcontainer}>
         <div className="headerContainer">
            <div>
                                <span className="breadcrumb">Slider</span> &gt;{' '}
                                <span className="breadcrumbActive">Add Slider</span>
                              </div>
         
        </div>
        
 <div className="addcontent">
          <div className="addright">
        <form className={styles.addform} onSubmit={handleSubmit}>
          <h3>Send News Letter</h3>
          {/* Send All Users Checkbox */}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={sendAll}
              onChange={(e) => setSendAll(e.target.checked)}
            />
            Please Check If You Want To Send Mail All Users.
          </label>

          {/* Mail Selection - only show if sendAll is false */}
      {!sendAll && (
  <label className={styles.addlabel}>
    MAILS
    <select
      value={selectedMail}
      onChange={(e) => setSelectedMail(e.target.value)}
      className={styles.addinput}
    >
      <option value="">-- Select Email --</option>
      <option value="user1@example.com">user1@example.com</option>
      <option value="user2@example.com">user2@example.com</option>
      <option value="user3@example.com">user3@example.com</option>
      {/* Add more emails here */}
    </select>
  </label>
)}

          {/* Description */}
          <label className={styles.addlabel}>
            DESCRIPTION
            <JoditEditor
              ref={editor}
              value={description}
              className={styles.text}
              config={{
                readonly: false,
                height: 300,
                buttons: [
                  "undo","redo","|",
                  "bold","italic","underline","|",
                  "ul","ol","|",
                  "font","fontsize","brush","|",
                  "align","|",
                  "table","link","image","video","|",
                  "source"
                ],
              }}
              onChange={(newContent) => setDescription(newContent)}
            />
          </label>

          <small>Max file size allowed: 500Kb.</small>

          <button type="submit" className={styles.submitBtn}>
            SUBMIT
          </button>
        </form>
      </div>
      </div>
      </div>
    </Layout>
  );
}
