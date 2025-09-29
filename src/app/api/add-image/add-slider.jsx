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

// https://places.googleapis.com/v1/places/ChIJs5ydyTiuEmsR0fRSlU0C7k0?fields=id,displayName&key=API_KEY
// https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ05IRjKHxEQ0RJLV_5NLdK2w&fields=place_id&key=API_KEY
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY

//search location api
// utils/geocode.js
// utils/places.js
// pages/api/places.js
// add category api






