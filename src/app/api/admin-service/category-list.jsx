  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // category and sub-category api
export async function getCategoriesWithSubcategories() {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found — login first!");
      return [];
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/list/category-with-subcategory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // ✅ Added token
      },
    });

    if (!res.ok) throw new Error('Failed to fetch categories');

    const data = await res.json();
    return data.data?.categories || [];
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}


  // add service api



export async function createService(formData) {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found — login first!");
      return { success: false, message: "Access token missing" };
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/service/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // ✅ Add token
      },
      body: formData, // formData includes all required fields and files
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to create service');
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error creating service:', err);
    throw err; // re-throw to handle in component
  }
}


  // Get all services api
export async function getServices() {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found — login first!");
      return { success: false, services: [], message: "Access token missing" };
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/service/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // ✅ Add token
      },
      cache: "no-store"
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch services');
    }

    return await res.json(); // expect { success: true, services: [...] }
  } catch (err) {
    console.error('Error fetching services:', err);
    return { success: false, services: [], message: err.message };
  }
}


export const updateService = async (id, data) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token found");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/service/update/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ Do NOT set Content-Type manually for FormData
      },
      body: data,
    }
  );

  return await response.json();
};

// /api/manage_users/service.js
export const getServiceTitleIds = async () => {
  try {
    const token = localStorage.getItem("access_token"); // Or wherever you store it
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/service/get/title-ids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch services");
    }

    // Map services to React-Select format
    return Array.isArray(data.data.services)
      ? data.data.services.map((s) => ({ label: s.title.trim(), value: s.id }))
      : [];
  } catch (err) {
    console.error("Service fetch error:", err);
    throw err;
  }
};

export const updateServiceStatus = async (serviceId) => {
  try {
    const token = localStorage.getItem("access_token"); 

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/service/update/status/${serviceId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ token added
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Status update failed");
    }

    return data; // { success: true, message: "...", data: {...} }
  } catch (error) {
    throw error;
  }
};






