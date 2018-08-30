import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { Field, FieldNode, FieldRoot, AppStore } from '../../app.store'
import { Card, Title, Subtext, Input, Button, Modal, Warntext, InputGroup } from '../../../ui'
import { observable } from 'mobx'

interface Props {
  name: string
  description: string
  fields: Field[]
  isNew: boolean
  values: Record<string, any>
  appStore?: AppStore
}

@inject('appStore')
@observer
export class ExchangeCard extends Component<Props> {
  @observable
  public values: Record<string, any> = {}

  @observable
  private isNew = true

  @observable
  private modalOpen = false

  constructor(props) {
    super(props)

    this.values.tradePollInterval = this.props.values.tradePollInterval
    this.isNew = this.props.isNew
  }

  public render() {
    return (
      <Card>
        <Title isUppercase size={2}>
          <div>{this.props.name}</div>
        </Title>
        <Subtext>{this.props.description}</Subtext>
        <form onSubmit={this.saveExchange}>
          {this.renderFields(this.props.fields)}
          {this.renderButtons()}
        </form>
        {this.renderModal()}
      </Card>
    )
  }

  private renderFields(fields: Field[]) {
    return fields.map((field, idx) => (!Array.isArray(field.type) ? this.renderField(idx, field as FieldNode) : this.renderNestedFields(idx, field as FieldRoot)))
  }

  private renderNestedFields(idx: number, field: FieldRoot) {
    return (
      <div key={idx}>
        <Title size={3} isUppercase>
          {field.name}
        </Title>
        {this.renderFields(field.type.map((f) => ({ ...f, name: `${field.name}.${f.name}` })))}
      </div>
    )
  }

  private renderField(idx: number, field: FieldNode) {
    const initValue = !this.props.values || !this.props.values[field.name] ? '' : this.props.values[field.name]
    const isRequired = field.name.includes('auth.')

    return (
      <div key={idx}>
        <Input
          label={field.prettyName}
          type={field.type}
          required={isRequired}
          help={field.description}
          initValue={initValue}
          onChange={(value) => (this.values[field.name] = value)}
        />
      </div>
    )
  }

  private renderModal() {
    const onDismiss = () => {
      this.modalOpen = false
    }

    const onSuccess = async () => {
      await this.props.appStore.deleteExchange(this.props.name)
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

  private saveExchange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const values: any = this.getValues()
    this.isNew = false
    this.props.appStore.config.exchanges.find(({ exchange }) => exchange === this.props.name).isNew = false

    this.props.appStore.saveExchange({ exchange: this.props.name, ...values })
  }

  private updateValues() {
    if (this.isNew) return

    const values: any = this.getValues()

    if (!Object.keys(values).length) return

    this.props.appStore.updateExchange({ exchange: this.props.name, ...values })
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
        text: this.isNew ? 'Cancel' : 'Delete',
        onClick: this.isNew ? () => this.props.appStore.removeExchange(this.props.name) : () => (this.modalOpen = true),
      },
      {
        type: this.isNew ? 'submit' : 'button',
        color: 'success',
        text: this.isNew ? 'Authorize' : 'Save',
        onClick: this.isNew ? () => null : () => this.updateValues(),
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
