const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
  // https://trufflesuite.com/ganache/
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  const encryptedKeyJson = fs.readFileSync("./.encryptedKey.json", "utf8")
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedKeyJson,
    process.env.PRIVATE_KEY_PASSWORD
  )
  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  wallet = await wallet.connect(provider)

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  )

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("Deploying, pleas wait...")

  const contract = await contractFactory.deploy()
  // Resolves to the TransactionReceipt once the transaction has been included in the chain for confirms blocks. If confirms is 0, and the transaction has not been mined, null is returned.
  const transactionReceipt = await contract.deployTransaction.wait(1) // wait for 1 block confirmation
  // console.log(
  //   "here is deployment transaction (transaction response): ",
  //   contract.deployTransaction
  // )
  // console.log("here is transaction receipt: ", transactionReceipt)

  // console.log("deploy with only transaction data");
  // const nonce = await wallet.getTransactionCount;
  // https://rinkeby.etherscan.io/ 从成功的交易里看 gas 参数
  // const tx = {
  //   nonce, // a number used only once
  //   gasPrice: 2000,
  //   gasLimit: 10,
  //   to: null,
  //   value: 0,
  //   data: "0x", // 0x 拼接 binary 的内容组成的字符串
  //   chainId: 1337,
  // };
  // // const signedTxResponse = await wallet.signTransaction(tx);
  // const sentTxResponse = await wallet.sendTransaction(tx);
  // await sentTxResponse.wait(1);

  const currentFavouriteNumber = await contract.favouriteNumber()
  console.log(`current favourite number ${currentFavouriteNumber.toString()}`)
  const txnResponse = await contract.store("4")
  const txnReceipt = await txnResponse.wait(1)
  const updatedCurrentFavouriteNumber = await contract.favouriteNumber()
  console.log(
    `updated favourite number: ${updatedCurrentFavouriteNumber.toString()}`
  )
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

// PRIVATE_KEY_PASSWORD=password node deploy.js
