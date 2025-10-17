// src/api/manage_users/manage_customer.js
// src/api/manage_users/manage_customer.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function addCustomer(formDataObj) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token not found. Please login.");

  const formData = new FormData();
  Object.entries(formDataObj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await fetch(`${API_BASE_URL}/api/v1/admin/manage-users/customers/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  // ✅ Read backend response as text (since it’s not JSON)
  const responseText = await res.text();
  console.log("📥 Raw response:", responseText);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}: ${responseText}`);
  }

  // You can choose to return raw text or a simple object
  return { success: true, message: responseText };
}





export async function deleteCustomer(id) {
  const token = localStorage.getItem("access_token"); // or your auth token
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/manage-users/customers/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }

  return res.json();
}


export async function getCustomers({ deleted = false } = {}) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token not found. Please login.");

  // Append query parameter to indicate deleted accounts
  const url = new URL(`${API_BASE_URL}/api/v1/admin/manage-users/customers/get`);
  if (deleted) url.searchParams.append("status", "deleted");

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || `Request failed with status ${res.status}`);

  return result.data?.customers || [];
}

// manage_customer.js
// src/api/manage_users/manage_customer.js
export async function getCustomer({ deleted = false } = {}) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token not found. Please login.");

  // Build URL
  const url = new URL(`${API_BASE_URL}/api/v1/admin/manage-users/customers/get?user=deleted`);
  if (deleted) url.searchParams.append("user", "deleted"); // ✅ append query for deleted accounts

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed with status ${res.status}`);
  }

  const result = await res.json();

  // Normalize customer objects
  return (result.data?.customers || []).map(c => ({
    id: c.id,
    name: c.username || "",
    email: c.email || "",
    mobile: c.phone || "",
    city: c.city || "",
  }));
}

export async function recoverCustomer(customerId) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token not found. Please login.");

  if (!customerId) throw new Error("Customer ID is required.");

  const url = `${API_BASE_URL}/api/v1/admin/manage-users/customers/recover/${customerId}`;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    let result;
    try {
      result = await res.json();
    } catch {
      throw new Error("Failed to parse JSON from server.");
    }

    if (!res.ok) {
      throw new Error(result?.message || `Request failed with status ${res.status}`);
    }

    console.log("✅ Customer recovered successfully:", result);
    return result;
  } catch (err) {
    throw new Error("Error recovering customer: " + err.message);
  }
}





