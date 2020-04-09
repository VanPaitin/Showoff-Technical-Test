import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';

const StyledNav = styled(Nav)`
  margin-left: auto;
  &.navbar-nav .nav-link {
    color: white;
    text-transform: uppercase;
  }
`;

export default ({ loggedIn, openModal }) => {
  const openLoginModal = () => openModal('session')

  const openSignUpModal = () => openModal('user')

  const openChangePasswordModal = () => openModal('changePassword')

  const openResetPasswordModal = () => openModal('resetPassword')

  const openLogoutModal = () => openModal('logout')

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Widgets</Navbar.Brand>

      <StyledNav>
        {loggedIn ? (
          <>
            <Nav.Link as={NavLink} to="/user/me/widgets">My widgets</Nav.Link>
            <Nav.Link href="" onClick={openLogoutModal}>Logout</Nav.Link>
            <Nav.Link href="" onClick={openChangePasswordModal}>Change Password</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link href="" onClick={openLoginModal}>Login</Nav.Link>
            <Nav.Link href="" onClick={openResetPasswordModal}>Reset Password</Nav.Link>
            <Nav.Link href="" onClick={openSignUpModal}>Register</Nav.Link>
          </>
        )}
      </StyledNav>
    </Navbar>
  )
}
