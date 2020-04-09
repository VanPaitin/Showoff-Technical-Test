import * as React from 'react';
import * as storage from 'localforage';
import { RouteProps } from 'react-router-dom'
import styled from 'styled-components'
import { Form, Spinner, Button } from 'react-bootstrap';
import { AppContainer, LoadingSpinner, StyledFade, FlashContainer, StyledAlert } from '../SharedComponents/StyledWrappers'
import WidgetsContainer from '../SharedComponents/WidgetsContainer';
import { fetchUserWidgets, deleteWidget } from '../Utilities/widgets'
import WidgetModal from './WidgetModal';
import Widget from './Widget';

const StyledButton = styled(Button)`
  position: absolute;
`

export default class UserWidgets extends React.Component<RouteProps> {
  state = {
    widgets: [],
    timeoutId: null,
    loadingWidgets: false,
    showingModal: false,
    activeWidget: new Widget(),
    alertMessage: null
  }

  componentDidMount() {
    storage.getItem('token').then(data => data ? this.fetchWidgets() : location.replace('/'))
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

  closeModal = () => this.setState({ showingModal: false }, this.fetchWidgets)

  openModal = widget => this.setState({ showingModal: true, activeWidget: widget })

  deleteWidget = widgetId => {
    if (confirm('Are you sure to delete this widget')) {
      deleteWidget(widgetId)
        .then(() => {
          this.setAlertMessage('Widget successfully deleted!')
          this.fetchWidgets()
        })
    }
  }

  setAlertMessage = (message) => {
    this.setState({ alertMessage: message }, () => {
      setTimeout(() => this.setState({ alertMessage: null }), 2000)
    })
  }

  render() {
    return (
      <>
        <AppContainer className='container'>
          <StyledFade in={!!this.state.alertMessage} unmountOnExit>
            <FlashContainer>
              <StyledAlert variant='success'>
                {this.state.alertMessage}
              </StyledAlert>
            </FlashContainer>
          </StyledFade>
          {this.props.match.params.id == 'me' &&
            <StyledButton color="primary" onClick={() => this.openModal(new Widget())} size='md'>Create Widget</StyledButton>}
          <Form.Control
            size='lg' onChange={this.searchWidgets}
            placeholder='Type here to search for a widget'></Form.Control>

          {this.state.loadingWidgets &&
            <LoadingSpinner>
              <Spinner animation="border" variant="primary" /><span> <b>Loading...</b></span>
            </LoadingSpinner>}

          <WidgetsContainer widgets={this.state.widgets} edit={this.openModal} deleteWidget={this.deleteWidget} />
        </AppContainer>
        <WidgetModal
          setAlertMessage={this.setAlertMessage}
          modal={this.state.showingModal}
          toggle={this.closeModal} widget={this.state.activeWidget} />
      </>
    )
  }
}
