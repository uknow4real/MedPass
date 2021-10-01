const express = require("express");
const app = express();
const { ip, port } = require('./address.json');
const IP = ip;
const PORT = port;

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

app.use(express.json());

app.listen(PORT, IP, () => console.log("its alive!"));

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
  }
});
