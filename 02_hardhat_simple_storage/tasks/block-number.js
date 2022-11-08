const { task } = require("hardhat/config")

task("block-number", "Prints the current block").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`current block number: ${blockNumber}`)
    }
)

// yarn hardhat block-number --network rinkeby
// yarn hardhat block-number
