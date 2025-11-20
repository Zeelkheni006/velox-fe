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