   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem("refresh_token");
    if (!token) return null;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: token }),
          credentials: "include" // if backend uses cookies
      }
    );

    const data = await res.json();
    console.log("REFRESH TOKEN RESPONSE:", data); // ✅ Must log the backend response

    if (!data.success) return null;

    const newAccessToken = data?.data?.access_token;
    if (!newAccessToken) return null;

    localStorage.setItem("access_token", newAccessToken);

    return newAccessToken;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return null;
  }
};

