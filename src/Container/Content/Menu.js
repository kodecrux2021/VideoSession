import React from 'react';
import { ChevronBarRight, ChevronRight } from 'react-bootstrap-icons';
import './Menu.css'



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
      'color':'#3743B1',
      'textDecoration' : "none"
    }
    if (this.state.isHovered) {
      styles['textDecoration'] = 'underline';
    }

    return (
      <div className='singleModule'
           onMouseEnter={this.toggleHidden}
           onMouseLeave={this.toggleHidden}
           style={styles}>
        {this.props.id}
        <ChevronRight className='cr_icons' />
      </div>
    )
  }
}

class ModuleGroup2 extends React.Component {
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
    // const lightBackgroundColor = ColorLuminance(this.props.color, 1.5);
    
    // Only make bg color if on hover

    const bgStyle = {
      'backgroundColor': 'white',
      'color':'#3743B1',
      "textDecoration" : 'none'
    }
    if (this.state.isVisible) {
      bgStyle['textDecoration'] = 'underline';
    }

    return (
      <div className='moduleGroup'
           onMouseEnter={this.toggleHidden}
           onMouseLeave={this.toggleHidden}
           style={bgStyle}>
        {this.props.id}
        
        <div className={`modulesSet ${this.state.isVisible ? 'visible': ''}`}>
          {this.props.modules.map(module => <Module
              key={module.name}
              id={module.name}
            />)}
        </div>
        <ChevronRight className='cr_icons' />
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
    // Only make bg color if on hover
    const bgStyle = {
      'backgroundColor': 'white',
      'color':'#3743B1',
      "textDecoration" : 'none'
    }
    if (this.state.isVisible) {
      // bgStyle['backgroundColor'] = 'white';
      bgStyle['textDecoration'] = 'underline';
    }

    return (
      <div className='moduleGroup'
           onMouseEnter={this.toggleHidden}
           onMouseLeave={this.toggleHidden}
           style={bgStyle}>
        {this.props.id}
        
        <div className={`modulesSet ${this.state.isVisible ? 'visible': ''}`}>
          {this.props.modules.map(group => <ModuleGroup2 key={group.name} id={group.name}  modules={group.topic} />)}
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

        <div className='topButton' style={{fontSize:14, fontWeight:'normal'}}>
          Categories
        </div>
        <div className={`analyticsDropDown ${this.state.isVisible ? 'visible': ''}`}>
        {/* <div className={`analyticsDropDown visible`}> */}
          {moduleGroups.map(group => <ModuleGroup key={group.name} id={group.name}  modules={group.sub_technology} />)}
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