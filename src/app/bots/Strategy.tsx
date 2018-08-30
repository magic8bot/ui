import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { Field, FieldNode, AppStore } from '../app.store'
import { Card, Title, Subtext, Input, Button, Modal, Warntext, InputGroup, TitleCard } from '../../ui'
import { observable } from 'mobx'
import { Row, Column } from '../../ui/row'
import { RouterStore } from '../router.store'

interface Props {
  exchange: string
  strategy: string
  symbol: string
  fields: Field[]
  values: Record<string, any>
  appStore?: AppStore
  routing?: RouterStore
}

@inject('appStore', 'routing')
@observer
export class Strategy extends Component<Props> {
  @observable
  public values: Record<string, any> = {}

  @observable
  private modalOpen = false

  public render() {
    return (
      <TitleCard titleSize={2} title="Options">
        {this.renderFields(this.props.fields)}
        {this.renderButtons()}

        {this.renderModal()}
      </TitleCard>
    )
  }

  private renderFields(fields: Field[]) {
    return <Row isWrap>{fields.map((field, idx) => this.renderField(idx, field as FieldNode))}</Row>
  }

  private renderField(idx: number, field: FieldNode) {
    const initValue = !this.props.values || typeof this.props.values[field.name] === 'undefined' ? field.default : this.props.values[field.name]

    return (
      <Column key={idx} size={50}>
        <Input label={field.prettyName} type={field.type} help={field.description} initValue={initValue} onChange={(value) => (this.values[field.name] = value)} />
      </Column>
    )
  }

  private renderModal() {
    const onDismiss = () => {
      this.modalOpen = false
    }

    const onSuccess = async () => {
      const { exchange, strategy, symbol } = this.props
      await this.props.appStore.deleteStrategy(exchange, strategy, symbol)
      this.props.routing.replace(`/bots/${exchange}`)
      this.modalOpen = false
    }

    const props = { onDismiss, onSuccess, isOpen: this.modalOpen }

    return (
      <Modal {...props}>
        <Title>Are you sure?</Title>
        <Warntext>This will delete the whole thing. All of it.</Warntext>
      </Modal>
    )
  }

  private updateValues() {
    const values: any = this.getValues()

    if (!Object.keys(values).length) return

    const { exchange, strategy, symbol } = this.props

    this.props.appStore.updateStrategy({ exchange, strategy, symbol, ...values })
    this.values = {}
  }

  private getValues(): any {
    return Object.entries(this.values).reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  }

  private renderButtons() {
    const buttons = [
      {
        type: 'button',
        color: 'danger',
        text: 'Delete',
        onClick: () => (this.modalOpen = true),
      },
      {
        type: 'button',
        color: 'success',
        text: 'Save',
        onClick: () => this.updateValues(),
      },
    ]

    return (
      <InputGroup alignment="end">
        {buttons.map(({ type, color, text, onClick }) => {
          const props: any = { type, color, onClick }
          return (
            <Button key={color} {...props} isOutline>
              {text}
            </Button>
          )
        })}
      </InputGroup>
    )
  }
}
