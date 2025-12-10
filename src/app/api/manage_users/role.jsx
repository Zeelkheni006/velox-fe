const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addRole = async (payload, token) => {
  try {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("permissions", JSON.stringify(payload.permissions));

    const res = await fetch(
      `${API_BASE_URL}/api/v1/admin/manage-users/manage-roles/add-role`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Add role fetch error:", err);
    throw err;
  }
};

