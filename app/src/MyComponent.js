import React, { Component } from "react";
import { newContextComponents } from "@drizzle/react-components";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default class MyComponent extends Component {
  componentDidMount() {
    this.loadData()
    //const { drizzle } = this.props.drizzle
    //const { drizzleState } = this.props.drizzleState
  }

  async loadData() {
    const testCount = await this.props.drizzle.contracts.MedPass.methods.getTestCount().call();
    const time = await this.props.drizzle.contracts.MedPass.methods.getTestTime(this.props.drizzleState.accounts[0]).call();
    let testTime = new Date(time*1000);

    this.setState({ testCount: testCount, testTime: testTime.toLocaleDateString()+', '+testTime.toLocaleTimeString() })
  }

  constructor(props) {
    super(props)
    this.state = {
      testCount: null,
      testTime: null
    }
    // const { drizzle } = this.props.drizzle
    // const { drizzleState } = this.props.drizzleState
  }

  render() {
    return(
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home"><img src={logo} className="d-inline-block align-top" id="logo" alt="medpass-logo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Show Results</Nav.Link>
              <Nav.Link href="#link">Register Pass</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          <img src={logo} alt="MedPass-logo" class="w-50"/>
          <h1>MedPass</h1>
          <p>
            Welcome to MedPass!
          </p>
          <hr></hr>
        </div>
        <div className="section">
          <h2>Active Account</h2>
          <AccountData
            drizzle={ this.props.drizzle }
            drizzleState={ this.props.drizzleState }
            accountIndex={0}
            units="ether"
            precision={3}
          />
          <strong>Patient ID: </strong>
          <ContractData
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            contract="MedPass"
            method="getID"
            methodArgs={[this.props.drizzleState.accounts[0]]}
          />
          <br/>
          <strong>Name: </strong>
          <ContractData
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            contract="MedPass"
            method="getName"
            methodArgs={[this.props.drizzleState.accounts[0]]}
          />
          <br/>
          <strong>Condition: </strong>
          <ContractData
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            contract="MedPass"
            method="getCondition"
            methodArgs={[this.props.drizzleState.accounts[0]]}
          />
          <br/>
          <strong>Time: { this.state.testTime } </strong>
          <br/>
          <strong>Test Count: { this.state.testCount } </strong>
        </div>
        
        <div className="section">
          <h2>Settings:</h2>
          <ContractForm drizzle={this.props.drizzle} contract="MedPass" method="setName" labels={['First Name', 'Last Name']} />
          <h2>Set Condition:</h2>
          <ContractForm drizzle={this.props.drizzle} contract="MedPass" method="setCondition" labels={['Patient ID', 'Condition']} />
        </div>
      </div>
    );
  }
}