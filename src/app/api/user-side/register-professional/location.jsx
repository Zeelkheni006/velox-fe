const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ Get Countries
export async function getCountries() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/utilities/get-all-countries`);
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("Country Fetch Error:", error);
    return [];
  }
}
export async function getAllCountries() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/utilities/get-all-countries`);
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("Country Fetch Error:", error);
    return [];
  }
}
// ✅ Get States by Country — GET /:country_id
export async function getStates(countryId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/utilities/get-states-by-country/${countryId}`);
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("State Fetch Error:", error);
    return [];
  }
}
export async function getallStates(countryId = 1) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/utilities/get-all-states/${countryId}`
    );
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("State Fetch Error:", error);
    return [];
  }
}

// ✅ Get Cities by State — GET /:state_id
export async function getCities(stateId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/utilities/get-cities-by-state/${stateId}`);
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("City Fetch Error:", error);
    return [];
  }
}
export async function getallCities(stateId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/utilities/get-all-cities/${stateId}`);
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("City Fetch Error:", error);
    return [];
  }
}
// ✅ Get Category List
export async function getCategoryList() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/category/list/title`);
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("Category Fetch Error:", error);
    return [];
  }
}

export async function getSubcategoriesAndServices(categoryId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/category/get/sub-categorys-and-services/${categoryId}`);
    const result = await res.json();

    return result?.data || [];
  } catch (error) {
    console.error("Subcategories Fetch Error:", error);
    return [];
  }
}
