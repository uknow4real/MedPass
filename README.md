# MedPass
![MedPass](/app/src/img/logo.png)
**MedPass** is a *decentralized blockchain application* implementing smart contracts. The goal is to simulate how a E-Healthcare Application *(green pass)* could look like on a blockchain environment.

For building this application, we used: 
- **React** for frontend
- **web3.js** for smart contract interaction
- **Node.js** as javascript runtime enviremont
- **Truffle** for blockchain & smart contract development
- **Ganache** for local blockchain deployment
- **Solidity** (v0.8.3) for smart contract.

### Contribution
[Sebastian Chmel](https://github.com/uknow4real) & [Leo Bowen Wang](https://github.com/leobowenwang)

This is the 4th semester Project by Students from the [University of Applied Sciences Campus Vienna](https://www.fh-campuswien.ac.at/en/studies/study-courses/detail/computer-science-and-digital-communications-full-time.html).

## MoSCoW Feature Requirements
**MUST**
- The system must identify each person with a unique key, generated from the WalletID.
- The system must be able to display a person's test result.
- The system must be able to generate a test result with Admin via smart contracts.
- The system must be able to generate a test result with UniqueID (WalletID+Block.Timestamp) via smart contracts.

**SHOULD**
- The system should be able to store vaccination type, vaccination dose amount.
- The system should be able to store the age of a person.

**COULD**
- The system could be able to generate a person-related QR code for tests.
- The system could store the vaccination dose inventory on the blockchain.
- The system could add and remove the vaccination dose inventory via smart contracts.

**WON'T**
- The DApp will not be published in Mainnet.
- The DApp will not be maintained.
- The DApp will not be updated.
- The DApp will not be scaled.

-----

## Screenshots
- Homepage
<img src="https://i.imgur.com/TNzaQUH.png" width="400">
- Vaccine Page
<img src="https://i.imgur.com/SSsv1UW.png" width="400">
- Settings Page
<img src="https://i.imgur.com/IuZPXc9.png" width="400">

## Installation & Setup
### Dependencies
In order to launch the commands below, make sure you have already installed [node.js](https://nodejs.org/en/download/) on your machine.
```
npm install -g truffle
cd app
npm install react-scripts react-bootstrap bootstrap --save
npm install @drizzle/store @drizzle/react-plugin @drizzle/
npm install react-router-dom react-qr-code react-datepicker
```
*optional (for deployment):*
```
cd app
npm install @truffle/hdwallet-provider
```
### Launch & Usage
To launch the application, you need to compile the smart contract by using `truffle migrate` beforehand.
```
truffle compile
truffle migrate
```
To launch the react application we need to do ` npm run start`.
```
cd app
npm run start
```
### Metamask
For detailed documentation for Metamask Account setup in Truffle local blockchain, please visit:  
https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask

## License
[MIT](https://choosealicense.com/licenses/mit/)
