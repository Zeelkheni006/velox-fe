const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function getLeads(page = 1, perPage = 10, filters = {}) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error(" Please login.");

  const params = new URLSearchParams({ page, per_page: perPage });

  // Append filters
  Object.entries(filters).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return; // skip empty filters
    }

    // Special handling for categories
    if ((key === "categories" || key === "category_list") && Array.isArray(value)) {
      params.append("category_list", JSON.stringify(value.map(Number)));
    }
    // Special handling for city (single ID)
    else if (key === "city_id") {
      params.append("city_id", Number(value));
    }
    // Status filter (frontend string → backend number)

    // Normal array or value
    else if (Array.isArray(value)) {
      value.forEach(v => params.append(`${key}[]`, v));
    } else {
      params.append(key, value);
    }
  });

  // Determine endpoint
  const hasFilters =
    params.has("category_list") ||
    params.has("city_id") ||
    params.has("name") ||
    params.has("email") ||
    params.has("phone") ||
    params.has("status");

  const endpoint = hasFilters
    ? `/api/v1/admin/manage-users/leads/filter`
    : `/api/v1/admin/manage-users/leads/get`;

  console.log("Request URL:", `${API_BASE_URL}${endpoint}?${params.toString()}`);

  const res = await fetch(`${API_BASE_URL}${endpoint}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message);

  const leads = (data.data.leads || []).map(l => ({
    ...l,
    categories: Array.isArray(l.category_list)
      ? l.category_list
      : Array.isArray(l.categories)
      ? l.categories
      : [],
    city: l.city || l.city_id || "",
    state: l.state || l.state_id || "",
    country: l.country || l.country_id || "",
    status:
      Number(l.status) === 0
        ? "PENDING"
        : Number(l.status) === 1
        ? "ACCEPTED"
        : Number(l.status) === 2
        ? "DECLINE"
        : "PENDING",
  }));

  return {
    leads,
    total: data.data.total || leads.length,
  };
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
      if (Array.isArray(leadData[key])) {
        leadData[key].forEach(value => formData.append(`${key}`, value));
      } else {
        formData.append(key, leadData[key]);
      }
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/manage-users/leads/update/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || `Failed to update lead (status ${res.status})`);
    }

    return await res.json();
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

