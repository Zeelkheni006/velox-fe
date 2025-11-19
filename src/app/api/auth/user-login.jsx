const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function loginInitiate(credential) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/auth/login/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }), // backend expects { credential: "phone/email" }
    });
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}

export async function loginWithPassword(credential, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/auth/login/through/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential, password }),
    });
    return await res.json(); // will contain access_token and user_id
  } catch (err) {
    console.error("API error (loginWithPassword):", err);
    throw err;
  }
}

export async function sendOtp(credential) {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/auth/login/through/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential })
  });
  return await res.json();
}

export async function verifyOtp(credential, otp) {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/auth/login/through/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential, otp })
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}

export const initiateForgotPassword = async (email) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/users/auth/forgot-password/initiate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    return data;

  } catch (err) {
    console.error("Forgot Password API Error:", err);

    return {
      success: false,
      message: "Server error, please try again later.",
      data: {},
    };
  }
};
export const verifyResetPassword = async (token, password) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/auth/reset-password/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      }
    );

    return await res.json();
  } catch {
    return { success: false, message: "Server error" };
  }
};


