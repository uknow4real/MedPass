import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "./img/logo.png";

const Navigation = () => {

    return (
        <div className="navigation">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/"><img src={logo} className="d-inline-block align-top" id="logo" alt="medpass-logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/vaccine">Vaccine</Nav.Link>
                        <Nav.Link href="/sensors">Sensors</Nav.Link>
                        <Nav.Link href="/settings">Settings</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
export default Navigation;