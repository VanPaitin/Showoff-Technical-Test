import styled from 'styled-components';
import { Alert, Fade } from 'react-bootstrap';

export const AppContainer = styled.div`
  .form-control {
    margin: 40px auto;
    width: 60%;
  }
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  span {
    font-size: 30px;
  }
`;

export const FlashContainer = styled.div`
  position: absolute;
  width: 90%;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledAlert = styled(Alert)`
  font-size: 19px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  word-spacing: 10px;
`;

export const StyledFade = styled(Fade)`
  z-index: 1000;
`;
