import * as React from 'react';
import { Input, FormGroup, FormFeedback } from 'reactstrap'
import { StyledForm, Label } from '../SharedComponents/StyledWrappers'

export default ({ validated }) =>
  <StyledForm noValidate className={validated && 'was-validated'}>
    <FormGroup>
      <Label>Current Password</Label>
      <Input type="password" placeholder="Enter your current password" name='[user]current_password' required />
      <FormFeedback valid>Looks good!</FormFeedback>
      <FormFeedback>Please enter your current password!</FormFeedback>
    </FormGroup>

    <FormGroup>
      <Label>New Password</Label>
      <Input type="password" placeholder="Enter a new password" name='[user]new_password' minLength={8} required />
      <FormFeedback valid>Looks good!</FormFeedback>
      <FormFeedback>Please enter a new password not less than 8 characters!</FormFeedback>
    </FormGroup>
  </StyledForm>
