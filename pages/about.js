import Link from 'next/link';
import { Card } from 'react-bootstrap';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export async function getStaticProps() {
  const featuredId = 'OL453657W';
  const res = await fetch(`https://openlibrary.org/works/${featuredId}.json`);
  const data = await res.json();
  return { props: { book: data, featuredId } };
}

export default function About({ book, featuredId }) {
  return (
    <>
      <PageHeader text="About the Developer – Ashish Dilipbhai Solanki" subtext="WEB422 Assignment 2" />
      <Card className="mb-3">
        <Card.Body>
          <p>
            Hi! I’m Ashish (ID: 128266228). This app explores Open Library’s public dataset,
            with a simple, responsive UI using Next.js, SWR, and React-Bootstrap.
          </p>
          <p>
            Below is one of my featured works from Open Library. Click through any links to learn more.
          </p>
          <p>
            Want to browse more? Use the Home search or view your Favourites.
          </p>
          <p>
            Open Library home: <Link href="https://openlibrary.org" target="_blank">openlibrary.org</Link>
          </p>
        </Card.Body>
      </Card>

      <BookDetails book={book} workId={featuredId} showFavouriteBtn={false} />
    </>
  );
}
