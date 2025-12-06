import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register', '/about'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  useEffect(() => {
    // run on initial load
    authCheck(router.pathname);

    const hideContent = () => setAuthorized(false);

    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authCheck(url) {
    const path = url.split('?')[0];

    if (PUBLIC_PATHS.includes(path)) {
      setAuthorized(true);
    } else if (!isAuthenticated()) {
      setAuthorized(false);
      router.push('/login');
    } else {
      // user is logged in
      if (!favouritesList) {
        await updateAtom(); // load favourites from API on refresh
      }
      setAuthorized(true);
    }
  }

  return authorized ? children : null;
}
