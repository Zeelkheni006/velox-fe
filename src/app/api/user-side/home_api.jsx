const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getStats = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/home-page-body/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();
    if (!json.success) return {};

    return json.data[0]; 
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {};
  }
};

export const addNewsletterEmail = async (email) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/home-page-footer/news-letter/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return { success: false, message: "Server error" };
  }
};

export const fetchSliders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/user-side/slider-image/get`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch sliders");
    }
    const data = await response.json();
    return data; // expected { success: true, data: [...] }
  } catch (error) {
    console.error("Slider fetch error:", error);
    return { success: false, data: [], message: error?.message || "Unknown error" };
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/home_page_body/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add authorization if required
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch categories");
    }

    const data = await res.json();
    return data.data; // return the "data" array
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
export const getCityWiseCategories = async (city) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/home_page_body/city-wise`,
      {
        method: "POST", // ✅ MUST be POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }), // ✅ body only in POST
      }
    );

    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("City-wise category error:", error);
    return [];
  }
};




