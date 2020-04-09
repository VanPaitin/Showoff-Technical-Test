import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { Label } from '../SharedComponents/StyledWrappers'

export default ({ validated }) =>
  <Form noValidate validated={validated}>
    <Form.Group controlId="formBasicEmail">
      <Label>Email address</Label>
      <Form.Control type="email" placeholder="Enter email" name='[user]email' required />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type='invalid'>
        Please enter your email!
        </Form.Control.Feedback>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  </Form>
