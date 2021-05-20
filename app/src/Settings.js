import React, { Component } from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractForm } = newContextComponents;

export default class Settings extends Component {

    render() {
        const drizzle = this.props.drizzle
        const drizzleState = this.props.drizzleState
        async function setAdmin() {
            await drizzle.contracts.MedPass.methods.setAdmin().send()
            alert("You are now an admin!");
        }
        return (
            <div className="section">
                <h2>Settings:</h2>
                <ContractForm drizzle={drizzle} contract="MedPass" method="setName" labels={['First Name', 'Last Name']} />
                <h5>Wallet Address</h5>
                <AccountData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    accountIndex={0}
                    units="ether"
                    precision={3}
                />
                <button type="button" className="btn btn-info" onClick={setAdmin}>Set Admin</button>
                <div className="section">
          
          <h2>Set Condition:</h2>
          <ContractForm drizzle={drizzle} contract="MedPass" method="createTest" labels={['Patient ID', 'Condition']} />
          <form className="form-group">
            <input type="email" className="form-control" placeholder="Patient ID"></input>
            <button type="button" className="btn btn-danger" >Positive</button>
                <button type="button" className="btn btn-success" >Negative</button>
            </form>
            </div>
            </div>
            
        );
    }
}