import React, { Component } from "react";
const sensors = require('./totalSensors');
const web3 = require("web3");

export default class Sensors extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;
    this.loadData(drizzle, drizzleState);
  }
  async loadData(drizzle, drizzleState) {
    const sensorCount = await drizzle.contracts.MedPass.methods.getSensorCount().call()
    for (let i = 0; i < sensors.length; i++) {
      let sensor = await drizzle.contracts.MedPass.methods.sensors(web3.utils.toHex(sensors[i])).call()
      this.setState({
        sensors: [...this.state.sensors, sensor]
      })
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      sensors: [],
    };
  }
  render() {
    const drizzle = this.props.drizzle;
    const { sensors } = this.state;
    async function requestData() {
      for(let i = 0; i < 2; i++) {
        await drizzle.contracts.Sensors.methods.requestData(i.toString(), 0).send();
        await drizzle.contracts.Sensors.methods.requestData(i.toString(), 1).send();
        await drizzle.contracts.Sensors.methods.requestData(i.toString(), 2).send();
        await drizzle.contracts.Sensors.methods.requestData(i.toString(), 3).send();

        var id = await drizzle.contracts.Sensors.methods.getData(0).call();
        console.log(id);
        var temp = await drizzle.contracts.Sensors.methods.getData(1).call();
        console.log(temp);     
        var hum = await drizzle.contracts.Sensors.methods.getData(2).call();
        console.log(hum);
        var timestamp = await drizzle.contracts.Sensors.methods.getData(3).call();
        console.log(timestamp);
      
        await drizzle.contracts.MedPass.methods.writeData(id, temp, hum, timestamp).send()
        alert("Requested Sensor "+i+1);
      }
      window.location.reload();
    }
    return (
      <div className="App">
        <div className="section">
          <div className="setting-section border">
            <h2>Chainlink</h2>
            {sensors.map((sensor, key) => {
              return (
                <div className="card text-center mb-3" key={key}>
                  <div className="card-header">
                    <h6>Sensor ID: {web3.utils.toAscii(sensor.id)} </h6>
                  </div>
                  <span className="test-field">
                    <b>Time:</b> {new Date(parseInt(web3.utils.toAscii(sensor.time)) * 1000).toLocaleTimeString()+" "+new Date(parseInt(web3.utils.toAscii(sensor.time)) * 1000).toLocaleDateString()}
                  </span>
                  <span className="test-field">
                    <b>Temperature:</b> {web3.utils.toAscii(sensor.temp)}°C
                  </span>
                  <span className="test-field">
                    <b>Humidity:</b> {web3.utils.toAscii(sensor.hum)}%
                  </span>
                </div>
              );
            })}
            <div className="btn-container">
              <button
                type="button"
                className="btn btn-success"
                onClick={requestData}
              >
                Request Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
