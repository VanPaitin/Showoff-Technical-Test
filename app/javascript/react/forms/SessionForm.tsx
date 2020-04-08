import * as React from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const Label = styled(Form.Label)`
  font-weight: bold;
`;

export default ({ validated }) =>
  <Form noValidate validated={validated}>
    <Form.Group controlId="formBasicEmail">
      <Label>Email address</Label>
      <Form.Control type="email" placeholder="Enter email" name='[session]username' required/>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type='invalid'>
          Please enter your email!
        </Form.Control.Feedback>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Label>Password</Label>
      <Form.Control type="password" placeholder="Password" name='[session]password' required/>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type='invalid'>Please enter a password!</Form.Control.Feedback>
    </Form.Group>
  </Form>
