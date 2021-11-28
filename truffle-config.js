const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { projectId, privateKey, address } = require("./secrets.json");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    kovan: {
      provider: () =>
        new HDWalletProvider(
          privateKey,
          `https://kovan.infura.io/v3/${projectId}`
        ),
      network_id: 42,
      gas: 4000000,
      gasPrice: 10000000000,
    },
    development: {
      // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      // truffle migrate --reset
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777",
    },
  },
  compilers: {
    solc: {
      version: "0.8.7", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};
