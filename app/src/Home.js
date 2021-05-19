import React, { Component } from "react";
import { newContextComponents } from "@drizzle/react-components";

const { ContractData, ContractForm } = newContextComponents;

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
    let testTime = new Date(time * 1000);

    this.setState({ totalTestCount: totalTestCount, testCount: testCount, testTime: testTime.toLocaleDateString() + ', ' + testTime.toLocaleTimeString() })
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
    async function setAdmin() {
      await drizzle.contracts.MedPass.methods.setAdmin().send()
      alert("You are now an admin!");
    }
    //let Buttons = document.getElementsByClassName("pure-button")
    //Buttons[1].setAttribute("onclick", window.location.reload()) 
    return (
      <div className="App">
        <div>
          <h2>
            Welcome to MedPass!
          </h2>
          <h6>Total tests created by MedPass: {this.state.totalTestCount}</h6>
          <hr></hr>
        </div>
        <div className="section">
          <strong>Patient ID: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="MedPass"
            method="getID"
            methodArgs={[drizzleState.accounts[0]]}
          />
          <br />
          <strong>Name: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="MedPass"
            method="getName"
            methodArgs={[drizzleState.accounts[0]]}
          />
          <br />
          {this.state.testCount === 0 ? (
            <h4 class="text-center">You have yet to do your first test!</h4>
          ) : ([
            <strong>Condition: </strong>,
            <ContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="MedPass"
              method="getCondition"
              methodArgs={[drizzleState.accounts[0]]}
            />,
            <br />,
            <strong>Time: {this.state.testTime} </strong>,
            <br />,
            <strong>Test Count: {this.state.testCount} </strong>
          ])}
        </div>
        <div className="section">
          <h2>Settings:</h2>
          <ContractForm drizzle={drizzle} contract="MedPass" method="setName" labels={['First Name', 'Last Name']} />
          <h2>Set Condition:</h2>
          <ContractForm drizzle={drizzle} contract="MedPass" method="createTest" labels={['Patient ID', 'Condition']} />
          <form class="form-group">
            <input type="email" class="form-control" placeholder="Patient ID"></input>
            <button type="button" class="btn btn-danger" >Positive</button>
            <button type="button" class="btn btn-success" >Negative</button>
          </form>
        </div>
        <div className="testList">
          {this.state.tests.map((test, key) => {
            let condition = 'Negative';
            if (test.condition === '1') {
              condition = 'Positive';
            }
            let testTime = new Date(test.timestamp * 1000);
            let time = testTime.toLocaleDateString() + ', ' + testTime.toLocaleTimeString();
            return (
              <div class="card text-center" key={key}>
                <div class="card-header">
                  <span>Test ID: {test.id} </span>
                </div>
                <span>Test Time: {time}</span>
                <br />
                <span>Condition: {condition}</span>
                <br />
              </div>
            )
          })
          }
        </div>
      </div>
    );
  }
}