import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);

  const queryString = useMemo(() => new URLSearchParams(router.query).toString(), [router.query]);

  const { data, error } = useSWR(
    queryString ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10` : null
  );

  useEffect(() => {
    if (data) setPageData(data);
  }, [data]);

  const previous = () => setPage(p => (p > 1 ? p - 1 : p));
  const next = () => setPage(p => p + 1);

  const goToWork = (key) => {
    const id = key?.split('/')?.pop();
    if (id) router.push(`/works/${id}`);
  };

  const subtext = Object.entries(router.query).map(([k,v]) => `${k}: ${v}`).join(', ');

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext || 'Use the form on Home to search'} />

      <Table striped hover className="table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
          </tr>
        </thead>
        <tbody>
          {pageData?.docs?.map((book) => (
            <tr key={book.key} onClick={() => goToWork(book.key)}>
              <td>{book.title}</td>
              <td>{book.first_publish_year ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
