import { useEffect, useState } from "react";

export default function usePopup() {
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
  };

  useEffect(() => {
    if (!popupMessage) return;

    const timer = setTimeout(() => {
      setPopupType(prev => prev + " hide");
      setTimeout(() => {
        setPopupMessage("");
        setPopupType("");
      }, 400);
    }, 4000);

    return () => clearTimeout(timer);
  }, [popupMessage]);

  return { popupMessage, popupType, showPopup };
}
export const handleCopy = (e, text, label, showPopup) => {
  e.stopPropagation();
  navigator.clipboard.writeText(text);
  if (showPopup) {
    showPopup(`${label} copied ✅`, "success");
  }
};