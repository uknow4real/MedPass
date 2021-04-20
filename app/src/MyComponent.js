import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <div className="App">
      <div>
        <img src={logo} alt="MedPass-logo" class="w-50"/>
        <h1>MedPass</h1>
        <p>
          Welcome to MedPass!
        </p>
        <hr></hr>
      </div>

      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
        <strong>Patient ID: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="MedPass"
          method="getID"
          methodArgs={[drizzleState.accounts[0]]}
        />
        <br/>
        <strong>Name: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="MedPass"
          method="getName"
          methodArgs={[drizzleState.accounts[0]]}
        />
        <br/>
        <strong>Condition: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="MedPass"
          method="getCondition"
          methodArgs={[drizzleState.accounts[0]]}
        />
      </div>

      <div className="section">
        <h2>Settings:</h2>
        <ContractForm drizzle={drizzle} contract="MedPass" method="setName" labels={['First Name', 'Last Name']} />
        <h2>Set Condition:</h2>
        <ContractForm drizzle={drizzle} contract="MedPass" method="setCondition" labels={['Patient Address', 'Condition']} />
      </div>
{/*
      <div className="section">
        <h2>ComplexStorage</h2>
        <p>
          Finally this contract shows data types with additional considerations.
          Note in the code the strings below are converted from bytes to UTF-8
          strings and the device data struct is iterated as a list.
        </p>
        <p>
          <strong>String 1: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ComplexStorage"
            method="string1"
            toUtf8
          />
        </p>
        <p>
          <strong>String 2: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ComplexStorage"
            method="string2"
            toUtf8
          />
        </p>
        <strong>Single Device Data: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="ComplexStorage"
          method="singleDD"
        />
      </div>
       */}
    </div>
  );
};
