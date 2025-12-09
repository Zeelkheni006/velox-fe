// services/franchiseService.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const submitFranchiseRequest = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/franchise/onboarding/make-requests`,
      {
        method: "POST",
        body: formData,
      }
    );

    return await res.json();
  } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
};

export async function checkDuplicate(type, value) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/franchise/onboarding/check-duplicate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,      
          value: value     
        }),
      }
    );

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Duplicate check error:", error);
    return { success: false, message: "Server error, try again!" };
  }
}


