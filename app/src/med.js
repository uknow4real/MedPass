/*import $ from 'jquery';

const Web3 = require("web3");

// Initialize Web3
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Set Contract Abi
var contractAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "getID",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "getName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_fname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lname",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "getCondition",
    "outputs": [
      {
        "internalType": "string",
        "name": "condi",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_id",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "_condition",
        "type": "string"
      }
    ],
    "name": "setCondition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; // Add Your Contract ABI here!!!

// Set Contract Address
var contractAddress = '0xE898764C133Dc31690AA14782Bcafa136793cf5e';

// Set the Contract
var contract = web3.eth.contract(contractAbi).at(contractAddress);

// Display Candidate Name
contract.candidateName(function(err, candidateName) {
  $('#candidateName').html(candidateName);
});

// Change the Candidate Name
$('form').on('submit', function(event) {
  event.preventDefault();
  contract.setCandidate($('input').val());
}) */