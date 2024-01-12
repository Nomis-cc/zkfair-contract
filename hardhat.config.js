const { task } = require("hardhat/config");

require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-contract-sizer");

task("deploy", "Deploy contract").setAction(async () => {
  const deploy = require("./tasks/deploy");
  await deploy();
});

task("upgrade", "Upgrade contract").setAction(async () => {
  const upgrade = require("./tasks/upgrade");
  await upgrade();
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "zkfair",
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    zkfair: {
      chainId: 42766,
      url: "https://rpc.zkfair.io",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 2,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      zkfair: process.env.ZKFAIR_API_KEY,
    },
    customChains: [
      {
        network: "zkfair",
        chainId: 42766,
        urls: {
          apiURL: "https://scan.zkfair.io/api",
          browserURL: "https://scan.zkfair.io/",
        },
      },
    ],
  },
  contractSizer: {
    alphaSort: false,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
    only: [],
  },
};
