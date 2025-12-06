import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function BookDetails({ book, showFavouriteBtn = true }) {
  if (!book) return null;

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // Unique ID for this work – adjust if you use a different field
  const workId = book.key;

  useEffect(() => {
    // Only run includes() if favouritesList is defined
    if (favouritesList && workId) {
      setShowAdded(favouritesList.includes(workId));
    } else {
      setShowAdded(false);
    }
  }, [favouritesList, workId]);

  // Use API calls to update favourites in DB + atom
  const favouritesClicked = async () => {
    if (!workId) return;

    if (showAdded) {
      // Remove from favourites via API
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      // Add to favourites via API
      setFavouritesList(await addToFavourites(workId));
    }
  };

  const desc = book.description
    ? typeof book.description === 'string'
      ? book.description
      : book.description.value
    : null;

  const people = Array.isArray(book.subject_people)
    ? book.subject_people.join(', ')
    : null;

  const places = Array.isArray(book.subject_places)
    ? book.subject_places.join(', ')
    : null;

  const links = Array.isArray(book.links) ? book.links : [];
  const coverId = Array.isArray(book.covers) ? book.covers[0] : null;

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://placehold.co/400x600?text=Cover+Not+Available';
            }}
            className="img-fluid w-100"
            src={
              coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                : 'https://placehold.co/400x600?text=Cover+Not+Available'
            }
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>

        <Col lg="8">
          <h3>{book.title}</h3>
          {desc && <p>{desc}</p>}
          <br />

          {people && (
            <>
              <h5>Characters</h5>
              {people}
              <br />
              <br />
            </>
          )}

          {places && (
            <>
              <h5>Settings</h5>
              {places}
              <br />
              <br />
            </>
          )}

          {links.length > 0 && (
            <>
              <h5>More Information</h5>
              {links.map((l, i) => (
                <span key={i}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    {l.title || l.url}
                  </a>
                  <br />
                </span>
              ))}
              <br />
            </>
          )}

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
