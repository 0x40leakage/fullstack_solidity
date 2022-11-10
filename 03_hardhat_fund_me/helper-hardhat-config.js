const networkConfig = {
    31337: {
        name: "localhost",
    },
    // Price Feed Address: https://docs.chain.link/docs/data-feeds/price-feeds/addresses/#Goerli%20Testnet
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}
