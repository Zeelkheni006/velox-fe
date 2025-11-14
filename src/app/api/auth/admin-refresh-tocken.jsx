const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Function to refresh access token
async function refreshAccessToken() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/auth/refresh`, {
      method: "POST",
      credentials: "include", // send cookie
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to refresh token");
    }

    const newToken = data.data?.access_token;
    if (newToken) {
      localStorage.setItem("access_token", newToken);
      return newToken;
    } else {
      throw new Error("No access token returned by refresh API");
    }
  } catch (err) {
    console.error("Refresh token failed:", err);
    throw err; // Let caller handle logout if needed
  }
}