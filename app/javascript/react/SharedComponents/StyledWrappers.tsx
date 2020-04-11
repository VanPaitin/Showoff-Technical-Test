import styled from 'styled-components';
import { Fade, Alert, Form, Label as FormLabel } from 'reactstrap';

export const AppContainer = styled.div`
  .form-control {
    margin: 40px auto;
    width: 60%;
  }
`;

export const Label = styled(FormLabel)`
  font-weight: bold;
`;

export const StyledForm = styled(Form)`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  span {
    font-size: 30px;
  }
`;

export const StyledAlert = styled(Alert)`
  font-size: 19px;
  letter-spacing: 1px;
  text-align: center;
  word-spacing: 10px;
`;

export const StyledFade = styled(Fade)`
  position: absolute;
  width: 50%;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;
