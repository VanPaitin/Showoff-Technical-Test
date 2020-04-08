import * as React from 'react';
import Form from 'react-bootstrap/Form';
import FormFile from 'react-bootstrap/FormFile'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components';

const Label = styled(Form.Label)`
  font-weight: bold;
`;

export default ({ validated }) =>
  <Form noValidate validated={validated}>
    <Form.Row>
      <Form.Group as={Col}>
        <Label>First name</Label>
        <Form.Control placeholder="First name" name='[user]first_name' type='text' required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type='invalid'>
          Please enter your first name!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col}>
        <Label>Last name</Label>
        <Form.Control placeholder="Last name" name='[user]last_name'/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
    </Form.Row>

    <Form.Group controlId="formBasicEmail">
      <Label>Email address</Label>
      <Form.Control type="email" placeholder="Enter email" name='[user]email' required/>
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
      <Form.Control type="password" placeholder="Password" name='[user]password' required/>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type='invalid'>
          Please enter a password!
        </Form.Control.Feedback>
    </Form.Group>
    <Form.Group controlId="formBasicFile">
      <FormFile>
        <Label>Avatar</Label>
        <FormFile.Input name='file'/>
      </FormFile>
    </Form.Group>
  </Form>

