// services/franchiseService.js

export const submitFranchiseRequest = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/franchise/onboarding/make-requests`,
      {
        method: "POST",
        body: formData,
      }
    );

    return await res.json();
  } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
};
