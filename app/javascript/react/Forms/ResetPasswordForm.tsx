import * as React from 'react';
import { Input, FormFeedback, FormGroup, FormText } from 'reactstrap'
import { Label, StyledForm } from '../SharedComponents/StyledWrappers'

export default ({ validated }) =>
  <StyledForm noValidate className={validated && 'was-validated'}>
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
  </StyledForm>
