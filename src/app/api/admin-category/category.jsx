   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function createCategory({ title, logo, description }) {
  try {
    // ✅ Get access token from localStorage
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found — make sure you're logged in!");
      return { success: false, message: "Access token missing" };
    }

    const data = new FormData();
    data.append("title", title);
    data.append("logo", logo);
    data.append("description", description);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/category/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, // ✅ add token here
      },
      body: data,
    });

    const result = await res.json();

    // Always return result object
    return {
      success: result.success || false,
      message: result.message || "Failed to create category",
      data: result.data || null
    };

  } catch (err) {
    console.error("API Error:", err);
    return { success: false, message: err.message || "Failed to create category" };
  }
}

// get category
import { refreshToken } from "../auth/admin-refresh-tocken";

export const fetchCategories = async () => {
  try {
    if (typeof window === "undefined") return [];

    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) return [];

   
    const fetchWithToken = async (token) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/category/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("CATEGORY API RESPONSE:", data);

      const msg = (data?.message || "").toLowerCase();

      //  Detect ALL possible expired token messages
      if (
        msg.includes("access token expired") ||
        msg.includes("access_token_expired") ||
        msg.includes("token expired") ||
        msg.includes("token is expired") ||
        msg.includes("token has expired") ||
        msg.includes("jwt expired") ||
        msg.includes("invalid token") ||
        msg.includes("invalid or expired") ||
        msg.includes("unauthorized")
      ) {
        return "EXPIRED";
      }

      //  Login required patterns
      if (
        msg.includes("login required") ||
        msg.includes("please login") ||
        msg.includes("no auth") ||
        msg.includes("unauthorized user")
      ) {
        return "LOGIN_REQUIRED";
      }

      // Success
      if (data.success && Array.isArray(data.data)) return data.data;

      return [];
    };

   
    let categories = await fetchWithToken(accessToken);

 
    if (categories === "EXPIRED") {
      console.log("Access token expired → calling refresh token API");

      const newToken = await refreshToken(); // refresh token API

      if (!newToken) {
        console.log("❌ Refresh token failed");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return [];
      }

      // Save new token
      localStorage.setItem("access_token", newToken);

      // Retry API
      categories = await fetchWithToken(newToken);

      if (categories === "LOGIN_REQUIRED") {
        console.log("❌ Login required even after refresh");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return [];
      }
    }

    return categories || [];

  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
};



export async function getSubCategories(page = 1, per_page = 10) {
  try {
    // ✅ Get access token from localStorage
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("❌ Access token not found — login first!");
      return { success: false, data: [], page, per_page, total_items: 0, total_page: 1, message: "Access token missing" };
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/list?page=${page}&per_page=${per_page}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`, // ✅ Add Bearer token
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to fetch subcategories');

    return {
      success: data.success,
      data: Array.isArray(data.data) ? data.data : [],
      page: data.page || page,
      per_page: data.per_page || per_page,
      total_items: data.total_items || 0,
      total_page: data.total_page || 1,
      message: data.message || ''
    };
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, data: [], page: 1, per_page: 10, total_items: 0, total_page: 1, message: err.message };
  }
}

// update category
export async function updateCategory(id, formData) {
  try {
    // Get access token from localStorage
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("❌ Access token not found — login first!");
      return { success: false, message: "Access token missing" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/category/update/${id}`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${accessToken}` // ✅ Add Bearer token
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update category");
    }

    return await res.json();
  } catch (err) {
    console.error("❌ updateCategory error:", err);
    return { success: false, message: err.message || "Network error" };
  }
}

export const updateCategoryStatus = async (id, status) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found — login first!");
      return { success: false, message: "Access token missing" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/category/update/status/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // ✅ must have 'Bearer ' prefix
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update category status');
    }

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return { success: false, message: err.message || "API call failed" };
  }
};

