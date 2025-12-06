import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function BookCard({ workId }) {
  const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);

  if (error || !data) return <Error statusCode={404} />;

  const coverId = Array.isArray(data.covers) ? data.covers[0] : null;

  return (
    <Card>
      <Card.Img
        variant="top"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x300?text=No+Cover'; }}
        className="img-fluid"
        src={coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://placehold.co/200x300?text=No+Cover'}
        alt="Cover Image"
      />
      <Card.Body>
        <Card.Title>{data.title || ''}</Card.Title>
        <Card.Text>{data.first_publish_date || 'N/A'}</Card.Text>
        <Button as={Link} href={`/works/${workId}`}>View Details</Button>
      </Card.Body>
    </Card>
  );
}
