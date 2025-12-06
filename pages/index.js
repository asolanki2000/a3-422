/*********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Ashish Dilipbhai Solanki  Student ID: 128266228  Date: 2025-11-11
*  Vercel Link: https://YOUR-CLIENT-URL.vercel.app
*
********************************************************************************/

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/PageHeader';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: '',
      title: '',
      subject: '',
      language: '',
      first_publish_year: '',
    },
  });

  const onSubmit = (data) => {
    const filtered = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '')
    );
    router.push({ pathname: '/books', query: filtered });
  };

  return (
    <>
      <PageHeader
        text="Search"
        subtext="Find books on Open Library by author, title, subject, language, or year"
      />

      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Row className="gy-3">
          <Col md={6}>
            <Form.Group controlId="author">
              <Form.Label>Author *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Douglas Adams"
                className={errors.author ? 'is-invalid' : ''}
                {...register('author', { required: 'Author is required' })}
              />
              {errors.author && (
                <div className="invalid-feedback form-error">
                  {errors.author.message}
                </div>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Galaxy"
                {...register('title')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="gy-3 mt-1">
          <Col md={6}>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Science Fiction"
                {...register('subject')}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="language">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., eng"
                {...register('language')}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="first_publish_year">
              <Form.Label>First Publish Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g., 1979"
                {...register('first_publish_year')}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-4">
          <Button type="submit" variant="primary">
            Search
          </Button>
        </div>
      </Form>
    </>
  );
}
