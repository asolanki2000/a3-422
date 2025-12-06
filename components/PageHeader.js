import { Card } from 'react-bootstrap';

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <h3 className="mb-0">{text}</h3>
          {subtext && <div className="header-subtext">{subtext}</div>}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
