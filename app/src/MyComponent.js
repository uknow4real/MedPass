import React, { Component } from "react";
import { newContextComponents } from "@drizzle/react-components";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default class MyComponent extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle
    const drizzleState = this.props.drizzleState
    this.loadData(drizzle, drizzleState)
  }

  async loadData(drizzle, drizzleState) {
    const totalTestCount = await drizzle.contracts.MedPass.methods.getTotalTestCount().call()
    const testCount = await drizzle.contracts.MedPass.methods.getTestCount(drizzleState.accounts[0]).call()
    const time = await drizzle.contracts.MedPass.methods.getTestTime(drizzleState.accounts[0]).call()
    let testTime = new Date(time*1000);

    this.setState({ totalTestCount: totalTestCount, testCount: testCount, testTime: testTime.toLocaleDateString()+', '+testTime.toLocaleTimeString() })
    for (let i = 1; i <= testCount; i++) {
      let test = await drizzle.contracts.MedPass.methods.personTests(i).call()
      this.setState({
        tests: [...this.state.tests, test]
      })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      totalTestCount: null,
      testCount: null,
      testTime: null,
      tests: []
    }
  }

  render() {
    const drizzle = this.props.drizzle
    const drizzleState = this.props.drizzleState
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
          <img src={logo} alt="MedPass-logo" className="w-50"/>
          <h2>
            Welcome to MedPass!
          </h2>
          <h6>Total tests created by MedPass: {this.state.totalTestCount}</h6>
          <hr></hr>
        </div>
        <div className="section">
          <h2>Active Account</h2>
          <AccountData
            drizzle={ drizzle }
            drizzleState={ drizzleState }
            accountIndex={0}
            units="ether"
            precision={3}
          />
          <strong>Patient ID: </strong>
          <ContractData
            drizzle={ drizzle }
            drizzleState={ drizzleState}
            contract="MedPass"
            method="getID"
            methodArgs={[drizzleState.accounts[0]]}
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
          <ContractForm drizzle={this.props.drizzle} contract="MedPass" method="createTest" labels={['Patient ID', 'Condition']} />
        </div>
        <div className="testList">
          { this.state.tests.map((test, key) => {
            let condition = "Negative";
            if (test.condition === 1) {
              condition = "Positive";        
            }
            let testTime = new Date(test.timestamp*1000);
            let time = testTime.toLocaleDateString()+', '+testTime.toLocaleTimeString();
            return(
              <div className="testbox" key={key}>
                <span>Test ID: {test.id} </span>
                <br />
                <span>Test Time: {time}</span>
                <br />
                <span>Condition: {condition}</span>
              </div>
            )
          })
          }
        </div>
      </div>
    );
  }
}