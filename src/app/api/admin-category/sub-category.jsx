const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // adjust if needed

export async function createSubCategory(formData) {
  try {
    // ✅ Get access token from localStorage
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("❌ Access token not found — login first!");
      return { success: false, message: "Access token missing" };
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}` // ✅ Add Bearer token
      },
      body: formData, // multipart/form-data handled automatically
    });

    const result = await res.json();

    if (!result.success) {
      // flatten backend messages
      const messages = Object.values(result.message).flat().join('\n');
      throw new Error(messages);
    }

    return result;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}



// sub-category api 
export async function getSubCategories(page = 1, per_page = 10, search = "") {
  try {
    const accessToken = localStorage.getItem("access_token");
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/list?page=${page}&per_page=${per_page}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // Must include token
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch subcategories');

    return data;
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, data: [], total_items: 0, total_page: 1, page: 1 };
  }
}


// UPDATE sub-category(PATCH) 
export async function updateSubCategory(id, formData) {
  try {
    // ✅ Get access token from localStorage
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("❌ Access token not found — login first!");
      return { success: false, message: "Access token missing" };
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}` // ✅ Add Bearer token
      },
      body: formData, // multipart/form-data handled automatically
    });

    const data = await res.json();
    return data; // { success: true, data: ... }
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, message: err.message };
  }
}


// category list title

export async function getCategories() {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found — login first!");
      return { success: false, data: [], message: "Access token missing" };
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/category/list/title`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // ✅ Add Bearer token
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch categories');

    return data; // { success: true, data: [...] }
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, data: [], message: err.message };
  }
}


// update status of a subcategory
export async function updateSubCategoryStatus(id, status) {
  if (!id) throw new Error("Subcategory ID is required");

  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found — login first!");
      return { success: false, message: "Access token missing" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/sub-category/update/status/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // ✅ Added token
      },
      body: JSON.stringify({ status })
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in updateSubCategoryStatus:", err);
    return { success: false, message: err.message || "API call failed" };
  }
}

