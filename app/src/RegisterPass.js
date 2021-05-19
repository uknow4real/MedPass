import React, { Component } from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData } = newContextComponents;

export default class RegisterPass extends Component {
    render() {
        const drizzle = this.props.drizzle
        const drizzleState = this.props.drizzleState
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
            </div>
        );
    }
}