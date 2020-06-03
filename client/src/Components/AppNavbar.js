import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

class AppNavbar extends React.Component{

    render(){
        return(
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand>
                    Medical Record Management
                </Navbar.Brand>
            </Navbar>
        );
    }
}

export default AppNavbar;