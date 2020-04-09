import * as React from 'react';
import { RouteProps } from 'react-router-dom'
import { Form, Spinner } from 'react-bootstrap';
import { AppContainer, LoadingSpinner } from './sharedComponents/StyledWrappers'
import WidgetsContainer from './sharedComponents/WidgetsContainer';
import { fetchUserWidgets } from './utilities/widgets'

export default class UserWidgets extends React.Component<RouteProps> {
  state = {
    widgets: [],
    timeoutId: null,
    loadingWidgets: false,
  }

  componentDidMount() {
    this.fetchWidgets()
  }

  fetchWidgets = (params = {}) => {
    const { id } = this.props.match.params

    fetchUserWidgets(id, params)
      .then(({ widgets }) => {
        this.setState({ widgets: widgets || [], loadingWidgets: false })
      })
  }

  clearScheduledSearch = () => {
    const { timeoutId } = this.state

    if (timeoutId) {
      clearTimeout(timeoutId)
      this.setState({ timeoutId: null })
    }
  }

  searchWidgets = e => {
    this.setState({ loadingWidgets: true })

    const value = e.target.value.trim()

    this.clearScheduledSearch()

    const timeoutId = setTimeout(() => {
      this.fetchWidgets(value.length ? { term: value } : {})
    }, 1500)

    this.setState({ timeoutId })
  }

  render() {
    return (
      <>
        <AppContainer className='container'>
          <Form.Control
            size='lg' onChange={this.searchWidgets}
            placeholder='Type here to search for a widget'></Form.Control>

          { this.state.loadingWidgets &&
            <LoadingSpinner>
              <Spinner animation="border" variant="primary" /><span> <b>Loading...</b></span>
            </LoadingSpinner> }

          <WidgetsContainer widgets={this.state.widgets} />
        </AppContainer>
        {/* <Modal open={this.state.showingModal} closeModal={this.closeModal} /> */}
      </>
    )
  }
}
