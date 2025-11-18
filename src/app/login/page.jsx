"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./main.css"; 
import usePopup from '../admin/components/popup';
import PopupAlert from "../admin/components/PopupAlert";
export default function LoginTypeModal() {
  const [loginType, setLoginType] = useState("");
  const router = useRouter(); // ✅ Create router instance
 const { popupMessage, popupType, showPopup } = usePopup();
  const handleClose = () => {
    router.push("/"); // ✅ Redirect to home page
  };

 const handleConfirm = () => {
  if (loginType === 'user') {
    router.push('/login-account'); // ✅ navigate to customer login modal
  } else if (loginType === 'professional') {
    router.push('/professionallogin'); // (Optional: for other login types)
  } else {
    showPopup("Please select a login type");
  }
};


  return (

      <div className="login-page">
         <PopupAlert message={popupMessage} type={popupType} />
      <iframe
        src="/"
        className="iframe-bg"
        frameBorder="0"
        title="Homepage Background"
      ></iframe>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-overlay">
      <div className="bg-white rounded-lg shadow-lg w-[320px] p-6 relative modal-box">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl close-btn"
          onClick={handleClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Modal content */}
        <h2 className="text-center text-xl font-medium mb-4">Login as a</h2>

        <select
          className="w-full border border-gray-300 rounded px-3 py-2 mb-5"
          value={loginType}
          onChange={(e) => setLoginType(e.target.value)}
        >
          <option value="">Select Login Type</option>
          <option value="user">Customer</option>
          <option value="professional">Franchise</option>
         
        </select>

        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition confirm"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
    </div>
  );
}