const Web3 = require('web3');
const { contractName, abi } = require('./contracts/MedPass.json');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { projectId, privateKey, contractAddress } = require('./secrets.json');

const provider = new HDWalletProvider(privateKey, `https://kovan.infura.io/v3/${projectId}`);
const web3 = new Web3(provider);

const options = {
  web3: {
    block: false,
    provider: web3
  },
  contracts: [{
    contractName: contractName,
    web3Contract: new web3.eth.Contract(abi, contractAddress)
  }]
};

export default options;
