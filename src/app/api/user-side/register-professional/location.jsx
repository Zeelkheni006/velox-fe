const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getLocationHierarchy() {
  try {
    // Get token from localStorage (or wherever you store it)
    const token = localStorage.getItem("access_token");

    const res = await fetch(`${API_BASE_URL}/api/v1/franchise/onboarding/hierarchy`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // <-- Add token here
      },
    });

    if (!res.ok) throw new Error("Failed to fetch location hierarchy");

    return res.json(); // Expecting JSON with { countries: [...] }
  } catch (error) {
    console.error("API Error:", error);
    return { countries: [] }; // fallback
  }
}
