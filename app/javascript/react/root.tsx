import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Form, Navbar, Nav, Spinner } from 'react-bootstrap';
import WidgetsContainer from './WidgetsContainer'

const AppContainer = styled.div`
  .form-control {
    margin: 40px auto;
    width: 60%;
  }
`;

const StyledNav = styled(Nav)`
  margin-left: auto;
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
    loadingWidgets: false
  }

  componentDidMount() {
    this.fetchWidgets()
  }

  fetchWidgets = (params = {}) => {
    this.setState({ loadingWidgets: true })
    axios.get('/widgets/visible', { params })
      .then(({ data: { data: { widgets }}}) => {
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
    const value = e.target.value.trim()

    this.clearScheduledSearch()

    const timeoutId = setTimeout(() => {
      value.length ? this.fetchWidgets({ term: value }) : this.fetchWidgets()
    }, 2000)

    this.setState({ timeoutId })
  }

  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Widgets</Navbar.Brand>

          <StyledNav>
            <Nav.Link href="#home">{this.state.loggedIn ? 'Logout' : 'Login' }</Nav.Link>
              {!this.state.loggedIn && <Nav.Link href="#features">Register</Nav.Link>}
            <Nav.Link href="#pricing">Reset Password</Nav.Link>
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
      </>
    )
  }
}
