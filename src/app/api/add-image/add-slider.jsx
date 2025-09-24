    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    export async function addSlider(formData) {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/slider-image/add`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to add slider");
    }

    return data;
    }
    // ✅ GET sliders list
   // API call to get all sliders
export async function getSliders() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/slider-image/get`, {
      method: "GET",
      cache: "no-store", // prevents caching in Next.js
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch sliders");
    }
    return data?.sliders || data; // return sliders array
  } catch (err) {
    console.error("Error fetching sliders:", err);
    return [];
  }
}



