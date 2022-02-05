import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer";
const totalSensors = require("./totalSensors");
const address = require("./secrets.json");
const web3 = require("web3");

export default class Sensors extends Component {
  componentDidMount() {
    const drizzle = this.props.drizzle;
    const drizzleState = this.props.drizzleState;
    this.isAdmin(drizzle, drizzleState);
    this.loadData(drizzle, drizzleState);
  }
  async isAdmin(drizzle, drizzleState) {
    const isAdmin = await drizzle.contracts.MedPass.methods
      .adminmapping(drizzleState.accounts[0])
      .call();
    this.setState({ isAdmin: isAdmin });
  }
  async loadData(drizzle) {
    var id = await drizzle.contracts.Sensors.methods.getData(0).call();
    var temp = await drizzle.contracts.Sensors.methods.getData(1).call();
    var hum = await drizzle.contracts.Sensors.methods.getData(2).call();
    var timestamp = await drizzle.contracts.Sensors.methods.getData(3).call();
    this.setState({
      id: web3.utils.toAscii(id),
      temp: parseInt(web3.utils.hexToUtf8(temp)),
      hum: parseInt(web3.utils.hexToUtf8(hum)),
      time: new Date(
        parseInt(web3.utils.toAscii(timestamp)) * 1000
      ).toLocaleTimeString(),
      date: new Date(
        parseInt(web3.utils.toAscii(timestamp)) * 1000
      ).toLocaleDateString(),
    });

    const measureCount = await drizzle.contracts.MedPass.methods
      .getTotalMeasureCount()
      .call();
    for (let i = measureCount; i >= 1; i--) {
      let measure = await drizzle.contracts.MedPass.methods.history(i).call();
      this.setState({
        history: [...this.state.history, measure],
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: null,
      sensors: [],
      history: [],
      id: "loading...",
      time: "loading...",
      date: "loading...",
      temp: 0,
      hum: 0,
    };
  }
  render() {
    const drizzle = this.props.drizzle;
    const { isAdmin, history, id, time, date, temp, hum } = this.state;
    async function requestData() {
      let sensor = document.getElementById("sensors").value;

      await drizzle.contracts.Sensors.methods.requestData(sensor, 0).send();
      await drizzle.contracts.Sensors.methods.requestData(sensor, 1).send();
      await drizzle.contracts.Sensors.methods.requestData(sensor, 2).send();
      await drizzle.contracts.Sensors.methods.requestData(sensor, 3).send();
      alert("Request data from " + sensor);
    }
    async function refreshData() {
      window.location.reload();
    }
    async function writeData() {
      let sensor = document.getElementById("sensors").value;
      var id = await drizzle.contracts.Sensors.methods.getData(0).call();
      var temp = await drizzle.contracts.Sensors.methods.getData(1).call();
      var hum = await drizzle.contracts.Sensors.methods.getData(2).call();
      var timestamp = await drizzle.contracts.Sensors.methods.getData(3).call();
      console.log("loaded Data");
      await drizzle.contracts.MedPass.methods
        .writeData(id, temp, hum, timestamp)
        .send();
      alert("Requested Sensor " + sensor);
      window.location.reload();
    }
    if (isAdmin === true) {
      return (
        <div className="App">
          <div className="section">
            <div className="setting-section border">
              <h2>Sensors</h2>
              <a
                href={
                  "https://kovan.etherscan.io/address/" + address.sensorsAddress
                }
              >
                <button type="button" className="btn btn-secondary">
                  Visit smart contract address
                </button>
              </a>
              <br></br>
              <br></br>
              Select your Sensor:
              <select className="form-control" id="sensors">
                <option value={totalSensors[0]}>{totalSensors[0]}</option>
                <option value={totalSensors[1]}>{totalSensors[1]}</option>
              </select>
              <br></br>
              <div className="row">
                <div className="col-4 btn-container">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={requestData}
                  >
                    Request Data
                  </button>
                </div>
                <div className="col-4 btn-container">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={refreshData}
                  >
                    Refresh Data
                  </button>
                </div>
                <div className="col-4 btn-container">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={writeData}
                  >
                    Write Data
                  </button>
                </div>
              </div>
              <hr></hr>
              <div className="card text-center mb-3">
                <div className="card-header">
                  <h6>Sensor ID: {id} </h6>
                </div>
                <div className="h6 text-secondary">Time: {time}</div>

                <div className="h6 text-secondary">Date: {date}</div>

                <span className="test-field">
                  <div className="row">
                    <div className="col">
                      <div className="text-muted">
                        Temperature<i className="bi bi-thermometer"></i>
                      </div>
                      <ReactSpeedometer
                        maxValue={50}
                        value={temp}
                        // eslint-disable-next-line
                        currentValueText="${value}°C"
                        valueTextFontSize="25"
                        needleColor="black"
                        needleHeightRatio={0.7}
                      />
                    </div>
                    <div className="col">
                      <div className="text-muted">
                        Humidity <i className="bi bi-water"></i>
                      </div>
                      <ReactSpeedometer
                        maxValue={50}
                        value={hum}
                        // eslint-disable-next-line
                        currentValueText="${value}%"
                        valueTextFontSize="25"
                        needleHeightRatio={0.7}
                        needleColor="black"
                        startColor="cornflowerblue"
                      />
                    </div>
                  </div>
                </span>
              </div>
              <hr></hr>
              <h3>History</h3>
              <table className="table table-bordered" data-toggle="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Humidity</th>
                    <th scope="col">Measure Time</th>
                    <th scope="col">Log Time</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((measure, key) => {
                    return (
                      <tr key={key}>
                        <th scope="row">{web3.utils.toAscii(measure.id)}</th>
                        <td>{web3.utils.toAscii(measure.temp)}°C</td>
                        <td>{web3.utils.toAscii(measure.hum)}%</td>
                        <td>
                          {new Date(
                            parseInt(web3.utils.toAscii(measure.m_time)) * 1000
                          ).toLocaleTimeString()}{" "}
                          {new Date(
                            parseInt(web3.utils.toAscii(measure.m_time)) * 1000
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(measure.l_time * 1000).toLocaleTimeString()}{" "}
                          {new Date(measure.l_time * 1000).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    if (isAdmin === null || isAdmin === false) {
      return <div className="h3 text-center">You are not admin!</div>;
    }
  }
}
