import React, { useState } from 'react'
import './Content.css'
import kodecrux from '../../assets/images/reg2.jpeg'
import { IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import Menu from './Menu'
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from 'antd';
import { Link, useHistory } from 'react-router-dom';



export default function ContentViewHeader(props) {
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

    return (
        <div className='content'>
            <div className='content__header'>

                <div className='content__header__left'>

                    <img src={kodecrux} style={{ height: '70px' }} onClick = {() =>history.push('/')}/>

                    <div className='left__search__container'>
                        <Menu availableModules={props.availableModules} />

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
        </div>
    )
}
