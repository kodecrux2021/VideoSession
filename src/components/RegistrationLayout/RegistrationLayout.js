import React from 'react'
import {Navbar} from 'react-bootstrap';
import { ChevronLeft } from 'react-bootstrap-icons';
import './RegistrationLayout.css'
import {useHistory} from 'react-router-dom'

const RegistrationLayout = (props) => {
    let history = useHistory();
    return (
        <Navbar fixed="top" bg="light" expand="lg">
            <Navbar.Brand className="nav__icon" onClick={()=>{history.goBack()}}>  <ChevronLeft /> </Navbar.Brand>
            <Navbar.Brand>{props.title}</Navbar.Brand>
        </Navbar>
    )
}

export default RegistrationLayout
