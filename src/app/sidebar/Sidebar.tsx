import './sidebar.styl'

import React, { Component } from 'react'

import { SidebarItem } from './sidebar-item'
import { SidebarHeader } from './sidebar-header'
import { Link } from '../../ui'

export class Sidebar extends Component {
  public render() {
    return (
      <aside className="sidebar">
        <SidebarHeader label="Main" />
        <Link to="/dashboard">
          <SidebarItem label="Dashboard" />
        </Link>
        <SidebarHeader label="Settings" />
        <Link to="/settings/exchanges">
          <SidebarItem label="Exchanges" />
        </Link>
        <Link to="/settings/strategies">
          <SidebarItem label="Strategies" />
        </Link>
        <Link to="/settings/wallets">
          <SidebarItem label="Wallets" />
        </Link>
      </aside>
    )
  }
}
