import * as React from 'react';
import { Col, Input, Row, FormFeedback, FormGroup, FormText } from 'reactstrap'
import { StyledForm, Label } from '../SharedComponents/StyledWrappers'

export default ({ validated }) =>
  <StyledForm noValidate className={validated && 'was-validated'}>
    <Row className='form-row'>
      <Col md={6}>
        <FormGroup>
          <Label>First name</Label>
          <Input placeholder="First name" name='[user]first_name' type='text' required />
          <FormFeedback valid>Looks good!</FormFeedback>
          <FormFeedback>
            Please enter your first name!
          </FormFeedback>
        </FormGroup>
      </Col>

      <Col md={6}>
        <FormGroup>
          <Label>Last name</Label>
          <Input placeholder="Last name" name='[user]last_name' required />
          <FormFeedback valid>Looks good!</FormFeedback>
          <FormFeedback>
            Please enter your last name!
          </FormFeedback>
        </FormGroup>
      </Col>
    </Row>

    <FormGroup>
      <Label>Email address</Label>
      <Input type="email" placeholder="Enter email" name='[user]email' required />
      <FormFeedback valid>Looks good!</FormFeedback>
      <FormFeedback>
        Please enter your email!
      </FormFeedback>
      <FormText className="text-muted">
        We'll never share your email with anyone else.
      </FormText>
    </FormGroup>

    <FormGroup>
      <Label>Password</Label>
      <Input type="password" placeholder="Password" name='[user]password' required minLength='8' />
      <FormFeedback valid>Looks good!</FormFeedback>
      <FormFeedback>
        Please enter a password of not less than 8 characters!
      </FormFeedback>
    </FormGroup>
    <FormGroup>
      <Label>Avatar</Label>
      <Input type='file' name='file' />
    </FormGroup>
  </StyledForm>
