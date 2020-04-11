import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import WidgetForm from './WidgetForm';
import Widget from './Widget';
import { createWidget, updateWidget, deleteWidget } from '../Utilities/widgets';

interface WidgetModalProps {
  widget: Widget
  modal: boolean
  modalType: 'delete' | 'upsert'
  toggle: () => void
  setAlertMessage: (message: string) => void
}

const color = {
  delete: 'danger',
  upsert: 'primary'
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

      this.upsertWidget(formData).then(this.cleanUp)
    } else {
      this.setState({ validated: true })
    }
  }

  handleSubmitForm = () => {
    if (this.props.modalType == 'delete') {
      deleteWidget(this.props.widget.id)
        .then(this.cleanUp)
    } else {
      this.submitForm()
    }
  }

  alertMessage = () => ({
    delete: 'Widget successfully deleted!',
    upsert: `Widget successfully ${this.props.widget.id ? 'updated' : 'created'}!`
  })

  cleanUp = () => {
    this.props.toggle()
    this.props.setAlertMessage(this.alertMessage()[this.props.modalType])
    this.setState({ loading: false })
  }

  renderForm = () => {
    const { modalType, widget } = this.props;

    return modalType == 'delete' ? 'Are you sure to delete this widget' :
      <WidgetForm widget={widget} validated={this.state.validated} />
  }

  actionText = () => ({
    delete: 'Delete',
    upsert: this.props.widget.id ? 'Update' : 'Create'
  })

  activeButton = () =>
    this.state.loading ? (
      <Button color="primary" disabled>
        <Spinner type="grow" color="light" size="sm" />{' '}
        Loading...
      </Button>
    ) : <Button color={color[this.props.modalType]} onClick={this.handleSubmitForm}>
      {this.actionText()[this.props.modalType]}
    </Button>

  render() {
    const { modal, modalType, toggle } = this.props

    return (
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>{this.actionText()[modalType]} Widget</ModalHeader>

        <ModalBody>
          {this.renderForm()}
        </ModalBody>

        <ModalFooter>
          {this.activeButton()}{' '}
          <Button color="secondary" style={{ marginLeft: '15px' }} onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
