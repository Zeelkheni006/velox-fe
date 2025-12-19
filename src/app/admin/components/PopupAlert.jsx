import React from "react";
import styles from "../styles/Categories.module.css";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function PopupAlert({ message, type }) {
  if (!message) return null;

   const displayMessage = typeof message === "object" ? (message?.message || JSON.stringify(message)) : message;
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

    
{/* <span>
  {String(
    typeof message === "object" ? message?.message ?? "" : message ?? ""
  ).replace(/^✅ |^❌ /, "")}
</span> */}
 <span>{displayMessage.replace(/^✅ |^❌ /, "")}</span>
 {/* <span>{typeof message === "object" ? (message?.message || JSON.stringify(message)) : message}</span> */}

    </div>
  );
}
