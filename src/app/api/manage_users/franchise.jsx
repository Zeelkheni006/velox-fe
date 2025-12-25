
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const getFranchiseOwners = async (
  page = 1,
  perPage = 10,
  hasFranchise = 1 
) => {
  try {
    if (typeof window === "undefined")
      return { success: false, data: [], total: 0, pages: 0, page: 1 };

    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token");

    const res = await fetch(
      `${API_BASE_URL}/api/v1/admin/manage-franchise/franchise-owners/get?page=${page}&per_page=${perPage}&has_franchise=${hasFranchise}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    if (data.success && Array.isArray(data.data?.franchise_owners)) {
      return {
        success: true,
        data: data.data.franchise_owners,
        total: data.data.total || 0,
        pages: data.data.pages || 1,
        page: data.data.page || page,
      };
    }

    return { success: false, data: [], total: 0, pages: 0, page: 1 };
  } catch (err) {
    console.error("Error fetching franchise owners:", err);
    return { success: false, data: [], total: 0, pages: 0, page: 1 };
  }
};

export const getFranchiseOwnersData = async (adminId) => {
  try {
    const token = localStorage.getItem("token");
    

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/manage-franchise/franchise-owners/get/franchise-owners-data/${adminId}`,
       {
      method: "POST", // IMPORTANT
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ 
        admin_id: adminId }), // JSON body
    });

    const json = await response.json();
    return json;
  } catch (err) {
    return { success: false, message: "Network error" };
  }
};

export const makeFranchise = async (lead_id, formData) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token missing");

  if (!lead_id) throw new Error("lead_id is required");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/manage-franchise/franchise-owners/make-franchise/${lead_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await res.json();
  return data;
};


// src/app/api/manage_users/franchise.jsx
export const updateFranchiseOwner = async (adminId, payload) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/manage-franchise/franchise-owners/update/franchise-owner-data/${adminId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    console.log("STATUS:", res.status);
    console.log("RESPONSE:", data);

    return data;
  } catch (err) {
    console.error(err);
    return { success: false, message: "Network error" };
  }
};

export const searchFranchiseOwners = async (query) => {
  try {
    const token = localStorage.getItem("access_token"); // ✅ SAME KEY

    const res = await fetch(
      `${API_BASE_URL}/api/v1/admin/manage-franchise/franchise-owners/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.warn("Search API failed:", res.status, data);
      return { success: false, data: [] };
    }

    return data;
  } catch (err) {
    console.error(err);
    return { success: false, data: [] };
  }
};

export const fetchFranchises = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/manage-franchise/franchises/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || `HTTP Error: ${res.status}`);
    }

    return data;

  } catch (err) {
    console.error("Error fetching franchises:", err);
    return {
      success: false,
      data: { franchise_data: [] },
    };
  }
};

export const fetchFranchiseById = async (id) => {
  try {
    const token = localStorage.getItem("access_token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/manage-franchise/franchises/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to fetch franchise details");
    }

    return data;
  } catch (err) {
    console.error("Fetch franchise detail error:", err);
    throw err;
  }
};

export const updateFranchiseStatus = async (franchiseId) => {
  try {
    // ✅ Get access token
    const token = localStorage.getItem("access_token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/manage-franchise/franchises/update/status/${franchiseId}`,
      {
        method: "PATCH", // backend pramane
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Status update failed:", res.status, data);
      return { success: false, message: data?.message || "Update failed" };
    }

    return data;
  } catch (err) {
    console.error("Status update error:", err);
    return { success: false, message: "Network error" };
  }
};

























