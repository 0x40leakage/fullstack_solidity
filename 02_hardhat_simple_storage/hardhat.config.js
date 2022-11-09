// require("@nomiclabs/hardhat-waffle")
require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")

require("./tasks/block-number")

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            // https://dashboard.alchemy.com/apps/6mk36imqyc58x9et
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_API_KEY}`,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        local: {
            url: "http://127.0.0.1:8545/", // yarn hardhat node
            chainId: 31337, // no accounts needed
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        // outputFile: "gas-report.txt",
        // noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
}
