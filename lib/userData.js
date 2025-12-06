import { getToken } from './authenticate';

async function fetchWithAuth(url, options = {}) {
  const token = getToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `JWT ${token}`, // must match ExtractJwt.fromAuthHeaderWithScheme('jwt')
    },
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}

// GET /favourites
export async function getFavourites() {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites`);
}

// PUT /favourites/:id
export async function addToFavourites(id) {
  return fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    { method: 'PUT' }
  );
}

// DELETE /favourites/:id
export async function removeFromFavourites(id) {
  return fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    { method: 'DELETE' }
  );
}
