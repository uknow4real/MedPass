import React, { Component } from "react";
import QRCode from "react-qr-code";

export default class Home extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;
    this.loadData(drizzle, drizzleState);
  }

  async loadData(drizzle, drizzleState) {
    const totalTestCount = await drizzle.contracts.MedPass.methods
      .getTotalTestCount()
      .call();
    const testCount = await drizzle.contracts.MedPass.methods
      .getTestCount(drizzleState.accounts[0])
      .call();
    const time = await drizzle.contracts.MedPass.methods
      .getTestTime(drizzleState.accounts[0])
      .call();
    const id = await drizzle.contracts.MedPass.methods
      .getID(drizzleState.accounts[0])
      .call();
    const name = await drizzle.contracts.MedPass.methods
      .getName(drizzleState.accounts[0])
      .call();
    const bday = await drizzle.contracts.MedPass.methods
      .getBday(drizzleState.accounts[0])
      .call();
    const condition = await drizzle.contracts.MedPass.methods
      .getCondition(drizzleState.accounts[0])
      .call();
    const v_type = await drizzle.contracts.MedPass.methods
      .getVaccine(drizzleState.accounts[0])
      .call();
    const v_required = await drizzle.contracts.MedPass.methods
      .getV_Required(drizzleState.accounts[0])
      .call();
    const registered = await drizzle.contracts.MedPass.methods
      .getRegistered(drizzleState.accounts[0])
      .call();
    let testTime = new Date(time * 1000);
    let birthday = new Date(bday * 1000);

    this.setState({
      totalTestCount: totalTestCount,
      testCount: testCount,
      testTime:
        testTime.toLocaleDateString() + ", " + testTime.toLocaleTimeString(),
      id: id,
      name: name,
      birthday: birthday.toLocaleDateString(),
      condition: condition,
      v_type: v_type,
      v_required: v_required,
      registered: registered,
    });
    for (let i = testCount; i >= 1; i--) {
      let test = await drizzle.contracts.MedPass.methods.personTests(i).call();
      this.setState({
        tests: [...this.state.tests, test],
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      totalTestCount: null,
      testCount: null,
      testTime: null,
      id: null,
      name: null,
      birthday: null,
      condition: null,
      v_type: null,
      v_required: null,
      registered: false,
      tests: [],
    };
  }
  render() {
    const {
      totalTestCount,
      testCount,
      testTime,
      id,
      name,
      birthday,
      tests,
      condition,
      v_type,
      v_required,
      registered,
    } = this.state;

    if (registered === false) {
      return (
        <div className="App">
          <div className="section">
            <div className="setting-section border">
              <h3>Welcome to MedPass!</h3> <br />
              <h6>Please go to the Settings page to setup your account.</h6>
            </div>

            <hr />
            <h6 className="text-center">
              Total tests created by MedPass Blockchain: {totalTestCount}
            </h6>
            <hr />
            <iframe
              title="Covid"
              src="https://ourworldindata.org/explorers/coronavirus-data-explorer?zoomToSelection=true&time=2021-09-01..latest&pickerSort=desc&pickerMetric=total_cases&hideControls=true&Metric=Confirmed+cases&Interval=7-day+rolling+average&Relative+to+Population=false&Align+outbreaks=false&country=~AUT"
              loading="lazy"
              style={{
                width: "100%",
                height: "400px",
                border: "0px none",
              }}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <div className="section">
          <div className="setting-section border">
            <strong>Patient ID: </strong>
            {id}
            <br />
            <strong>Name: </strong>
            {name}
            <br />
            <strong>Birthday: </strong>
            <span>{birthday}</span>
            {v_required === "0" && v_type !== "None"
              ? [
                  <hr key="hr" />,
                  <h6 key="h6" className="text-center">
                    Congratulations! You are now protected.{" "}
                  </h6>,
                ]
              : [
                  <hr key="hr" />,
                  <strong key="strong1">Vaccine Type: </strong>,
                  <span key="span1">{v_type} </span>,
                  <br key="br" />,
                  <strong key="strong2">Vaccine Amount needed: </strong>,
                  <span key="span2">{v_required}</span>,
                ]}
            {testCount === "0"
              ? [
                  <hr key="hr" />,
                  <h6 key="h6" className="text-center">
                    You have yet to do your first test!
                  </h6>,
                ]
              : [
                  <hr key="hr" />,
                  <strong key="strong1">Condition: </strong>,
                  <span key="span1">{condition}</span>,
                  <br key="br1" />,
                  <strong key="strong2">Time: </strong>,
                  <span key="span2">{testTime}</span>,
                  <br key="br2" />,
                  <strong key="strong3">Test Count: </strong>,
                  <span key="span3">{testCount}</span>,
                ]}
          </div>
          {tests.map((test, key) => {
            let testTime = new Date(test.timestamp * 1000);
            let time =
              testTime.toLocaleDateString() +
              ", " +
              testTime.toLocaleTimeString();
            let condition = "Negative";
            if (test.condition === "1") {
              condition = "Positive";
              return (
                <div className="card text-center mb-3" key={key}>
                  <div className="card-header">
                    <h6>Test ID: {test.id} </h6>
                  </div>
                  <div className="text-center" id="qr-code">
                    <QRCode value={test.id} size={100} fgColor="#CC0000" />
                  </div>
                  <span className="test-field">
                    <b>Condition:</b> {condition}
                  </span>
                  <span className="test-field">
                    <b>Test Time:</b> {time}
                  </span>
                  <span className="test-field">
                    <b>Tested by:</b> {test.by_admin}
                  </span>
                </div>
              );
            }
            return (
              <div className="card text-center mb-3" key={key}>
                <div className="card-header">
                  <h6>Test ID: {test.id} </h6>
                </div>
                <div className="text-center" id="qr-code">
                  <QRCode value={test.id} size={100} fgColor="#32CD32" />
                </div>
                <span className="test-field">
                  <b>Condition:</b> {condition}
                </span>
                <span className="test-field">
                  <b>Test Time:</b> {time}
                </span>
                <span className="test-field">
                  <b>Tested by:</b> {test.by_admin}
                </span>
              </div>
            );
          })}
          <hr />
          <h6 className="text-center">
            Total tests created by MedPass Blockchain: {totalTestCount}
          </h6>
          <hr />
          <iframe
            title="Covid"
            src="https://ourworldindata.org/explorers/coronavirus-data-explorer?zoomToSelection=true&time=2021-09-01..latest&pickerSort=desc&pickerMetric=total_cases&hideControls=true&Metric=Confirmed+cases&Interval=7-day+rolling+average&Relative+to+Population=false&Align+outbreaks=false&country=~AUT"
            loading="lazy"
            style={{
              width: "100%",
              height: "400px",
              border: "0px none",
            }}
          />
        </div>
      </div>
    );
  }
}
