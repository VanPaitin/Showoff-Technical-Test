import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Form, Navbar, Nav, Spinner } from 'react-bootstrap';
import WidgetsContainer from './WidgetsContainer';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const AppContainer = styled.div`
  .form-control {
    margin: 40px auto;
    width: 60%;
  }
`;

const StyledNav = styled(Nav)`
  margin-left: auto;
  &.navbar-nav .nav-link {
    color: white;
    text-transform: uppercase;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  span {
    font-size: 30px;
  }
`;

export default class Root extends React.Component {
  state = {
    widgets: [],
    loggedIn: false,
    timeoutId: null,
    loadingWidgets: false,
    showingLoginModal: false,
    showingRegisterModal: false
  }

  componentDidMount() {
    this.fetchWidgets()
  }

  fetchWidgets = (params = {}) => {
    axios.get('/widgets/visible', { params })
      .then(({ data: { widgets }}) => {
        this.setState({ widgets, loadingWidgets: false })
      })
  }

  clearScheduledSearch = () => {
    const { timeoutId } = this.state

    if (timeoutId) {
      clearTimeout(timeoutId)
      this.setState({ timeoutId: null })
    }
  }

  searchWidgets = e => {
    this.setState({ loadingWidgets: true })

    const value = e.target.value.trim()

    this.clearScheduledSearch()

    const timeoutId = setTimeout(() => {
      this.fetchWidgets(value.length ? { term: value } : {})
    }, 1500)

    this.setState({ timeoutId })
  }

  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Widgets</Navbar.Brand>

          <StyledNav>
            <Nav.Link href="" onClick={() => this.setState({ showingLoginModal: true })}>
              {this.state.loggedIn ? 'Logout' : 'Login' }
            </Nav.Link>
            {!this.state.loggedIn &&
              <Nav.Link href="" onClick={() => this.setState({ showingRegisterModal: true })}>
                Register
              </Nav.Link>}
            <Nav.Link href="">Reset Password</Nav.Link>
          </StyledNav>
        </Navbar>

        <AppContainer className='container'>
          <Form.Control
            size='lg' onChange={this.searchWidgets}
            placeholder='Type here to search for a widget'></Form.Control>

          { this.state.loadingWidgets &&
            <LoadingSpinner>
              <Spinner animation="border" variant="primary" /><span> <b>Loading...</b></span>
            </LoadingSpinner> }

          <WidgetsContainer widgets={this.state.widgets} />
        </AppContainer>
        <RegisterModal
          open={this.state.showingRegisterModal}
          toggle={() => this.setState({ showingRegisterModal: false })} />
        <LoginModal
          open={this.state.showingLoginModal}
          toggle={() => this.setState({ showingLoginModal: false })} />
      </>
    )
  }
}
