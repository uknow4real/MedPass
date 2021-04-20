import Web3 from "web3";
import ComplexStorage from "./contracts/ComplexStorage.json";
import SimpleStorage from "./contracts/SimpleStorage.json";
import MedPass from "./contracts/MedPass.json";

const options = {
  web3: {
    block: false,
    //gicustomProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [SimpleStorage, ComplexStorage, MedPass],
  events: {
    SimpleStorage: ["StorageSet"],
  },
};

export default options;
