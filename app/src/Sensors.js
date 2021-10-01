import React, { Component } from "react";
import moderna from "./img/moderna.png";
import pfizer from "./img/pfizer.png";
import astrazeneca from "./img/astrazeneca.png";

export default class Sensors extends Component {
    render() {
        return (
            <div className="App">
                <div className="section">
                    <div className="setting-section border">
                        <h2>Sensors</h2>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <img src={moderna} alt="moderna" style={{ height: '30px' }} />
                                <span className="badge badge-success badge-pill">{}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <img src={pfizer} alt="pfizer" style={{ height: '30px' }} />
                                <span className="badge badge-success badge-pill">{}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <img src={astrazeneca} alt="astrazeneca" style={{ height: '30px' }} />
                                <span className="badge badge-success badge-pill">{}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="setting-section border">
                        <h2>Admin Inventory</h2>
                        <h4>Select Vaccine Type</h4>
                        <select className="form-control" id="vaccine">
                            <option value="Moderna">Moderna</option>
                            <option value="Pfizer">Pfizer</option>
                            <option value="AstraZeneca">AstraZeneca</option>
                        </select>
                        <br />
                        <h4>Add Vaccine</h4>
                        <input type="number" className="form-control" id="amount_a" placeholder="Amount"></input>
                        <div className="btn-container">
                            <button type="button" className="btn btn-success">Add Confirm</button>
                        </div>
                        <h4>Remove Vaccine</h4>
                        <input type="number" className="form-control" id="amount_s" placeholder="Amount"></input>

                        <div className="btn-container">
                            <button type="button" className="btn btn-danger">Remove Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}