async function main() {
    const blockNumber = await ethers.provider.getBlockNumber()
    console.log(`current block number: ${blockNumber}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })

/* 
yarn hardhat run scripts/block_number.js --network goerli
*/
