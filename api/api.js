const express = require("express");
const app = express();
const IP = "192.168.1.6";
const PORT = 5000;

app.use(express.json());

app.listen(PORT, IP, () => console.log("its alive!"));

app.get("/sensor", (req, res) => {
  res.status(200).send({
    msg: "this is a get request",
  });
});

app.post("/sensor/data", (req, res) => {
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
      hum: hum,
    });
  }
});
