import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { Field, FieldNode, FieldRoot, AppStore } from '../app.store'
import { Card, Title, Subtext, Input, Flex, Button } from '../../ui'
import { observable, autorun, reaction } from 'mobx'

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
export class Exchange extends Component<Props> {
  @observable
  public values: Record<string, any> = {}

  @observable
  private isNew = true

  private saveTimeout: number = null

  constructor(props) {
    super(props)

    this.values.tradePollInterval = this.props.values.tradePollInterval
    this.isNew = this.props.isNew

    reaction(() => Object.entries(this.values), () => this.updateValues())
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
          {this.renderButton()}
        </form>
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

  private saveExchange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const values: any = this.getValues()
    this.isNew = false

    this.props.appStore.saveExchange({ exchange: this.props.name, ...values })
  }

  private updateValues() {
    if (this.isNew) return

    const values: any = this.getValues()

    if (!Object.keys(values).length) return

    window.clearTimeout(this.saveTimeout)

    this.saveTimeout = window.setTimeout(() => {
      this.props.appStore.updateExchange({ exchange: this.props.name, ...values })
      this.values = {}
    }, 2000)
  }

  private getValues(): any {
    return Object.entries(this.values).reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  }

  private renderButton() {
    if (!this.isNew) return null

    return (
      <Flex alignment="end">
        <Button type="submit">Authorize</Button>
      </Flex>
    )
  }
}
