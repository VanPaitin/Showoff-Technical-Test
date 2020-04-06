import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Form, Navbar, Nav } from 'react-bootstrap'
import WidgetCard from './WidgetCard';

const AppContainer = styled.div`
  .form-control {
    margin: 40px auto;
    width: 60%;
  }
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .card {
    margin: 10px;
    .card-subtitle {
      background: #4F7942;
      border-radius: 5px;
      display: inline-block;
      padding: 5px;
      color: #DCDCDC;
      font-size: small;
    }
    span {
      font-size: small;
    }
  }
`;

const StyledNav = styled(Nav)`
  margin-left: auto;
`;

export default class Root extends React.Component {
  state = { widgets: [], loggedIn: false }
  componentDidMount() {
    axios.get('/widgets/visible')
      .then(({ data: { data: { widgets }}}) => {
        this.setState({ widgets })
      })
  }
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Widgets</Navbar.Brand>
          <StyledNav>
          <Nav.Link href="#home">{this.state.loggedIn ? 'Logout' : 'Login' }</Nav.Link>
            {!this.state.loggedIn && <Nav.Link href="#features">Register</Nav.Link>}
            <Nav.Link href="#pricing">Reset password</Nav.Link>
          </StyledNav>
        </Navbar>
        <AppContainer className='container'>
          <Form.Control size='lg' placeholder='Type here to search for a widget'></Form.Control>
          <WidgetsContainer>
            {this.state.widgets.map(widget => <WidgetCard key={widget.id} widget={widget} />)}
          </WidgetsContainer>
        </AppContainer>
      </>
    )
  }
}
