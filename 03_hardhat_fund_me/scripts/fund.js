const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    // 拿 hardhat.config.js 中 namedAccounts.deployer 配置
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log(`Got contract FundMe at ${fundMe.address}`)
    console.log("Funding contract...")
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.1"),
    })
    // https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse
    // transaction.wait( [ confirms = 1 ] ) ⇒ Promise< TransactionReceipt >
    await transactionResponse.wait()
    console.log("Funded")
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })

/* 
yarn hardhat node
yarn hardhat run scripts/fund.js --network localhost
*/
