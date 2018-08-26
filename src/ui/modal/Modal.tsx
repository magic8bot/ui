import './modal.styl'

import React, { Component } from 'react'
import ReactModal from 'react-modal'

import { InputGroup } from '../input-group'
import { Button } from '../button'
import { Flex } from '../flex'

interface Props {
  isOpen: boolean
  onSuccess: () => void
  onDismiss: () => void
  ok?: string
  cancel?: string
}

export class Modal extends Component<Props> {
  public static defaultProps = { ok: 'Ok', cancel: 'Cancel' }

  public render() {
    const { isOpen, onDismiss, children } = this.props

    return (
      <ReactModal className="modal" overlayClassName="modal-overlay" isOpen={isOpen} onRequestClose={onDismiss} ariaHideApp={false}>
        <Flex direction="col" alignment="between">
          {children}
          {this.renderButtons()}
        </Flex>
      </ReactModal>
    )
  }

  private renderButtons() {
    const { ok, cancel, onSuccess, onDismiss } = this.props

    return (
      <div className="modal-actions">
        <InputGroup alignment="end">
          <Button color="danger" isOutline onClick={onDismiss}>
            {cancel}
          </Button>

          <Button color="success" isOutline onClick={onSuccess}>
            {ok}
          </Button>
        </InputGroup>
      </div>
    )
  }
}
