import MedPass from "./contracts/MedPass.json";

const options = {
  web3: {
    block: false,
    //gicustomProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [MedPass]
};

export default options;
