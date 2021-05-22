import React, { Component } from "react";

export default class Settings extends Component {
    componentDidMount() {
        const drizzle = this.props.drizzle
        const drizzleState = this.props.drizzleState
        this.isAdmin(drizzle, drizzleState)
    }
    async isAdmin(drizzle, drizzleState) {
        const isAdmin = await drizzle.contracts.MedPass.methods.adminmapping(drizzleState.accounts[0]).call()
        this.setState({ isAdmin: isAdmin })
    }
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: false,
        }
    }
    render() {
        const { isAdmin } = this.state;
        const drizzle = this.props.drizzle
        const drizzleState = this.props.drizzleState
        if (isAdmin === true) {
            return (
                <h1>Admin</h1>
            )
        }
        return (
            <h1>No Admin</h1>
        );
    }
}