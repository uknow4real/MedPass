import React, { Component } from "react";
const web3 = require("web3");

export default class Sensors extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;
    this.loadData(drizzle, drizzleState);
  }
  async loadData(drizzle, drizzleState) {
    /*for (let i = 0; i < 2; i++) {*/
      let sensor = await drizzle.contracts.MedPass.methods.sensors("807d3ab768c8").call()
      this.setState({
        sensors: [...this.state.sensors, sensor]
      })
    //}
  //web3.utils.toAscii(result)
  }
  constructor(props) {
    super(props)
    this.state = {
      sensors: []
    }
  }
  render() {
    const drizzle = this.props.drizzle
    const { sensors } = this.state;
    async function requestData() {
      let id = 0;
      let temp
      getID(id)
        .then(result => {
          console.log(result)
        })
          

      //await drizzle.contracts.Sensors.methods.requestData(id.toString(), 2).send();
      //let hum = await drizzle.contracts.Sensors.methods.getData().call();
      //await drizzle.contracts.Sensors.methods.requestData(id.toString(), 3).send();
      //let time = await drizzle.contracts.Sensors.methods.getData().call();
      
      //await drizzle.contracts.MedPass.methods.writeData(web3.utils.toAscii(ID), parseInt(web3.utils.toAscii(temp)), parseInt(web3.utils.toAscii(hum)), parseInt(web3.utils.toAscii(time))).send()
      console.log("Requested Data!");
    }
    async function getID(id) {
      await drizzle.contracts.Sensors.methods.requestData(id.toString(), 0).send();
      await drizzle.contracts.Sensors.methods.getData().call()
        .then(result => {
          return result
        });
    }
    async function getTemp(id) {
      await drizzle.contracts.Sensors.methods.requestData(id.toString(), 1).send();
      return await drizzle.contracts.Sensors.methods.getData().call();
    }
    /*for(let i = 0; i < 2; i++) {
      requestData()
      alert("Requested data");
      window.location.reload();
    }*/
    return (
      <div className="App">
        <div className="section">
          <div className="setting-section border">
            <h2>Chainlink</h2>
            {sensors.map((sensor, key) => {
            return (
              <div className="card text-center mb-3" key={key}>
                <div className="card-header">
                  <h6>Sensor ID: {sensor.id} </h6>
                </div>
                <span className="test-field"><b>Time:</b> {sensor.time}</span>
                <span className="test-field"><b>Temperature:</b> {sensor.temp}</span>
                <span className="test-field"><b>Humidity:</b> {sensor.hum}</span>
              </div>
            )
          })}
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
          <span>{} °C</span>
        </div>
      </div>
    );
  }
}
