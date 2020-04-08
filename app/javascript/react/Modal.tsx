import * as React from 'react';
import styled from 'styled-components';
import {
  Button, Modal, ModalHeader,
  ModalBody, ModalFooter, Spinner
} from 'reactstrap';

import {
  changePassword, resetPassword,
  logout, signUp, login
} from './utilities/authentication';

import UserForm from './forms/UserForm';
import SessionForm from './forms/SessionForm';
import PasswordChangeForm from './forms/PasswordChangeForm';
import ResetPasswordForm from './forms/ResetPasswordForm';

interface ModalProps {
  open: boolean
  closeModal: (param: { message: string }) => void
  modalType: ModalType
}

enum ModalType {
  Session = 'session',
  User = 'user',
  ChangePassword = 'changePassword',
  ResetPassword = 'resetPassword',
  Logout = 'logout'
}

const Errors = styled.ul`
  margin-bottom: 0
  margin-top: 1rem;
  color: red;
  font-style: italic
`;

const requests = {
  user: signUp,
  session: login,
  changePassword: changePassword,
  resetPassword: resetPassword,
  logout: logout
}

const alertMessage = emailOrName => ({
  user: `Welcome ${emailOrName}`,
  session: 'Welcome',
  changePassword: 'Password changed successfully!',
  resetPassword: `Password reset email sent to ${emailOrName}. Please check your email address for further instructions`
})

export default class Form extends React.Component<ModalProps> {
  state = { validated: false, errors: [], loading: false }

  submitForm = () => {
    const { modalType, closeModal } = this.props

    if (modalType === 'logout') {
      this.setState({ loading: true })
      logout().then(
        () => closeModal({ message: 'Logged out successfully!' })
      ).finally(() => this.setState({ loading: false }))
    } else {
      const form = document.querySelector('form') as HTMLFormElement

      if (form.checkValidity() === true) {
        const formData = new FormData(form);
        const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]').content;
        formData.set('authenticity_token', token)
        const emailOrName = formData.get('user[first_name]') || formData.get('user[email]')
        this.setState({ loading: true })

        requests[modalType](formData)
          .then(() => closeModal({ message: alertMessage(emailOrName)[modalType] }))
          .catch((error) => {
            alert('Something bad happened, Please try again.')
            console.error(error)
          })
          .finally(() => this.setState({ loading: false }))
      } else {
        this.setState({ validated: true })
      }
    }
  }

  renderForm() {
    const { modalType } = this.props

    switch (modalType) {
      case ModalType.Session: return this.wrapValidationApi(SessionForm)
      case ModalType.User: return this.wrapValidationApi(UserForm)
      case ModalType.ChangePassword: return this.wrapValidationApi(PasswordChangeForm)
      case ModalType.ResetPassword: return this.wrapValidationApi(ResetPasswordForm)
      case ModalType.Logout: return 'Are you sure you want to log out?'
    }
  }

  buttonText() {
    const { modalType } = this.props

    switch (modalType) {
      case ModalType.Session: return 'Sign In'
      case ModalType.User: return 'Register'
      case ModalType.ChangePassword: return 'Update Password'
      case ModalType.ResetPassword: return 'Reset Password'
      case ModalType.Logout: return 'Log out'
    }
  }

  wrapValidationApi = Form => <Form validated={this.state.validated} />

  activeButton = () =>
    this.state.loading ? (
      <Button color="primary" disabled>
        <Spinner type="grow" color="light" size="sm"/>{' '}
        Loading...
      </Button>
    ) : <Button color="primary" onClick={this.submitForm}>{this.buttonText()}</Button>

  render() {
    const { open, closeModal } = this.props

    return (
      <Modal isOpen={open} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>{this.buttonText()}</ModalHeader>

        <ModalBody>
          <Errors>
            { this.state.errors.map((error, index) => <li key={index}>{error}</li>)}
          </Errors>

          {this.renderForm()}
        </ModalBody>

        <ModalFooter>
          {this.activeButton()}{' '}
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
