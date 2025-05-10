require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

require("hardhat-resolc");
const { config } = require("dotenv");
config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    ah: {
      url: process.env.ASSET_HUB_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      timeout: 300000,
      gasPrice: 10000000000,
      gasLimit: 30000000,
      networkTimeout: 300000,
      confirmations: 5,
      timeoutBlocks: 500,
    },
  },
  // using remix compiler
  // resolc: {
  //   version: "1.5.2",
  //   compilerSource: "remix",
  //   settings: {
  //     optimizer: {
  //       enabled: false,
  //       runs: 600,
  //     },
  //     evmVersion: "istanbul",
  //   },
  // },

  // using binary compiler
  resolc: {
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
        runs: 400,
      },
      evmVersion: "paris",
      compilerPath: "~/dev/pokadot/resolc/revive/target/release/resolc",
      standardJson: true,
    },
  },
};