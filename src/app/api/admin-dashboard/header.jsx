export const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Token missing");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/dashboard/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to fetch notifications");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Notification Fetch Error:", err);
    return { count: 0 }; // fallback
  }
};

// api/admin-dashboard/notifications.js

export const clearNotification = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Token missing");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/dashboard/notifications/clear`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 🔍 Debug backend response
    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ Backend response:", errText);
      throw new Error(`Failed to clear notification: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Clear Notification Error:", err);
    return { success: false };
  }
};

