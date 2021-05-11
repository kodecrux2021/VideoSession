import React, { useState, useEffect  } from 'react'
import { Avatar, ButtonBase, IconButton, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css'
import { AppBar, Button, Hidden, Typography } from '@material-ui/core'
import { ReactComponent as EcodeLogo } from '../../assets/eKodeLogo.svg'
import kodecrux from '../../assets/images/reg2.jpeg';


export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [userName, setUsername] = useState(localStorage.user_name)

  useEffect(() => {
    setUsername(localStorage.user_name)
  })

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                {(localStorage.token) ?
                      <div style={{flex:1, display:'flex', justifyContent:'flex-end', gap:40, alignItems:'center'}}>
                        <div style={{display:'flex', alignItems:'center', gap:40}}>
                          <Link className="_nav_link" to='/courses' >E-Learning Marketplace</Link>
                          <Link className="_nav_link"  to='/notifications/messages' >Notification</Link>
                        </div>
                        <ButtonBase onClick={handleClick} style={{display:'flex', alignItems:'center', gap:10, outline:'none'}}>
                          <Typography variant='caption' style={{color:'#3743b1',fontSize:14, fontFamily:'sans-serif'}}>{userName}</Typography>
                          <Avatar alt={userName} src={localStorage.user_photo} style={{backgroundColor:'#3743b1'}} />
                        </ButtonBase>
                        

                        <Menu
                          style={{marginTop:18}}
                          id="simple-menu"
                          anchorEl={anchorEl}
                          getContentAnchorEl={null}
                          keepMounted
                          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                          transformOrigin={{ vertical: "top", horizontal: "center" }}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem> <Link className="_nav_link" to='/Profile' >Profile</Link> </MenuItem>
                          <MenuItem> <Link className="_nav_link" to='/refund' >Withdraw Refunds</Link> </MenuItem>
                          <MenuItem> <Link className="_nav_link" onClick={logout} >Logout</Link> </MenuItem>
                        </Menu>
                      </div>
                       :
                      <div style={{flex:1, display:'flex', justifyContent:'flex-end', gap:10}}>
                          <Button className="loginButton" variant="outlined" onClick={handleLogin} style={{width:98, height:36, borderColor:'#3743b1', color:'#3743b1', outline:"none"}}>Log In</Button>
                          <Button className="signupButton" variant="outlined" onClick={handleSignup} style={{width:98, height:36, backgroundColor:'#3743b1', color:'white', outline:"none"}}>Sign Up</Button>
                      </div>}
            </AppBar>
        </Hidden>
        <Hidden mdUp>
        <div className="sidebar__btn">
          <IconButton>
            <MenuIcon className="sidebar_icon" onClick={showDrawer} />
          </IconButton>
          <Drawer
            title="Navigation"
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            <Link to="/">
              <p>
                <h5>HOME</h5>
              </p>
            </Link>
            <Link to="/courses">
              <p>
                <h5>E-LEARNING MARKETPLACE</h5>
              </p>
            </Link>
            {localStorage.token && (
              <Link to="/notifications/messages">
                <p>
                  <h5>NOTIFICATIONS</h5>
                </p>
              </Link>
            )}

            {localStorage.token && (
            <Link to="/Profile">
              <p>
                <h5>PROFILE</h5>
              </p>
            </Link>
            )}

            {localStorage.token && (
            <Link to="/refund">
              <p>
                <h5>WITHDRAW REFUND</h5>
              </p>
            </Link>

            )}
            {localStorage.token ? (
              <Link>
                <p onClick={logout}>
                  <h5>LOG OUT</h5>
                </p>
              </Link>
            ) : (
              <Link to="/login">
                <p>
                  <h5>LOG IN</h5>
                </p>
              </Link>
            )}
            {localStorage.token ? null : (
              <Link to="/registration">
                <p>
                  <h5>SIGN UP</h5>
                </p>
              </Link>
            )}
          </Drawer>
        </div>
            <img src={kodecrux} style={{ height: '70px', position: 'absolute',marginLeft: '15px', marginTop: '15px', zIndex: 1000}} onClick = {() =>this.props.history.push('/')}/>
        </Hidden>
      
    </>
  )
}
