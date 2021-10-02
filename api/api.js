const express = require("express");
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const app = express();
const { IP, PORT } = require('./address.json');
const { projectId, address, privateKey, contractAddress } = require('../secrets.json');
const { abi } = require('../app/src/contracts/MedPass.json');

const provider = new HDWalletProvider(privateKey, `https://kovan.infura.io/v3/${projectId}`);
const web3 = new Web3(provider);

app.use(express.json());

app.listen(PORT, IP, () => console.log("API running..."));

app.get("/api/sensor", (req, res) => {
  res.status(200).send({
    msg: "this is a get request",
  });
});

app.post("/api/sensor/data", (req, res) => {
  const { key, temp, hum, status } = req.body;

  if (!key) {
    res.status(418).send({ msg: "418 I'm a teapot"});
  }

  if (status == 404) {
    res.status(404).send({ msg: "404 Failed to read sensor" });
  }
  if (status == 400) {
    res.status(400).send({ msg: "400 Invalid sensor readings" });
  }
  if ((key, temp, hum)) {
    res.status(200).send({
      key: key,
      temp: temp,
      hum: hum
    });
  /*try {
    contract(key, temp);
  } catch(error) {
    console.log(error);
  }*/
}

async function contract(key, temp) {
  let contract = new web3.eth.Contract(abi, contractAddress, {
    from: address
  })  
  await contract.methods
    .setPerson(key, temp, 5185002)
    .send({from: address});
  const result = await contract.methods
    .getName(address)
    .call()
  console.log(result);
}
});
