// services/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log("Sending request to:", url);
  console.log("Request options:", options);

  const res = await fetch(url, { ...options });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    let errorMsg = `Request failed with status ${res.status}`;

    if (data && typeof data === "object") {
      if (data.message && typeof data.message === "object") {
        errorMsg = Object.entries(data.message)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
          .join(" | ");
      } else if (typeof data.message === "string") {
        errorMsg = data.message;
      } else if (data.error) {
        errorMsg = data.error;
      } else {
        errorMsg = JSON.stringify(data) || errorMsg;
      }
    } else if (data) {
      errorMsg = String(data);
    }

    // Fallback to a string if everything fails
    if (!errorMsg) errorMsg = "Unknown error occurred";

    const error = new Error(errorMsg);
    error.data = data;
    throw error;
  }

  return data;
}

// Signup API
export function signupUser(formData) {
  const form = new FormData();
  Object.keys(formData).forEach(key => form.append(key, formData[key]));

  return apiRequest("/api/v1/users/auth/sign-up", {
    method: "POST",
    body: form, // Do not set Content-Type manually
  });
}


// Verify Email OTP
export function verifyEmail(user_id, otp) {
  console.log("verifyEmail called with:", { user_id: user_id, otp });
  return apiRequest("/api/v1/users/auth/verify/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: Number(user_id), otp: Number(otp) }), // correct keys
  });
}

// Verify Phone OTP
export function verifyPhone(user_id, Phoneotp) {
  console.log("verifyPhone called with:", { user_id: user_id, Phoneotp });
  return apiRequest("/api/v1/users/auth/verify/phone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: Number(user_id), Phoneotp: Number(Phoneotp) }), // correct keys
  });
}