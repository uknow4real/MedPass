import React, { Component } from "react";

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
        this.setState({ m_amount: m_amount, p_amount: p_amount, az_amount: az_amount})
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
        const drizzleState = this.props.drizzleState
        async function addV_amount() {
            let vaccine = document.getElementById("vaccine").value;
            let amount = document.getElementById("amount_a").value;
            await drizzle.contracts.MedPass.methods.addV_amount(vaccine, amount).send()
            alert("Vaccine amount set!")
        }
        async function subV_amount() {
            let vaccine = document.getElementById("vaccine").value;
            let amount = document.getElementById("amount_s").value;
            await drizzle.contracts.MedPass.methods.subV_amount(vaccine, amount).send()
            alert("Vaccine amount set!")
        }
        if (isAdmin === true) {
            return (
                <div>
                    <h1>Admin</h1>
                    <span>Moderna: {m_amount}</span>
                    <br/>
                    <span>Pfizer: {p_amount}</span>
                    <br/>
                    <span>AstraZeneca: {az_amount}</span>
                    <h3>Add</h3>
                    <input type="number" className="form-control" id="amount_a" placeholder="Amount"></input>
                    <h3>Delete</h3>
                    <input type="number" className="form-control" id="amount_s" placeholder="Amount"></input>
                    <select className="form-control" id="vaccine">
                        <option value="Moderna">Moderna</option>
                        <option value="Pfizer">Pfizer</option>
                        <option value="AstraZeneca">AstraZeneca</option>
                    </select>
                    <div className="btn-container">
                        <button type="button" className="btn btn-success" onClick={addV_amount}>Add vaccine amount</button>
                        <button type="button" className="btn btn-danger" onClick={subV_amount}>Subtract vaccine amount</button>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <h1>No Admin</h1>
                <span>Moderna: {m_amount}</span>
                <br/>
                <span>Pfizer: {p_amount}</span>
                <br/>
                <span>AstraZeneca: {m_amount}</span>
            </div>
        );
    }
}