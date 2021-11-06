const Web3 = require("web3");
const MedPassArtifact = require("./contracts/MedPass.json");
const SensorsArtifact = require("./contracts/Sensors.json");
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
let MedPass = new web3.eth.Contract(MedPassArtifact.abi, medpassAddress, {from: address});
let Sensors = new web3.eth.Contract(SensorsArtifact.abi, sensorsAddress, {from: address});

const options = {
  web3: {
    block: false,
    provider: web3,
  },
  contracts: [
    {
      contractName: MedPassArtifact.contractName,
      web3Contract: MedPass
    },
    {
      contractName: SensorsArtifact.contractName,
      web3Contract: Sensors
    },
  ],
};

export default options;
