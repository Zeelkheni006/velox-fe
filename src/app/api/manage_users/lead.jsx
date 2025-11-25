const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getLeads(page = 1, perPage = 10, filters = {}) {
  let token = localStorage.getItem("access_token");
  if (!token) throw new Error("⚠️ Please login.");

  const makeRequest = async () => {
    const params = new URLSearchParams({ page, per_page: perPage });

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) return;

      if ((key === "categories" || key === "category_list") && Array.isArray(value)) {
        params.append("category_list", JSON.stringify(value.map(Number)));
      } else if (["country_id", "state_id", "city_id"].includes(key)) {
        params.append(key, Number(value));
      } else if (key === "status") {
        params.append("status", Number(value));
      } else if (Array.isArray(value)) {
        value.forEach((v) => params.append(`${key}[]`, v));
      } else {
        params.append(key, value);
      }
    });

    const hasFilters =
      params.has("category_list") ||
      params.has("city_id") ||
      params.has("state_id") ||
      params.has("country_id") ||
      params.has("name") ||
      params.has("email") ||
      params.has("phone") ||
      params.has("status");

    const endpoint = hasFilters
      ? `/api/v1/admin/manage-users/leads/filter`
      : `/api/v1/admin/manage-users/leads/get`;

    const url = `${API_BASE_URL}${endpoint}?${params.toString()}`;

    // Make request with token
    let res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // If 401 (token expired), refresh and retry once
    if (res.status === 401) {
      token = await refreshAccessToken();
      res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch leads");
    }

    // Normalize leads
    const leads = (data.data?.leads || []).map((l) => ({
      ...l,
      categories: Array.isArray(l.category_list)
        ? l.category_list
        : Array.isArray(l.categories)
        ? l.categories
        : [],
      city: l.city_id?.name || l.city || "",
      state: l.state_id?.name || l.state || "",
      country: l.country_id?.name || l.country || "",
      city_id: l.city_id?.id || l.city_id || "",
      state_id: l.state_id?.id || l.state_id || "",
      country_id: l.country_id?.id || l.country_id || "",
      status:
        Number(l.status) === 0
          ? "PENDING"
          : Number(l.status) === 1
          ? "ACCEPTED"
          : Number(l.status) === 2
          ? "DECLINED"
          : "PENDING",
    }));

    return {
      leads,
      total: data.data?.total || leads.length,
    };
  };

  return makeRequest();
}


export async function updateLeadStatus(id, status) {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error(" Please login.");

    const formData = new FormData();
    formData.append("status", status); 

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/manage-users/leads/update-status/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update status");

    return data;
  } catch (err) {
    console.error(" updateLeadStatus error:", err);
    throw err;
  }
}

export async function updateLead(id, leadData) {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("⚠️ Please login.");

    const formData = new FormData();

    for (const key in leadData) {
      const value = leadData[key];
      if (value === null || value === undefined || value === "") continue;

      // ✅ Special case: send category_list as JSON
      if (key === "category_list" && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value.map(Number)));
      }
      // ✅ Normal array handling (other arrays if any)
      else if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    }

    // Debugging: log full formData
    for (let [k, v] of formData.entries()) console.log("📦", k, v);

    const res = await fetch(
      `${API_BASE_URL}/api/v1/admin/manage-users/leads/update/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `Failed to update lead (${res.status})`);

    return data;
  } catch (err) {
    console.error("updateLead error:", err);
    alert("⚠️ Could not connect to server. Check your network or backend.");
    throw err;
  }
}




export async function getFilterDropdownData() {
  try {
    const token = localStorage.getItem("access_token");
    const res = await fetch(
      `${API_BASE_URL}/api/v1/admin/manage-users/leads/dropdown-data`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load dropdown data");

    return data.data; 
  } catch (err) {
    console.error("Dropdown Fetch Error:", err);
    return {};
  }
}

// src/api/admin/leads.js
export const getLeadDetails = async (id, token) => {
  if (!token) {
    console.error("No token provided to getLeadDetails");
    return { success: false, data: null };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/manage-users/leads/get/one-lead-data/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API returned error:", res.status, text);
      return { success: false, data: null };
    }

    const json = await res.json();
    return json; // json already has { success, data, message }
  } catch (err) {
    console.error("API ERROR → getLeadDetails:", err);
    return { success: false, data: null };
  }
};



