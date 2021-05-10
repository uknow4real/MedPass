import React, { Component } from "react";
import { newContextComponents } from "@drizzle/react-components";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState}) => {
  async function getTestCount () {
    let testCount = await drizzle.contracts.MedPass.methods.getTestCount().call();
    let span = document.getElementById("testCount");
    span.innerText = testCount;
  };
  getTestCount();
  async function getTestTime() {
    let testTime = await drizzle.contracts.MedPass.methods.getTestTime(drizzleState.accounts[0]).call();
    let date = new Date(testTime*1000);
    let time = document.getElementById("time");
    time.innerText = date;
  };
  getTestTime();
  // destructure drizzle and drizzleState from props
  
  return (
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
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
        <strong>Patient ID: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="MedPass"
          method="getID"
          methodArgs={[drizzleState.accounts[0]]}
        />
        <br/>
        <strong>Name: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="MedPass"
          method="getName"
          methodArgs={[drizzleState.accounts[0]]}
        />
        <br/>
        <strong>Condition: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="MedPass"
          method="getCondition"
          methodArgs={[drizzleState.accounts[0]]}
        />
        <br/>
        <strong>Time: </strong>
        <span id="time"></span>
        <br/>
        <strong>Test Count: </strong>
        <span id="testCount"></span>
      </div>
      
      <div className="section">
        <h2>Settings:</h2>
        <ContractForm drizzle={drizzle} contract="MedPass" method="setName" labels={['First Name', 'Last Name']} />
        <h2>Set Condition:</h2>
        <ContractForm drizzle={drizzle} contract="MedPass" method="setCondition" labels={['Patient ID', 'Condition']} />
      </div>
    </div>
  );
};