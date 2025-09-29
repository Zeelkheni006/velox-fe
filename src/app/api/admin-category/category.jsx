   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createCategory({ title, logo, description }) {
  try {
    const data = new FormData();
    data.append("title", title);
    data.append("logo", logo);
    data.append("description", description);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/category/create`, {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to create category");
    }

    return result;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}
// get category
export const fetchCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/category/get`);
    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    if (data.success && Array.isArray(data.data)) return data.data;
    return [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
};

export async function getSubCategories(page = 1, per_page = 10) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/list?page=${page}&per_page=${per_page}`);
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

