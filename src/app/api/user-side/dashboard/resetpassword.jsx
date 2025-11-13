// /api/user-api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function changePassword(userId, currentPassword, newPassword, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/auth/change-password/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || "Password reset failed" };
    }
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong. Try again." };
  }
}
