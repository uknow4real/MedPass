import MedPass from "./contracts/MedPass.json";
//import Web3 from "web3";

const options = {
  web3: {
    block: false,
    //gicustomProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [MedPass]
};

export default options;
