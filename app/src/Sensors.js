import React, { Component } from "react";

export default class Sensors extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;
    this.loadData(drizzle, drizzleState);
  }
  async loadData(drizzle, drizzleState) {
    const result = await drizzle.contracts.Sensors.methods.getTemp().call()
    this.setState({
      temp: result
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      temp: null
    }
  }
  render() {
    const drizzle = this.props.drizzle
    const { temp } = this.state;
    async function requestData() {
      await drizzle.contracts.Sensors.methods.requestData().send();
      alert("Requested data");
    }
    return (
      <div className="App">
        <div className="section">
          <div className="setting-section border">
            <h2>Chainlink</h2>
            <div className="btn-container">
              <button
                type="button"
                className="btn btn-success"
                onClick={requestData}
              >
                Get Temp
              </button>
            </div>
          </div>
          <span>{temp} °C</span>
        </div>
      </div>
    );
  }
}
