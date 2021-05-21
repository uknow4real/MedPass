import React, { Component } from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData } = newContextComponents;

export default class Settings extends Component {
    componentDidMount() {
        const drizzle = this.props.drizzle
        const drizzleState = this.props.drizzleState
        this.isAdmin(drizzle, drizzleState)
    }
    async isAdmin(drizzle, drizzleState) {
        const isAdmin = await drizzle.contracts.MedPass.methods.adminmapping(drizzleState.accounts[0]).call()
        this.setState({isAdmin: isAdmin})
    }
    constructor(props) {
        super(props)
        this.state = {
          isAdmin: false,
        }
    }
    render() {
        const drizzle = this.props.drizzle
        const drizzleState = this.props.drizzleState
        async function setPerson() {
            let fName = document.getElementById("fname").value;
            let lName = document.getElementById("lname").value;
            let bday = 1621607249;
            await drizzle.contracts.MedPass.methods.setPerson(fName, lName, bday).send()
            alert("Profile successfully updated!");
        }
        async function setAdmin() {
            await drizzle.contracts.MedPass.methods.setAdmin().send()
            alert("You are now an admin!");
            window.location.reload()
        }
        async function setCondition(bool) {
            let patientID = document.getElementById("patientID_t").value;
            if (bool === true) {
                let condition = "Positive";
                await drizzle.contracts.MedPass.methods.createTest(patientID, condition).send()
                alert("Test successfully created!");
            }
            if (bool === false) {
                let condition = "Negative";
                await drizzle.contracts.MedPass.methods.createTest(patientID, condition).send();
                alert("Test successfully created!");
            }
        }
        async function setVaccine() {
            let patientID = document.getElementById("patientID_v").value;
            let vaccine = document.getElementById("vaccine").value;
            await drizzle.contracts.MedPass.methods.setVaccine(patientID, vaccine).send()
            alert("Vaccination successfully set!");
        }
        if (this.state.isAdmin === true) {
            return (
                <div className="section">
                    <div className="setting-section border">
                        <h2>Settings</h2>
                        <form className="form-group">
                            <input type="text" className="form-control" id="fname" placeholder="First Name"></input>
                            <input type="text" className="form-control" id="lname" placeholder="Last Name"></input>
                            <div className="btn-container">
                                <button type="button" className="btn btn-success" onClick={setPerson}>Submit</button>
                            </div>
                        </form>
                        <h5>Wallet Address</h5>
                        <AccountData
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            accountIndex={0}
                            units="ether"
                            precision={3}
                        />
                        <button type="button" className="btn btn-info" onClick={setAdmin}>Set Admin</button>
                    </div>
                    <div className="setting-section border">
                        <h2>Create test</h2>
                        <form className="form-group">
                            <input type="number" className="form-control" id="patientID_t" placeholder="Patient ID"></input>
                            <div className="btn-container">
                                <button type="button" className="btn btn-danger" onClick={() => setCondition(true)}>Positive</button>
                                <button type="button" className="btn btn-success" onClick={() => setCondition(false)}>Negative</button>
                            </div>
                        </form>
                        <h2>Set vaccination</h2>
                        <form className="form-group">
                            <input type="number" className="form-control" id="patientID_v" placeholder="Patient ID"></input>
                            <input type="text" className="form-control" id="vaccine" placeholder="Vaccine type"></input>
                            <div className="btn-container">
                                <button type="button" className="btn btn-success" onClick={setVaccine}>Set vaccine</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        return (
            <div className="section">
                <div className="setting-section border">
                    <h2>Settings</h2>
                    <form className="form-group">
                        <input type="text" className="form-control" id="fname" placeholder="First Name"></input>
                        <input type="text" className="form-control" id="lname" placeholder="Last Name"></input>
                        <div className="btn-container">
                            <button type="button" className="btn btn-success" onClick={setPerson}>Submit</button>
                        </div>
                    </form>
                    <h5>Wallet Address</h5>
                    <AccountData
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        accountIndex={0}
                        units="ether"
                        precision={3}
                    />
                    <button type="button" className="btn btn-info" onClick={setAdmin}>Set Admin</button>
                </div>
            </div>
        );
    }
}