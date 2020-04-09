import * as React from 'react';
import styled from 'styled-components';
import WidgetCard from './WidgetCard'

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

type WidgetsContainerProps = {
  widgets: any[],
  edit?: (widget) => void
  deleteWidget?: (id: number) => void
}

export default ({ widgets, edit, deleteWidget }: WidgetsContainerProps) =>
  <WidgetsContainer>
    {widgets.length ? widgets.map(widget =>
      <WidgetCard
        key={widget.id} widget={widget} edit={widget.owner && edit}
        deleteWidget={widget.owner && deleteWidget} />) : <h3>There are no widgets, you can help create one</h3>}
  </WidgetsContainer>

