import React, { Component } from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData } = newContextComponents;

export default class RegisterPass extends Component {

    render() {
        const drizzle = this.props.drizzle
        const drizzleState = this.props.drizzleState
        async function setAdmin() {
            await drizzle.contracts.MedPass.methods.setAdmin().send()
            alert("You are now an admin!");
        }
        return (
            <div className="content">
                <h2>Active Account</h2>
                <AccountData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    accountIndex={0}
                    units="ether"
                    precision={3}
                />
                <button type="button" class="btn btn-info" onClick={setAdmin}>Admin</button>
            </div>
        );
    }
}