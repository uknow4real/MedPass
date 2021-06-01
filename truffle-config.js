const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { projectId, mnemonic } = require('./secrets.json');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${projectId}`),
      network_id: 3,
      gas: 300000,        // Ropsten has a lower block limit than mainnet
      gasPrice: 10000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets )
    },
    development: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      // truffle migrate --reset
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777"
    }
  },
  compilers: {
    solc: {
      version: "0.8.3",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
