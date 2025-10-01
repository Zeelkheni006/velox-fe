const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// category and sub-category api
export async function getCategoriesWithSubcategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/sub-category/list/category-with-subcategory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch categories');

    const data = await res.json();
    return data.data?.categories || []; // <-- fix: access categories inside data
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

// add service api



export async function createService(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/service/create`, {
      method: 'POST',
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

