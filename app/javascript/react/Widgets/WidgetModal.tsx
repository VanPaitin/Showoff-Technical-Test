import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import WidgetForm from './WidgetForm';
import Widget from './Widget';
import { createWidget, updateWidget } from '../Utilities/widgets';

interface WidgetModalProps {
  widget: Widget
  modal: boolean
  toggle: () => void
  setAlertMessage: (message: string) => void
}

export default class WidgetModal extends React.Component<WidgetModalProps> {
  state = { validated: false, loading: false };

  upsertWidget = (data) => {
    const { id } = this.props.widget;

    return (
      id ? updateWidget({ id, data }) : createWidget(data)
    )
  }


  submitForm = () => {
    const form = document.querySelector('form') as HTMLFormElement

    if (form.checkValidity() === true) {
      const formData = new FormData(form);
      const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]').content;

      formData.set('authenticity_token', token)

      this.setState({ loading: true })

      this.upsertWidget(formData).then(() => {
        this.props.toggle()
        this.props.setAlertMessage(`Widget successfully ${this.props.widget.id ? 'updated' : 'created'}!`)
        this.setState({ loading: false })
      })
    } else {
      this.setState({ validated: true })
    }
  }

  activeButton = () =>
    this.state.loading ? (
      <Button color="primary" disabled>
        <Spinner type="grow" color="light" size="sm" />{' '}
        Loading...
      </Button>
    ) : <Button color="primary" onClick={this.submitForm}>{this.props.widget.id ? 'Update' : 'Create'}</Button>

  render() {
    const { widget, modal, toggle } = this.props

    return (
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>{widget.id ? 'Edit' : 'New'} Widget</ModalHeader>

        <ModalBody>
          <WidgetForm widget={widget} validated={this.state.validated} />
        </ModalBody>

        <ModalFooter>
          {this.activeButton()}{' '}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
