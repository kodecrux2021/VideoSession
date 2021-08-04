import React, { useState, useEffect  } from 'react'
import { Avatar, ButtonBase, IconButton, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css'
import { AppBar, Button, Hidden, Typography } from '@material-ui/core'
import { ReactComponent as EcodeLogo } from '../../assets/eKodeLogo.svg'
import kodecrux from '../../assets/img/logo.png';
import LOGO from "../../assets/img/logo.png"


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
            <AppBar position="fixed" style={{height:75,
                    backgroundColor:'#FFFFFF',
                    padding:"0 40px 0 15px", 
                    marginBottom:"100px",
                    alignItems:'center',
                    display:'flex',
                    flexDirection:'row',
                    boxShadow:"none",
                    borderBottom:"1px solid #e3e8eb"}}
                    >
                <Link to='/'>
                  <img src={kodecrux} style={{ height: '30px',marginLeft: '15px', zIndex: 1000}} />
                </Link>
                {(localStorage.token) ?
                      <div style={{flex:1, display:'flex', justifyContent:'flex-end', gap:40, alignItems:'center'}}>
                        <div style={{display:'flex', alignItems:'center', gap:40}}>
                          <Link className="_nav_link" to='/courses' style={{color:'#26292C'}} >E-Learning Marketplace</Link>
                          <Link className="_nav_link"  to='/notifications/messages' style={{color:'#26292C'}} >Notification</Link>
                        </div>
                        <ButtonBase onClick={handleClick} style={{display:'flex', alignItems:'center', gap:10, outline:'none'}}>
                          <Typography variant='caption' style={{color:'#26292C',fontSize:14, fontFamily:'sans-serif'}}>{userName}</Typography>
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
                          <MenuItem><Link className="_nav_link" to='/payment/dashboard'>Payment Dashboard</Link></MenuItem>
                          <MenuItem> <Link className="_nav_link" onClick={logout} >Logout</Link> </MenuItem>
                        </Menu>
                      </div>
                       :
                      <div style={{flex:1, display:'flex', justifyContent:'flex-end', gap:10}}>
                          <Button className="loginButton" variant="outlined" onClick={handleLogin} style={{width:98, height:36, borderColor:'#3743b1', color:'#26292C', outline:"none",border:"none", outline:"none"}}>Log In</Button>
                          <Button className="signupButton" variant="outlined" onClick={handleSignup} style={{width:98, height:36, backgroundColor:'rgba(30, 136, 229, 0.2)', color:'#1e88e5',border:"none", outline:"none"}}>Register</Button>
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
              <Link to='/payment/dashboard'>
                <p>
                  <h5>PAYMENT DASHBOARD </h5>
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
            <img src={kodecrux} style={{ height: '70px', position: 'absolute',marginLeft: '15px', marginTop: '15px', zIndex: 1000}} onClick = {() => history.push('/')}/>
        </Hidden>
      
    </>
  )
}
