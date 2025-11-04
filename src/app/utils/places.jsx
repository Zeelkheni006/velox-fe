export async function fetchNearbyPlaces(query, lat, lng) {
  try {
    const res = await fetch(
      `/api/places?query=${encodeURIComponent(query)}&lat=${lat}&lng=${lng}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Request failed:", err);
    return [];
  }
}
