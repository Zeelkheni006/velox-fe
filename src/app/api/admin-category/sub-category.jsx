const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // adjust if needed

export async function createSubCategory(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/create`, {
      method: 'POST',
      body: formData,
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
export async function getSubCategories(page = 1, per_page = 500) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/list?page=${page}&per_page=${per_page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch subcategories');

    return data; 
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, data: [], message: err.message };
  }
}

// UPDATE sub-category(PATCH) 
export async function updateSubCategory(id, formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/update/${id}`, {
      method: 'PATCH',
      body: formData,
    });

    const data = await res.json();
    return data; // { success: true, data: ... }
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, message: err.message };
  }
}