// export const refreshToken = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/auth/refresh`,
//       {
//         method: "POST",
//         credentials: "include", // ✅ send HttpOnly cookie automatically
//         headers: { "Content-Type": "application/json" }, // ✅ added missing comma
//         // no body needed, backend reads cookie
//       }
//     );

//     if (!res.ok) {
//       console.error("Refresh token HTTP error:", res.status, res.statusText);
//       return null;
//     }

//     const data = await res.json();
//     console.log("REFRESH TOKEN RESPONSE:", data); // optional: debug

//     if (!data.success) {
//       console.error("Refresh token failed, success=false");
//       return null;
//     }

//     const newAccessToken = data?.data?.access_token;
//     if (!newAccessToken) {
//       console.error("No access_token returned from refresh");
//       return null;
//     }

//     localStorage.setItem("access_token", newAccessToken);
//     return newAccessToken;

//   } catch (err) {
//     console.error("Error refreshing token:", err);
//     return null;
//   }
// };
// utils/apiClient.js
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newToken) => {
  refreshSubscribers.map((cb) => cb(newToken));
  refreshSubscribers = [];
};

export const refreshToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const newToken = data?.data?.access_token;

    if (newToken) {
      localStorage.setItem("access_token", newToken);
      return newToken;
    }
    return null;
  } catch (err) {
    console.error("Refresh error:", err);
    return null;
  }
};

export const apiClient = async (url, options = {}) => {
  let accessToken = localStorage.getItem("access_token");

  // attach token
  const config = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  let response = await fetch(url, config);

  // If token expired -> 401
  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;

      const newToken = await refreshToken();
      isRefreshing = false;

      if (newToken) {
        onRefreshed(newToken);
      }
    }

    // return a new Promise while waiting for refresh
    return new Promise((resolve) => {
      subscribeTokenRefresh(async (newToken) => {
        const retryConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newToken}`,
          },
        };
        const retryResponse = await fetch(url, retryConfig);
        resolve(retryResponse);
      });
    });
  }

  return response;
};
