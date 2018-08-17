import './sidebar.styl'

import React, { Component } from 'react'

import { SidebarItem } from './sidebar-item'
import { Link } from '../../ui'

export class Sidebar extends Component {
  public render() {
    return (
      <aside className="sidebar">
        <div>
          <Link to="/home">
            <SidebarItem label="Home" />
          </Link>
          <Link to="/charts">
            <SidebarItem label="Charts" />
          </Link>
          <Link to="/bots">
            <SidebarItem label="Bots" />
          </Link>
          <Link to="/exchanges">
            <SidebarItem label="Config" />
          </Link>
        </div>
        <div>
          <Link to="/account">
            <SidebarItem label="Account" />
          </Link>
          <Link to="/settings">
            <SidebarItem label="Settings" />
          </Link>
          <Link to="/support">
            <SidebarItem label="Support" />
          </Link>
        </div>
      </aside>
    )
  }
}
