import * as React from 'react';
import storage from 'localforage';
import { Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Modal from './Modal';
import Home from './Home';
import UserWidgets from './Widgets/UserWidgets';

import { StyledAlert, StyledFade } from './SharedComponents/StyledWrappers'

enum ModalType {
  Session = 'session',
  User = 'user',
  ChangePassword = 'changePassword',
  ResetPassword = 'resetPassword',
  Logout = 'logout'
}

export default () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [modalType, setModalType] = React.useState(null)
  const [alertMessage, setAlertMessage] = React.useState(null)

  const setLoginStatus = () => {
    storage.getItem('token').then((data) => {
      setLoggedIn(!!data)
    })
  }

  React.useEffect(setLoginStatus, [])

  const openModal = (type: ModalType) => {
    setShowModal(true)
    setModalType(type)
  }

  const closeModal = ({ message }) => {
    setShowModal(false)
    setAlertMessage(message)
    setLoginStatus()

    if (message) setTimeout(() => setAlertMessage(null), 2000)
  }

  return (
    <div>
      <StyledFade in={!!alertMessage} unmountOnExit>
        <StyledAlert>
          {alertMessage}
        </StyledAlert>
      </StyledFade>

      <Navbar loggedIn={loggedIn} openModal={openModal} />

      <Switch>
        <Route path='/user/:id/widgets' component={UserWidgets} />

        <Route exact path='/' component={Home} />
      </Switch>

      <Modal
        open={showModal}
        closeModal={closeModal}
        modalType={modalType} />
    </div>
  )
}
