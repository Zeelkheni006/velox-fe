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

// services/locationApi.js

export async function getFullLocation(cityName) {
  const API_KEY = "https://api.opencagedata.com/geocode/v1/json?q=52.5432379%2C+13.4142133&key=YOUR-API-KEY"; // <-- અહીં તમારી સાચી API key મૂકો

  try {
  
const res = await fetch(
  `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=${API_KEY}&limit=1&language=en&countrycode=in`
);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].formatted; // Example: Surat, Gujarat, India
    } else {
      return "No location found";
    }
  } catch (err) {
    console.error("Error fetching location:", err);
    return "Error fetching location";
  }
}








