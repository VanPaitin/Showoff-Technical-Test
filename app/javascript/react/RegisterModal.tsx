import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserForm from './UserForm';

interface ModalProps {
  open: boolean
  toggle: () => void
}

const Errors = styled.ul`
  margin-bottom: 0
  margin-top: 1rem;
  color: red;
  font-style: italic
`;

export default class Form extends React.Component<ModalProps> {
  state = { validated: false, errors: [] }

  submitForm = () => {
    let form = document.querySelector('form') as HTMLFormElement;

    if (form.checkValidity() === true) {
      let formData = new FormData(form);

      axios.post('/users', formData)
        .then(data => {
          debugger
        }).catch(error => {
          debugger
        })
    } else {
      this.setState({ validated: true })
    }
  };

  render() {
    const { open, toggle } = this.props

    return (
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Errors>
            { this.state.errors.map((error, index) => <li key={index}>{error}</li>)}
          </Errors>
          <UserForm validated={this.state.validated}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.submitForm}>Register</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
