import * as React from 'react';
import { Input, Spinner } from 'reactstrap'
import { fetchWidgets } from './Utilities/widgets';
import {
  AppContainer, LoadingSpinner,
} from './SharedComponents/StyledWrappers'
import WidgetsContainer from './SharedComponents/WidgetsContainer';

export default class Home extends React.Component {
  state = {
    widgets: [],
    timeoutId: null,
    loadingWidgets: false,
  }

  componentDidMount() {
    this.fetchWidgets()
  }

  fetchWidgets = (params = {}) => {
    fetchWidgets(params)
      .then(({ widgets }) => {
        this.setState({ widgets, loadingWidgets: false })
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
      <AppContainer className='container'>
        <Input
          bsSize='lg' onChange={this.searchWidgets}
          placeholder='Type here to search for a widget'></Input>

        {this.state.loadingWidgets &&
          <LoadingSpinner>
            <Spinner color="primary" /><span> <b>Loading...</b></span>
          </LoadingSpinner>}

        <WidgetsContainer widgets={this.state.widgets} />
      </AppContainer>
    )
  }
}
