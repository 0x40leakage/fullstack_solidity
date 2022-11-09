const { ethers, run, network } = require("hardhat")

const GOERLI_CHAIN_ID = 5

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    
    // goerli
    if (network.config.chainId === GOERLI_CHAIN_ID && process.env.ETHERSCAN_API_KEY) {
        console.log(
            `Deployed contract to: https://goerli.etherscan.io/address/${simpleStorage.address}`
        )
        console.log("Waiting for block txs...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentFavouriteNumber = await simpleStorage.favouriteNumber()
    console.log(`current favourite number ${currentFavouriteNumber.toString()}`)
    const txnResponse = await simpleStorage.store("4")
    const txnReceipt = await txnResponse.wait(1)
    const updatedCurrentFavouriteNumber = await simpleStorage.favouriteNumber()
    console.log(
        `updated favourite number: ${updatedCurrentFavouriteNumber.toString()}`
    )
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })

/*
yarn hardhat run scripts/deploy.js --network goerli
yarn hardhat run scripts/deploy.js
*/ 
