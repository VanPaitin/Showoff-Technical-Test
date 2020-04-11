import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardText, CardSubtitle, CardTitle } from 'reactstrap';

export default ({ widget, widgetAction }) => {
  const triggerAction = e => {
    widgetAction({ widget, type: e.target.dataset.action })
  }

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <CardBody>
          <CardTitle tag='h5'>{widget.name}</CardTitle>
          <CardSubtitle className='mb-2' tag='h6'>{widget.kind}</CardSubtitle>
          <CardText>{widget.description}</CardText>
        </CardBody>
        <CardFooter>
          <span>Created by: </span>
          <Link to={`/user/${widget.owner ? 'me' : widget.user.id}/widgets`}>
            <b>{widget.user.name}</b>
          </Link>
          {widgetAction && (
            <div>
              <Button
                color="primary" size="sm" data-action='upsert'
                onClick={triggerAction} style={{ width: '60px' }}>Edit</Button>
              <Button
                color="danger" data-action='delete' size="sm"
                onClick={triggerAction} style={{ float: 'right' }}>Delete</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
