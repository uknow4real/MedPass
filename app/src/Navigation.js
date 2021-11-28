import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./img/logo.png";

export default class Navigation extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;
    this.isAdmin(drizzle, drizzleState);
  }
  async isAdmin(drizzle, drizzleState) {
    const isAdmin = await drizzle.contracts.MedPass.methods
      .adminmapping(drizzleState.accounts[0])
      .call();
    this.setState({ isAdmin: isAdmin });
  }
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
  }
  render() {
    const { isAdmin } = this.state;
    if (isAdmin === true) {
      return (
        <div className="navigation">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
              <img
                src={logo}
                className="d-inline-block align-top"
                id="logo"
                alt="medpass-logo"
              />
            </Navbar.Brand>
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
    return (
      <div className="navigation">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img
              src={logo}
              className="d-inline-block align-top"
              id="logo"
              alt="medpass-logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/vaccine">Vaccine</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
