import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { Field, FieldNode, FieldRoot, AppStore } from '../app.store'
import { Card, Title, Subtext, Input } from '../../ui'
import { observable, autorun, reaction } from 'mobx'

interface Props {
  name: string
  description: string
  fields: Field[]
  values: Record<string, any>
  appStore?: AppStore
}

@inject('appStore')
@observer
export class Exchange extends Component<Props> {
  @observable
  public values: Record<string, any> = {}

  private saveTimeout: number = null

  constructor(props) {
    super(props)

    reaction(() => Object.entries(this.values), () => this.saveValues())
  }

  public render() {
    return (
      <Card>
        <Title isUppercase size={2}>
          <div>{this.props.name}</div>
        </Title>
        <Subtext>{this.props.description}</Subtext>
        {this.renderFields(this.props.fields)}
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
        {this.renderFields(
          field.type.map((f) => {
            f.name = `${field.name}.${f.name}`
            return f
          })
        )}
      </div>
    )
  }

  private renderField(idx: number, field: FieldNode) {
    const initValue = !this.props.values || !this.props.values[field.name] ? '' : this.props.values[field.name]
    return (
      <div key={idx}>
        <Input label={field.prettyName} type={field.type} help={field.description} initValue={initValue} onChange={(value) => (this.values[field.name] = value)} />
      </div>
    )
  }

  private saveValues() {
    const values: any = Object.entries(this.values).reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})

    if (!Object.keys(values).length) return

    window.clearTimeout(this.saveTimeout)

    this.saveTimeout = window.setTimeout(() => {
      this.props.appStore.saveExchange({ exchange: this.props.name, ...values })
      this.values = {}
    }, 800)
  }
}
