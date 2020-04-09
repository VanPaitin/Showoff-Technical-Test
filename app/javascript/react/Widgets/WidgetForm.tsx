import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { Label } from '../SharedComponents/StyledWrappers';

export default ({ widget, validated }) =>
  <Form noValidate validated={validated}>
    <Form.Group controlId="formBasicEmail">
      <Label>Name</Label>
      <Form.Control
        type="text" placeholder="Name of widget"
        defaultValue={widget.name} name='[widget]name' required />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type='invalid'>
        Please enter a name for your widget!
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Label>Description</Label>
      <Form.Control
        type="text" placeholder="Description for your widget"
        defaultValue={widget.description} name='[widget]description' required />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type='invalid'>Please enter the description!</Form.Control.Feedback>
    </Form.Group>

    <Form.Check
      label="Visible" type='radio' name='[widget]kind'
      value='visible' defaultChecked={widget.kind == 'visible'} inline />
    <Form.Check
      label="Hidden" type='radio' name='[widget]kind'
      value='hidden' defaultChecked={widget.kind == 'hidden'} inline />
  </Form>
