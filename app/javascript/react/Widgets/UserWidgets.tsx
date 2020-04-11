import * as React from 'react';
import storage from 'localforage';
import { RouteProps } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Input, Spinner } from 'reactstrap';

import { AppContainer, LoadingSpinner, StyledFade, StyledAlert } from '../SharedComponents/StyledWrappers'
import WidgetsContainer from '../SharedComponents/WidgetsContainer';
import { fetchUserWidgets } from '../Utilities/widgets'
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
    modalType: null,
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

  openModal = ({ widget, type }) =>
    this.setState({ showingModal: true, activeWidget: widget, modalType: type })

  setAlertMessage = (message) =>
    this.setState({ alertMessage: message }, () => {
      setTimeout(() => this.setState({ alertMessage: null }), 2000)
    })


  render() {
    return (
      <>
        <AppContainer className='container'>
          <StyledFade in={!!this.state.alertMessage} unmountOnExit>
            <StyledAlert>
              {this.state.alertMessage}
            </StyledAlert>
          </StyledFade>
          {this.props.match.params.id == 'me' &&
            <StyledButton color='primary' onClick={() => this.openModal({ widget: new Widget(), type: 'upsert' })} size='md'>
              Create Widget
            </StyledButton>}
          <Input
            bsSize='lg' onChange={this.searchWidgets}
            placeholder='Type here to search for a widget'></Input>

          {this.state.loadingWidgets &&
            <LoadingSpinner>
              <Spinner color="primary" /><span> <b>Loading...</b></span>
            </LoadingSpinner>}

          <WidgetsContainer widgets={this.state.widgets} widgetAction={this.openModal} />
        </AppContainer>
        <WidgetModal
          setAlertMessage={this.setAlertMessage}
          modal={this.state.showingModal}
          toggle={this.closeModal} widget={this.state.activeWidget}
          modalType={this.state.modalType} />
      </>
    )
  }
}
