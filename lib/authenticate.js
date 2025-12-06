import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'accessToken';

// Save token in localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Get token from localStorage
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Remove token
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Decode token payload (or return null)
export function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Check if token exists and is not expired
export function isAuthenticated() {
  const token = readToken();
  if (!token) return false;

  // exp is in seconds; Date.now() is ms
  return token.exp * 1000 > Date.now();
}

// LOGIN: /login
export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: user, password }),
  });

  if (res.status === 200) {
    const data = await res.json();
    setToken(data.token); // store in localStorage
    return true;
  } else {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Unable to authenticate');
  }
}

// REGISTER: /register (NOTE: do NOT set token here)
export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: user, password, password2 }),
  });

  if (res.status === 200) {
    return true;
  } else {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Unable to register');
  }
}
