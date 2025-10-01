// /api/auth/user-login.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function loginUser({ email, phone, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, password }),
    });

    const data = await res.json();
    return { ok: res.ok, ...data };
  } catch (err) {
    console.error('loginUser error:', err);
    return { ok: false, message: 'Network error' };
  }
}