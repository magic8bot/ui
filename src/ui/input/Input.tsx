import './input.styl'

import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

import { Button } from '../button'
import { Helptext } from '../helptext'
import { InputGroup } from '../input-group'

interface Props {
  initValue: string
  label: string
  required?: boolean
  type?: string
  help?: string
  onChange: (value: string) => void
}

@observer
export class Input extends Component<Props> {
  public static defaultProps = { type: 'text', required: false }

  @observable
  public value: string = this.props.initValue
  @observable
  private hidePassword = true

  public render() {
    return (
      <div>
        <label>{this.props.label}</label>
        {this.props.help && <Helptext>{this.props.help}</Helptext>}
        {this.props.type !== 'password' ? this.renderInput() : this.renderPassword()}
      </div>
    )
  }

  private renderInput() {
    return (
      <input type={this.props.type} value={this.value} required={this.props.required} onChange={this.handleChange} />
    )
  }

  private renderPassword() {
    const type = this.hidePassword ? 'password' : 'text'
    const color = !this.hidePassword ? 'success' : 'danger'
    const onClick = () => (this.hidePassword = !this.hidePassword)
    const icon = !this.hidePassword ? faEye : faEyeSlash

    return (
      <InputGroup>
        <input
          type={type}
          autoComplete="new-password"
          value={this.value}
          required={this.props.required}
          onChange={this.handleChange}
        />
        <Button color={color} isOutline onClick={onClick} tabindex={-1}>
          <FontAwesomeIcon icon={icon} />
        </Button>
      </InputGroup>
    )
  }

  @action
  private handleChange = ({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => {
    this.value = value
    this.props.onChange(value)
  }
}
