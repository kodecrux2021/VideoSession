import React, {useState, useEffect} from 'react'
import kodecrux from '../../assets/images/reg2.jpeg'
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css'


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

    return (
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
        <Link to='/home' ><p><h5>HOME</h5></p></Link>
        {/* <Link to='/trainers' ><p><h5>TEACHERS</h5></p></Link> */}
        <Link to='/courses' ><p><h5>COURSES</h5></p></Link>
        <Link to='/notifications' ><p><h5>NOTIFICATIONS</h5></p></Link>
        {/* <Link to='/course-registration' ><p><h5>COURSE REGISTRATION</h5></p></Link> */}
        {/* <Link to='/help/1' ><p><h5>HELP SECTION</h5></p></Link>  */}
        {
        (localStorage.token)?
        <Link><p onClick={logout} ><h5>LOG OUT</h5></p></Link>
        :
        <Link to='/login'><p><h5>LOG IN</h5></p></Link>    
         }
         {
        (localStorage.token)?
        null
        :
        <Link to='/registration'><p><h5>SIGN UP</h5></p></Link>   
         }




        
      </Drawer>
            </div> 
                         



   
    )
}
