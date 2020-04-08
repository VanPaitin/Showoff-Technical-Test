import * as React from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const Label = styled(Form.Label)`
  font-weight: bold;
`;

export default ({ validated }) => {
  let token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]').content;

  return (
    <Form noValidate validated={validated}>
      <Form.Control as='input' type='hidden' name='authenticity_token' value={token}/>

      <Form.Group controlId="formBasicPassword">
        <Label>Current Password</Label>
        <Form.Control type="password" placeholder="Password" name='[user]current_password' required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type='invalid'>Please enter a password!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Label>New Password</Label>
        <Form.Control type="password" placeholder="Password" name='[user]new_password' required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type='invalid'>Please enter a password!</Form.Control.Feedback>
      </Form.Group>
    </Form>
  )
}

