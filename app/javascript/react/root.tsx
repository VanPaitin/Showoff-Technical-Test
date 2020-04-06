import * as React from 'react';
import axios from 'axios'

export default class Root extends React.Component {
  componentDidMount() {
    axios.get('/widgets/visible')
      .then(console.log)
  }
  render() {
    return (
      <h3>Jesus Christ</h3>
    )
  }
}
