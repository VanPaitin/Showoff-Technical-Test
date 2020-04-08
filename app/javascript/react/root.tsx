import * as React from 'react';
import styled from 'styled-components';
import * as storage from 'localforage';
import { Alert, Fade, Form, Spinner } from 'react-bootstrap';
import { get } from './utilities/requests';
import Navbar from './Navbar';
import WidgetsContainer from './WidgetsContainer';
import Modal from './Modal';


enum ModalType {
  Session = 'session',
  User = 'user',
  ChangePassword = 'changePassword',
  ResetPassword = 'resetPassword',
  Logout = 'logout'
}

const AppContainer = styled.div`
  .form-control {
    margin: 40px auto;
    width: 60%;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  span {
    font-size: 30px;
  }
`;

const FlashContainer = styled.div`
  position: absolute;
  width: 90%;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledAlert = styled(Alert)`
  font-size: 19px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  word-spacing: 10px;
`;

const StyledFade = styled(Fade)`
  z-index: 1000;
`;
export default class Root extends React.Component {
  state = {
    widgets: [],
    loggedIn: false,
    timeoutId: null,
    loadingWidgets: false,
    showingModal: false,
    modalType: null,
    alertMessage: null
  }

  componentDidMount() {
    storage.getItem('token').then((data) => {
      if (data) this.setState({ loggedIn: true })
    })
    this.fetchWidgets()
  }

  fetchWidgets = (params = {}) => {
    get('/widgets/visible', params)
      .then(({ widgets }) => {
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

  closeModal = ({ message }) => {
    this.setState({ showingModal: false, alertMessage: message }, () => {
      storage.getItem('token').then((data) => {
        this.setState({ loggedIn: !!data })
      })
      if (message) setTimeout(() => this.setState({ alertMessage: null }), 2000)
    })
  }

  openModal = (modalType: ModalType) => this.setState({ showingModal: true, modalType })

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
        <StyledFade in={!!this.state.alertMessage} unmountOnExit>
          <FlashContainer>
            <StyledAlert variant='success'>
              {this.state.alertMessage}
            </StyledAlert>
          </FlashContainer>
        </StyledFade>
        <Navbar loggedIn={this.state.loggedIn} openModal={this.openModal}/>
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
        <Modal
          open={this.state.showingModal}
          closeModal={this.closeModal}
          modalType={this.state.modalType} />
      </>
    )
  }
}
