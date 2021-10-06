import React, { Component } from "react";

export default class Sensors extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;
    this.loadData(drizzle, drizzleState);
  }
  async loadData(drizzle, drizzleState) {
    const result = await drizzle.contracts.Sensors.methods.getVolume().call()
    this.setState({
      volume: result
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      volume: null
    }
  }
  render() {
    const drizzle = this.props.drizzle
    const { volume } = this.state;
    async function requestVolumeData() {
      await drizzle.contracts.Sensors.methods.requestVolumeData().send();
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
                onClick={requestVolumeData}
              >
                Submit
              </button>
            </div>
          </div>
          <span>{volume} €</span>
        </div>
      </div>
    );
  }
}
