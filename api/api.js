const express = require("express");
const app = express();
const PORT = 5000;
const IP = '192.168.1.6';

app.use(express.json());

app.listen(PORT, IP, () => console.log("its alive!"));

app.get("/sensor", (req, res) => {
  res.status(200).send({
    msg: "this is a get request",
  });
});

app.post("/sensor/data", (req, res) => {
  const { key, temp, hum } = req.body;
  
  if (!key) {
    res.status(404).send({ msg: "device id missing" });
  }

  res.status(200).send({
    key: key,
    temp: temp,
    hum: hum
  });
});
