import * as React from 'react';
import styled from 'styled-components';
import { FormFeedback, FormGroup, Input, Label as NativeLabel, Row } from 'reactstrap';
import { Label, StyledForm } from '../SharedComponents/StyledWrappers';

const StyledRow = styled(Row)`
  margin-left: 0
`;

const HiddenFormGroup = styled(FormGroup)`
  margin-left: 15px;
`;

export default ({ widget, validated }) =>
  <StyledForm noValidate className={validated && 'was-validated'}>
    <FormGroup>
      <Label>Name</Label>
      <Input
        type="text" placeholder="Name of widget"
        defaultValue={widget.name} name='[widget]name' required />
      <FormFeedback valid>Looks good!</FormFeedback>
      <FormFeedback>
        Please enter a name for your widget!
      </FormFeedback>
    </FormGroup>

    <FormGroup>
      <Label>Description</Label>
      <Input
        type="text" placeholder="Description for your widget"
        defaultValue={widget.description} name='[widget]description' required />
      <FormFeedback>Looks good!</FormFeedback>
      <FormFeedback type='invalid'>Please enter the description!</FormFeedback>
    </FormGroup>

    <StyledRow>
      <FormGroup check>
        <NativeLabel check>
          <Input
            type='radio' name='[widget]kind'
            value='visible' defaultChecked={widget.kind == 'visible'} />
          Visible
        </NativeLabel>
      </FormGroup>

      <HiddenFormGroup check>
        <NativeLabel check>
          <Input type='radio' name='[widget]kind' value='hidden' defaultChecked={widget.kind == 'hidden'} />
          Hidden
        </NativeLabel>
      </HiddenFormGroup>
    </StyledRow>
  </StyledForm>
