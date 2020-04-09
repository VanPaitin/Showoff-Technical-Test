import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export default ({ widget, edit, deleteWidget }) =>
  <div>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{widget.name}</Card.Title>
        <Card.Subtitle className='mb-2'>{widget.kind}</Card.Subtitle>
        <Card.Text>{widget.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <span>Created by: </span>
        <Link to={`/user/${widget.owner ? 'me' : widget.user.id}/widgets`}>
          <b>{widget.user.name}</b>
        </Link>
        {edit && (
          <div>
            <Button variant="primary" size="sm" onClick={() => edit(widget)}>Edit</Button>
            <Button
              variant="danger" size="sm"
              onClick={() => deleteWidget(widget.id)}
              style={{ float: 'right' }}>Delete</Button>
          </div>
        )}
      </Card.Footer>
    </Card>
  </div>
