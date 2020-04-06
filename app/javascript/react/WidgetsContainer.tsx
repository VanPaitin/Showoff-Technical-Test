import * as React from 'react';
import styled from 'styled-components';
import WidgetCard from './WidgetCard';

const WidgetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .card {
    margin: 10px;
    .card-subtitle {
      background: #4F7942;
      border-radius: 5px;
      display: inline-block;
      padding: 5px;
      color: #DCDCDC;
      font-size: small;
    }
    span {
      font-size: small;
    }
  }
`;

export default ({ widgets }) =>
  <WidgetsContainer>
    {widgets.map(widget => <WidgetCard key={widget.id} widget={widget} />)}
  </WidgetsContainer>

