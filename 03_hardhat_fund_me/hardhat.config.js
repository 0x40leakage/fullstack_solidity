require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

require("hardhat-deploy")

const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [{ version: "0.8.7" }, { version: "0.6.6" }],
    },
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        goerli: {
            // https://dashboard.alchemy.com/apps/6mk36imqyc58x9et
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_API_KEY}`,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
    },
    defaultNetwork: "hardhat",
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
