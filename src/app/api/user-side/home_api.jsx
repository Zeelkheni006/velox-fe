const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getStats = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/home-page-body/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();
    if (!json.success) return {};

    return json.data[0]; // {City:11, Franchises:0, Happy Customer:10, Services:7}
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {};
  }
};
export const addNewsletterEmail = async (email) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/home-page-footer/news-letter/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return { success: false, message: "Server error" };
  }
};

