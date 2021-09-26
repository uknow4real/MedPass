const MedPass = artifacts.require("MedPass");
const Sensor = artifacts.require("Sensor");

module.exports = function (deployer) {
  deployer.deploy(MedPass);
  deployer.deploy(Sensor);
};
