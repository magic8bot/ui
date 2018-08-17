import './header.styl'

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import { Breadcrumbs } from '../../ui'

interface Props {
  routing?: RouterStore
}

@inject('routing')
@observer
export class Header extends Component<Props> {
  public render() {
    const { pathname } = this.props.routing.location
    return (
      <header className="header">
        <div className="logo">Magic8bot</div>
        <div className="inner-header">
          <Breadcrumbs path={pathname} />
          <small>(developer preview)</small>
        </div>
      </header>
    )
  }
}
