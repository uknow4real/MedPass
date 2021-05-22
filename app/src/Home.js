import React, { Component } from "react";
import { newContextComponents } from "@drizzle/react-components";
import QRCode from "react-qr-code";

const { ContractData } = newContextComponents;

export default class Home extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle
    const drizzleState = this.props.drizzleState
    this.loadData(drizzle, drizzleState)
  }

  async loadData(drizzle, drizzleState) {
    const totalTestCount = await drizzle.contracts.MedPass.methods.getTotalTestCount().call()
    const testCount = await drizzle.contracts.MedPass.methods.getTestCount(drizzleState.accounts[0]).call()
    const time = await drizzle.contracts.MedPass.methods.getTestTime(drizzleState.accounts[0]).call()
    const bday = await drizzle.contracts.MedPass.methods.getBday(drizzleState.accounts[0]).call()
    let testTime = new Date(time * 1000);
    let birthday = new Date(bday * 1000);

    this.setState({
      totalTestCount: totalTestCount, testCount: testCount, testTime: testTime.toLocaleDateString()
        + ', ' + testTime.toLocaleTimeString(), birthday: birthday.toLocaleDateString()
    })
    for (let i = testCount; i >= 1; i--) {
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
      birthday: null,
      tests: []
    }
  }
  render() {
    const drizzle = this.props.drizzle
    const drizzleState = this.props.drizzleState

    return (
      <div className="App">
        <div>
        </div>
        <div className="section">
          <div className="setting-section border">
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
            <strong>Birthday: </strong><span>{this.state.birthday}</span>
            {/*<ContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="MedPass"
              method="getBday"
              methodArgs={[drizzleState.accounts[0]]}
            />*/}
            <br />
            <strong>Vaccination: </strong>
            <ContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="MedPass"
              method="getVaccine"
              methodArgs={[drizzleState.accounts[0]]}
            />
            <br />
            {this.state.testCount === '0' ? (
              <h4 className="text-center">You have yet to do your first test!</h4>
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
        </div>
        <div className="section">
          {this.state.tests.map((test, key) => {
            let testTime = new Date(test.timestamp * 1000);
            let time = testTime.toLocaleDateString() + ', ' + testTime.toLocaleTimeString();
            let condition = 'Negative';
            if (test.condition === '1') {
              condition = 'Positive';
              return (
                <div className="card text-center mb-3" key={key}>
                  <div className="card-header">
                    <h6>Test ID: {test.id} </h6>
                  </div>
                  <div className="text-center" id="qr-code">
                    <QRCode value={test.id} size="100" fgColor="#CC0000" />
                  </div>
                  <span className="test-field"><b>Condition:</b> {condition}</span>
                  <span className="test-field"><b>Test Time:</b> {time}</span>
                  <span className="test-field"><b>Tested by:</b> {test.by_admin}</span>
                </div>
              )
            }
            return (
              <div className="card text-center mb-3" key={key}>
                <div className="card-header">
                  <h6>Test ID: {test.id} </h6>
                </div>
                <div className="text-center" id="qr-code">
                  <QRCode value={test.id} size="100" fgColor="#32CD32" />
                </div>
                <span className="test-field"><b>Condition:</b> {condition}</span>
                <span className="test-field"><b>Test Time:</b> {time}</span>
                <span className="test-field"><b>Tested by:</b> {test.by_admin}</span>
              </div>
            )

          })
          }
          <hr />
          <h6>Total tests created by MedPass: {this.state.totalTestCount}</h6>
          <hr />

          <iframe title="Covid" src="https://ourworldindata.org/explorers/coronavirus-data-explorer?zoomToSelection=true&time=2021-05-01..latest&pickerSort=desc&pickerMetric=total_cases&hideControls=true&Metric=Confirmed+cases&Interval=7-day+rolling+average&Relative+to+Population=false&Align+outbreaks=false&country=~AUT" loading="lazy" style={{
            'width': '100%', 'height': '400px', 'border': '0px none'
          }}></iframe>
        </div>

      </div>
    );
  }
}