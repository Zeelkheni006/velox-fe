
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const getFranchiseOwners = async (
  page = 1,
  perPage = 10,
  hasFranchise = 1 // 🔥 default = 1
) => {
  try {
    if (typeof window === "undefined")
      return { success: false, data: [], total: 0, pages: 0, page: 1 };

    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token");

    const res = await fetch(
      `${API_BASE_URL}/api/v1/admin/manage-franchise/franchise-owners/get?page=${page}&per_page=${perPage}&has_franchise=${hasFranchise}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    if (data.success && Array.isArray(data.data?.franchise_owners)) {
      return {
        success: true,
        data: data.data.franchise_owners,
        total: data.data.total || 0,
        pages: data.data.pages || 1,
        page: data.data.page || page,
      };
    }

    return { success: false, data: [], total: 0, pages: 0, page: 1 };
  } catch (err) {
    console.error("Error fetching franchise owners:", err);
    return { success: false, data: [], total: 0, pages: 0, page: 1 };
  }
};

export const getFranchiseOwnersData = async (ownerEmail) => {
  try {
    const token = localStorage.getItem("token");
    

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/manage-franchise/franchise-owners/get/franchise-owners-data`,
       {
      method: "POST", // IMPORTANT
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ owner_email: ownerEmail }), // JSON body
    });

    const json = await response.json();
    return json;
  } catch (err) {
    return { success: false, message: "Network error" };
  }
};

export const makeFranchise = async (formData) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token missing");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/manage-franchise/franchise-owners/make-franchise`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,   // <-- use directly
    }
  );

  const data = await res.json();
  return data;
};

















