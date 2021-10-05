const Web3 = require("web3");
const MedPass = require("./contracts/MedPass.json");
const Sensors = require("./contracts/Sensors.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const {
  projectId,
  address,
  privateKey,
  medpassAddress,
  sensorsAddress,
} = require("./secrets.json");

const provider = new HDWalletProvider(
  privateKey,
  `https://kovan.infura.io/v3/${projectId}`
);
const web3 = new Web3(provider);

const options = {
  web3: {
    block: false,
    provider: web3,
  },
  contracts: [
    {
      contractName: MedPass.contractName,
      web3Contract: new web3.eth.Contract(MedPass.abi, medpassAddress, {
        from: address,
      }),
    },
    {
      contractName: Sensors.contractName,
      web3Contract: new web3.eth.Contract(Sensors.abi, sensorsAddress, {
        from: address,
      }),
    },
  ],
};

export default options;
