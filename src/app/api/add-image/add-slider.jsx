    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addSlider(formData) {
  try {
    const token = localStorage.getItem('access_token'); // get your token

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/slider-image/add`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}` // use the correct variable
      },
      body: formData, // formData includes files and other fields
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add slider");
    }

    return data;
  } catch (err) {
    console.error("Error adding slider:", err);
    throw err;
  }
}


    // ✅ GET sliders list
   // API call to get all sliders
// API call to get all sliders
export async function getSliders() {
  try {
    const token = localStorage.getItem('access_token'); // get token from localStorage
    if (!token) throw new Error("No access token found");

    const res = await fetch(`${API_BASE_URL}/api/v1/admin/slider-image/get`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`, // ✅ use the correct variable
        'Content-Type': 'application/json',
      },
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








