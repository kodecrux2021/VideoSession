import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css'
import { AppBar, Button, Hidden, Typography } from '@material-ui/core'
import { ReactComponent as EcodeLogo } from '../../assets/eKodeLogo.svg'
import kodecrux from '../../assets/images/reg2.jpeg';


export default function Navbar(props) {

  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const logout = () => {
    localStorage.clear();
    history.push('/login')
  }

  const handleLogin = () => {
    history.push('/login')
  }

  const handleSignup = () => {
    history.push('/registration')
  }

  return (
    <>
      <Hidden smDown>
            <AppBar position="relative" style={{height:75,
                    backgroundColor:'#FFFFFF',
                    padding:"0 40px 0 40px", 
                    alignItems:'center',
                    display:'flex',
                    flexDirection:'row'}}>
                <Link to='/'>
                    <EcodeLogo />
                </Link>
                <div style={{flex:1, display:'flex', justifyContent:'flex-end', gap:10}}>
                    <Button className="loginButton" variant="outlined" onClick={handleLogin} style={{width:98, height:36, borderColor:'#3743b1', color:'#3743b1', outline:"none"}}>Log In</Button>
                    <Button className="signupButton" variant="outlined" onClick={handleSignup} style={{width:98, height:36, backgroundColor:'#3743b1', color:'white', outline:"none"}}>Sign Up</Button>
                </div>
            </AppBar>
        </Hidden>
        <Hidden mdUp>
              <div className='sidebar__btn' >
                <IconButton>
                  <MenuIcon className='sidebar_icon' onClick={showDrawer} />
                </IconButton>
                <Drawer
                  title="Navigation"
                  placement="right"
                  closable={true}
                  onClose={onClose}
                  visible={visible}
                >
                <Link to='/' ><p><h5>HOME</h5></p></Link>
                <Link to='/courses' ><p><h5>E-LEARNING MARKETPLACE</h5></p></Link>
                <Link to='/notifications/messages' ><p><h5>NOTIFICATIONS</h5></p></Link>
                {
                  (localStorage.token) ?
                    <Link><p onClick={logout} ><h5>LOG OUT</h5></p></Link>
                    :
                    <Link to='/login'><p><h5>LOG IN</h5></p></Link>
                }
                {
                  (localStorage.token) ?
                    null
                    :
                    <Link to='/registration'><p><h5>SIGN UP</h5></p></Link>
                }
              </Drawer>
            </div>
            <img src={kodecrux} style={{ height: '70px', position: 'absolute',marginLeft: '15px', marginTop: '15px', zIndex: 1000}} onClick = {() =>this.props.history.push('/')}/>
        </Hidden>
      
    </>
  )
}
