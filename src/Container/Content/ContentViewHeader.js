import React, { useState, useEffect } from 'react'
import './Content.css'
import kodecrux from '../../assets/images/reg2.jpeg'
import { AppBar, Avatar, Button, ButtonBase, Hidden, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import MenuMod from './Menu'
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as EcodeLogo } from '../../assets/eKodeLogo.svg'

export default function ContentViewHeader(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userName, setUsername] = useState(localStorage.user_name)
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    

    // useEffect (() => {
    //     setUsername(localStorage.user_name)
        
    // })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };   
    const handleClose = () => {
        setAnchorEl(null);
      }; 
      
    const onClose = () => {
        setVisible(false);
    };
    const showDrawer = () => {
        setVisible(true);
    };

    const logout = () => {
        localStorage.clear();
        history.push('/login')
    }

    return (
        <div className='content'>
            <Hidden smDown>
            <AppBar position="absolute" style={{height:75,
                    backgroundColor:'#FFFFFF',
                    padding:"0 40px 0 40px", 
                    alignItems:'center',
                    display:'flex',
                    flexDirection:'row'}}>
                <Link to='/'>
                    <EcodeLogo />
                    
                </Link>
                <div style={{fontSize:14, marginLeft:10}} >
                    <MenuMod availableModules={props.availableModules} />
                </div>
                <div className='right__search__container'>
                    <div style={{ display:'flex', alignItems:'center' }}>

                        <SearchIcon className='search__icon' />

                    </div>
                    <div className='header__searchbar' >
                        <input placeholder='Search for anything' />
                    </div>
                </div>
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
                      null}
            </AppBar>
        </Hidden>
            <Hidden mdUp>
                <div className='content__header'>

                    <div className='content__header__left'>

                        <img src={kodecrux} style={{ height: '70px' }} onClick = {() =>history.push('/')}/>

                        <div className='left__search__container'>
                            <MenuMod availableModules={props.availableModules} />

                        </div>

                    </div>
                    <div className='content__header__right'>
                        <div className='right__search__container'>
                            <div style={{ width: '55px' }}>

                                <SearchIcon className='search__icon' />

                            </div>
                            <div className='header__searchbar' >
                                <input placeholder='Search for anything' />
                            </div>
                        </div>
                        <IconButton>
                            <MenuIcon onClick={showDrawer} />
                        </IconButton>
                        <Drawer
                            title="Navigation"
                            placement="right"
                            closable={true}
                            onClose={onClose}
                            visible={visible}
                        >
                            <Link to='/' ><p><h5>HOME</h5></p></Link>
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
                </div>
            </Hidden>
        </div>
    )
}
