import { useAtom } from 'jotai';
import PageHeader from '@/components/PageHeader';
import { favouritesAtom } from '@/store';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  // RouteGuard / login may still be loading; prevent crash
  if (!favouritesList) return null;

  return (
    <>
      <PageHeader text="Favourites" />

      {favouritesList.length === 0 && <p>No favourites yet.</p>}

      {favouritesList.length > 0 && (
        <ul>
          {favouritesList.map((id) => (
            <li key={id}>{id}</li> // replace with your real book rendering using this id
          ))}
        </ul>
      )}
    </>
  );
}
