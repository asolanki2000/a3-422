/*********************************************************************************
*  WEB422 – Assignment 3
*
*  Name: Ashish Dilipbhai Solanki  Student ID: 128266228  Date: 2025-11-11
*********************************************************************************/

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAtom } from 'jotai';

import PageHeader from '@/components/PageHeader';
import { favouritesAtom } from '@/store';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';

export default function Login() {
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning('');

    try {
      await authenticateUser(userName, password); // sets token
      await updateAtom();                         // load favourites into atom
      router.push('/');                           // go back to search page
    } catch (err) {
      setWarning(err.message);
    }
  };

  return (
    <>
      <PageHeader text="Login" />
      {warning && <Alert variant="danger">{warning}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
    </>
  );
}
