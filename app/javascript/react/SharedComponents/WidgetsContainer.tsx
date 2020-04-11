import * as React from 'react';
import styled from 'styled-components';
import WidgetCard from './WidgetCard';
import Widget from '../Widgets/Widget';

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

interface WidgetAction {
  widget: Widget
  type: 'upsert' | 'delete'
}

type WidgetsContainerProps = {
  widgets: Widget[],
  widgetAction?: (params: WidgetAction) => void
}

export default ({ widgets, widgetAction }: WidgetsContainerProps) =>
  <WidgetsContainer>
    {widgets.length ? widgets.map(widget =>
      <WidgetCard
        key={widget.id} widget={widget} widgetAction={widgetAction} />) :
      <h3>There are no widgets, you can help create one</h3>}
  </WidgetsContainer>

