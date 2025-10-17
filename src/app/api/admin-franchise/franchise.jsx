const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const fetchGooglePoints = async (polygonPoints) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found. Please login.");
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/manage-users/customers/google-points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ points: polygonPoints }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('Backend Error:', text);
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = JSON.parse(text);
    let points = [];

    if (Array.isArray(data.points)) {
      points = data.points;
    } else if (data.points && typeof data.points === 'object') {
      points = Object.values(data.points);
    }

    return points;
  } catch (error) {
    console.error('API call failed:', error);
    throw error; // re-throw so caller sees exact reason
  }
};
