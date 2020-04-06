import * as React from 'react';
import { Card } from 'react-bootstrap';

export default ({ widget }) =>
  <div>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{widget.name}</Card.Title>
        <Card.Subtitle className='mb-2'>{widget.kind}</Card.Subtitle>
        <Card.Text>{widget.description}</Card.Text>
      </Card.Body>
      <Card.Footer><span>Created by: </span><b>{widget.user.name}</b></Card.Footer>
    </Card>
  </div>
