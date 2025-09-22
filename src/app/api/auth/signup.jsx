// services/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options, // headers + body
  });

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
      // Convert object to readable string
      errorMsg = Object.entries(data.message)
        .map(([key, val]) => `${key}: ${val.join(", ")}`)
        .join(" | ");
    } else {
      errorMsg = data.message || data.error || JSON.stringify(data) || errorMsg;
    }
  } else if (data) {
    errorMsg = String(data); // ensure it's a string
  }

  const error = new Error(errorMsg);
  error.data = data; // attach full response
  throw error;
}


  return data;
}

// Signup API call with FormData + debug
export function signupUser(formData) {
  const form = new FormData();
  Object.keys(formData).forEach(key => form.append(key, formData[key]));

  return apiRequest("/api/v1/users/auth/sign-up", {
    method: "POST",
    body: form // DO NOT set Content-Type manually
  });
}

export function verifyEmail(email) {
  return apiRequest("/api/v1/users/auth/verify/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
}
export function verifyPhone(phonenumber) {
  return apiRequest("/api/v1/users/auth/verify/phone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phonenumber })
  });
}