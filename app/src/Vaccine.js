import React, { Component } from "react";
import moderna from "./img/moderna.png";
import pfizer from "./img/pfizer.png";
import astrazeneca from "./img/astrazeneca.png";

export default class Settings extends Component {
    componentDidMount() {
        const drizzle = this.props.drizzle
        const drizzleState = this.props.drizzleState
        this.isAdmin(drizzle, drizzleState)
        this.getV_amount(drizzle, drizzleState)
    }
    async isAdmin(drizzle, drizzleState) {
        const isAdmin = await drizzle.contracts.MedPass.methods.adminmapping(drizzleState.accounts[0]).call()
        this.setState({ isAdmin: isAdmin })
    }
    async getV_amount(drizzle) {
        const m_amount = await drizzle.contracts.MedPass.methods.getV_amount("Moderna").call()
        const p_amount = await drizzle.contracts.MedPass.methods.getV_amount("Pfizer").call()
        const az_amount = await drizzle.contracts.MedPass.methods.getV_amount("AstraZeneca").call()
        this.setState({ m_amount: m_amount, p_amount: p_amount, az_amount: az_amount })
    }
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: false,
            m_amount: null,
            p_amount: null,
            az_amount: null
        }
    }
    render() {
        const { isAdmin, m_amount, p_amount, az_amount } = this.state;
        const drizzle = this.props.drizzle
        async function addV_amount() {
            let vaccine = document.getElementById("vaccine").value;
            let amount = document.getElementById("amount_a").value;
            await drizzle.contracts.MedPass.methods.addV_amount(vaccine, amount).send()
            alert(amount+" vaccine amount added!")
        }
        async function subV_amount() {
            let vaccine = document.getElementById("vaccine").value;
            let amount = document.getElementById("amount_s").value;
            await drizzle.contracts.MedPass.methods.subV_amount(vaccine, amount).send()
            alert(amount+" amount removed!")
        }
        if (isAdmin === true) {
            return (
                <div className="App">
                    <div className="section">
                        <div className="setting-section border">
                            <h2>Vaccine Inventory</h2>
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <img src={moderna} alt="moderna" style={{ height: '30px' }} />
                                    <span class="badge badge-success badge-pill">{m_amount}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <img src={pfizer} alt="pfizer" style={{ height: '30px' }} />
                                    <span class="badge badge-success badge-pill">{p_amount}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <img src={astrazeneca} alt="astrazeneca" style={{ height: '30px' }} />
                                    <span class="badge badge-success badge-pill">{az_amount}</span>
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
                                <button type="button" className="btn btn-success" onClick={addV_amount}>Add Confirm</button>
                            </div>
                            <h4>Remove Vaccine</h4>
                            <input type="number" className="form-control" id="amount_s" placeholder="Amount"></input>

                            <div className="btn-container">
                                <button type="button" className="btn btn-danger" onClick={subV_amount}>Remove Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="App">
                <div className="section">
                    <div className="setting-section border">
                        <h2>Vaccine Inventory</h2>
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <img src={moderna} alt="moderna" style={{ height: '30px' }} />
                                <span class="badge badge-success badge-pill">{m_amount}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <img src={pfizer} alt="pfizer" style={{ height: '30px' }} />
                                <span class="badge badge-success badge-pill">{p_amount}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <img src={astrazeneca} alt="astrazeneca" style={{ height: '30px' }} />
                                <span class="badge badge-success badge-pill">{az_amount}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}