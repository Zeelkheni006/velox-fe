const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function getLeads(page = 1, perPage = 10, filters = {}) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("⚠️ Please login.");

  const params = new URLSearchParams({
    page,
    per_page: perPage,
    ...filters,
  });

  const res = await fetch(`${API_BASE_URL}/api/v1/admin/manage-users/leads/get?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();

  if (!res.ok || !data.success) throw new Error(data.message || "Failed to fetch leads");

  return {
    leads: data.data.leads || [],
    total: data.data.total || 0,
  };
}



export async function updateLeadStatus(id, status) {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("⚠️ Please login.");

    const formData = new FormData();
    formData.append("status", status); // now integer (1 or 2)

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

    const res = await fetch(
      `${API_BASE_URL}/api/v1/admin/manage-users/leads/update/${id}`, 
      {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData
      }
    );

    const data = await res.json();
    if (!res.ok) throw data;

    return data;
  } catch (err) {
    console.error("updateLead error:", err);
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

    return data.data; // ✅ expect { names, emails, phones, categories, statuses, cities }
  } catch (err) {
    console.error("Dropdown Fetch Error:", err);
    return {};
  }
}

