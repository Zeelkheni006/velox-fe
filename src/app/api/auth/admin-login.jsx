const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function initiateAdminLogin(email) {
  try {
    // Raw body (just plain text or custom format)
    const raw = `email=${email}`; // 🔹 raw format instead of JSON
    console.log("Raw request body:", raw);

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/auth/login/initiate`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json', // 🔹 send JSON
      },
            body: JSON.stringify({ email }), 
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

 const data = await res.json();
    console.log('API response:', data);  // 🔹 log the actual response
    return data;
  } catch (err) {
    console.error('Error initiating admin login:', err);
    throw err;
  }
}   
// password api 
export async function loginWithPassword(email, password) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/auth/login/through/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return data;
}
export async function sendOtp(email) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/auth/login/through/otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send OTP");
  return data;
}

export async function loginWithOtp(email, id, otp) {
  console.log("Sending OTP verify request:", { email, id, otp});

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/auth/login/through/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, id, otp }),
    });

    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      console.warn("Failed to parse JSON response:", err);
    }

    console.log("OTP verify response:", res.status, res.ok, data);

    if (!res.ok) {
      return { ok: false, status: res.status, message: data.message || "OTP verification failed" };
    }

    return { ok: true, status: res.status, ...data };
  } catch (err) {
    console.error("Network/API error:", err);
    return { ok: false, message: "Network/API error" };
  }
}

export const changePassword = async ({ userId, oldPassword, newPassword, confirmPassword, token = "" }) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/auth/change-password/${userId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData.message) || "Failed to change password");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};



