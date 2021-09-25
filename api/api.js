const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => console.log("its alive!"));

app.get("/sensor", (req, res) => {
  res.status(200).send({
    msg: "bruh",
  });
});

app.post("/sensor/data", (req, res) => {
  const { key, kkey } = req.body;
  if (!key) {
    res.status(400).send({ msg: "no bro" });
  }

  res.status(200).send({
    msg: key,
    msg2: kkey,
  });
});
