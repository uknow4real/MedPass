import React, { Component } from "react";

export default class Sensors extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;
    this.loadData(drizzle, drizzleState);
  }
  async loadData(drizzle, drizzleState) {
    const result = await drizzle.contracts.Sensors.methods
      .requestVolumeData()
      .call();
    this.setState({
      result: result,
    });
  }
  render() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;
    async function requestVolumeData() {
      var result = await drizzle.contracts.Sensors.methods
        .requestVolumeData()
        .send();
      console.log(result);
      alert(result);
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
                onClick={requestVolumeData}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
