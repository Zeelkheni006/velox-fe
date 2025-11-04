import React from "react";
import styles from "../styles/Categories.module.css";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function PopupAlert({ message, type }) {
  if (!message) return null;

  return (
     <div
      className={`${styles["email-popup"]} ${
        styles[type]
      } ${styles.show} flex items-center gap-2`}
    >
      {type.startsWith("success") ? (
        <AiOutlineCheckCircle className="text-green-500 text-lg" />
      ) : (
        <AiOutlineCloseCircle className="text-red-500 text-lg" />
      )}

    
      <span>{message.replace(/^✅ |^❌ /, "")}</span>
    </div>
  );
}
