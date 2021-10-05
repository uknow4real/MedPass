const MedPass = artifacts.require("MedPass");
const Sensors = artifacts.require("Sensors");

module.exports = function (deployer) {
  deployer.deploy(MedPass);
  deployer.deploy(Sensors);
};
