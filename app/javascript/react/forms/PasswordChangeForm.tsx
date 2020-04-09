import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { Label } from '../SharedComponents/StyledWrappers'

export default ({ validated }) =>
  <Form noValidate validated={validated}>
    <Form.Group controlId="formBasicPassword">
      <Label>Current Password</Label>
      <Form.Control type="password" placeholder="Password" name='[user]current_password' required />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type='invalid'>Please enter a password!</Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
      <Label>New Password</Label>
      <Form.Control type="password" placeholder="Password" name='[user]new_password' required />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type='invalid'>Please enter a password!</Form.Control.Feedback>
    </Form.Group>
  </Form>
