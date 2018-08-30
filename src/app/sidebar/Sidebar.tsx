import './sidebar.styl'

import React, { Component } from 'react'

import { faUser, faCalendarAlt, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faHome, faChartBar, faCog, faExchangeAlt, faRobot } from '@fortawesome/free-solid-svg-icons'

import { SidebarItem } from './sidebar-item'
import { Link } from '../../ui'

export class Sidebar extends Component {
  public render() {
    return (
      <aside className="sidebar">
        <div>
          <Link to="/home">
            <SidebarItem text="Home" icon={faHome} />
          </Link>
          <Link to="/charts">
            <SidebarItem text="Charts" icon={faChartBar} />
          </Link>
          <Link to="/bots">
            <SidebarItem text="Bots" icon={faRobot} />
          </Link>
          <Link to="/exchanges">
            <SidebarItem text="Exchanges" icon={faExchangeAlt} />
          </Link>
          <Link to="/calendar">
            <SidebarItem text="Calendar" icon={faCalendarAlt} />
          </Link>
        </div>
        <div className="sidebar-spacer" />
        <div>
          <Link to="/account">
            <SidebarItem text="Account" icon={faUser} />
          </Link>
          <Link to="/settings">
            <SidebarItem text="Settings" icon={faCog} />
          </Link>
          <Link to="/support">
            <SidebarItem text="Support" icon={faQuestionCircle} />
          </Link>
        </div>
      </aside>
    )
  }
}
