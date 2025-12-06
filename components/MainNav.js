import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const token = readToken(); // null if not logged in

  function logout() {
    removeToken();
    router.push('/login');
  }

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Link href="/" passHref legacyBehavior>
        <Navbar.Brand>Books App</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link href="/about" passHref legacyBehavior>
            <Nav.Link>About</Nav.Link>
          </Link>

          {token && (
            <NavDropdown title={token.userName} id="user-dropdown">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item>Favourites</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}

          {!token && (
            <>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link>Login</Nav.Link>
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
