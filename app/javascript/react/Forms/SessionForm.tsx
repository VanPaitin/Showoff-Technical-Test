import * as React from 'react';
import { Input, FormGroup, FormFeedback, FormText } from 'reactstrap'
import { Label, StyledForm } from '../SharedComponents/StyledWrappers'

export default ({ validated }) =>
  <StyledForm noValidate className={validated && 'was-validated'}>
    <FormGroup>
      <Label>Email address</Label>
      <Input type="email" name='[session]username' placeholder="Enter email" required />
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
      <Input type="password" placeholder="Password" name='[session]password' required />
      <FormFeedback valid>Looks good!</FormFeedback>
      <FormFeedback>Please enter a password!</FormFeedback>
    </FormGroup>
  </StyledForm>
