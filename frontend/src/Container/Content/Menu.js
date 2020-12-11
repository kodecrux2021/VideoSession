import React from 'react';
import { ChevronBarRight, ChevronRight } from 'react-bootstrap-icons';
import './Menu.css'

function ColorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
}

class Module extends React.Component {
  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isHovered: false
    }
  }

  toggleHidden () {
    this.setState({
      isHovered: !this.state.isHovered
    })
  }
  
  
  render() {
    const styles = {
      'backgroundColor': 'white',
      'color':'black',
    }
    if (this.state.isHovered) {
      // styles['backgroundColor'] = this.props.color;
      styles['color'] = 'rgb(2, 157, 199)';
    }

    return (
      <div className='singleModule'
           onMouseEnter={this.toggleHidden}
           onMouseLeave={this.toggleHidden}
           style={styles}>
        {this.props.id}
        {/* <ChevronRight className='cr_icons' /> */}
      </div>
    )
  }
}

class ModuleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isVisible: false
    }
  }

  toggleHidden () {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }
  
  render() {
    const lightBackgroundColor = ColorLuminance(this.props.color, 1.5);
    
    // Only make bg color if on hover
    const bgStyle = {
    }
    if (this.state.isVisible) {
      bgStyle['backgroundColor'] = 'white';
      bgStyle['color'] = 'rgb(2, 157, 199)';
    }

    return (
      <div className='moduleGroup'
           onMouseEnter={this.toggleHidden}
           onMouseLeave={this.toggleHidden}
           style={bgStyle}>
        {/* <i className={`fa ${this.props.icon}`} style={{color: this.props.color}}></i> */}
        {this.props.id}
        
        <div className={`modulesSet ${this.state.isVisible ? 'visible': ''}`}>
          {this.props.modules.map(module => <Module
              key={module.key}
              id={module.key}
              lightColor={lightBackgroundColor}
              color={this.props.color}
            />)}
        </div>
        <ChevronRight className='cr_icons' />
      </div>
    )
  }
}

class ModuleGroupSelector extends React.Component {
  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isVisible: false
    }
  }

  toggleHidden () {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }
  
  render() {
    const moduleGroups = this.props.moduleGroups;
    return (
      <div className='analytics' onMouseEnter={this.toggleHidden} onMouseLeave={this.toggleHidden}>

        <div className='topButton'>
          Categories
        </div>
        <div className={`analyticsDropDown ${this.state.isVisible ? 'visible': ''}`}>
        {/* <div className={`analyticsDropDown visible`}> */}
          {moduleGroups.map(group => <ModuleGroup key={group.key} id={group.key} color={group.color} icon={group.icon} modules={group.modules} />)}
        </div>
      </div>
    )
  }
}

class Menu extends React.Component {
  render() {
    const availableModules = this.props.availableModules;
    return (
      <div className='navbar'>
        <ModuleGroupSelector moduleGroups={availableModules} />
      </div>
    )
  }
}

export default Menu;