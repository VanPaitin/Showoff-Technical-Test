import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavbarBrand, NavLink } from 'reactstrap';

const StyledNav = styled(Nav)`
  margin-left: auto;
  .nav-link {
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    &.bordered {
      border-style: solid;
    }
  }
`;

export default ({ loggedIn, openModal }) => {
  const triggerModal = e => openModal(e.target.dataset.action)

  return (
    <Navbar color="primary" dark={true}>
      <NavbarBrand tag={Link} to="/">Widgets</NavbarBrand>

      <StyledNav>
        {loggedIn ? (
          <>
            <Link to="/user/me/widgets" className='nav-link'>My widgets</Link>
            <NavLink data-action='logout' onClick={triggerModal} className='bordered'>Logout</NavLink>
            <NavLink data-action='changePassword' onClick={triggerModal}>Change Password</NavLink>
          </>
        ) : (
            <>
              <NavLink data-action='session' onClick={triggerModal}>Login</NavLink>
              <NavLink data-action='resetPassword' onClick={triggerModal} className='bordered'>Reset Password</NavLink>
              <NavLink data-action='user' onClick={triggerModal}>Sign up</NavLink>
            </>
          )}
      </StyledNav>
    </Navbar>
  )
}
