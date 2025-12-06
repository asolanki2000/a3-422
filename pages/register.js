/*********************************************************************************
*  WEB422 – Assignment 3
*
*  Name: Ashish Dilipbhai Solanki  Student ID: 128266228  Date: 2025-11-11
*********************************************************************************/

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert } from 'react-bootstrap';

import PageHeader from '@/components/PageHeader';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning('');

    try {
      await registerUser(userName, password, password2);
      router.push('/login'); // go to login after successful registration
    } catch (err) {
      setWarning(err.message);
    }
  };

  return (
    <>
      <PageHeader text="Register" />
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

        <Form.Group className="mb-3" controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </>
  );
}
