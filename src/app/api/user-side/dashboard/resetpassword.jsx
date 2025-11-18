const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function changePassword(userId, currentPassword, newPassword, confirmPassword, token) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/users/auth/change-password/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return {
        success: false,
        message: data.message || "Password reset failed",
      };
    }
  } catch (err) {
    console.error("Change Password Error:", err);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
}
