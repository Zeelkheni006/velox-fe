export const refreshToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/auth/refresh`,
      {
        method: "POST",
        credentials: "include", // ✅ send HttpOnly cookie automatically
        headers: { "Content-Type": "application/json" }, // ✅ added missing comma
        // no body needed, backend reads cookie
      }
    );

    if (!res.ok) {
      console.error("Refresh token HTTP error:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    console.log("REFRESH TOKEN RESPONSE:", data); // optional: debug

    if (!data.success) {
      console.error("Refresh token failed, success=false");
      return null;
    }

    const newAccessToken = data?.data?.access_token;
    if (!newAccessToken) {
      console.error("No access_token returned from refresh");
      return null;
    }

    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;

  } catch (err) {
    console.error("Error refreshing token:", err);
    return null;
  }
};
