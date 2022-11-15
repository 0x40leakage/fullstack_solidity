const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const { ARTIFACT_FORMAT_VERSION } = require("hardhat/internal/constants")
const { developmentChains } = require("../../helper-hardhat-config")

// only runs on testnet
developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe, deployer
          const sendValue = ethers.utils.parseEther("0.05") // 1 ETH

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer // !!!
              fundMe = await ethers.getContract("FundMe")
          })

          it("allows people to fund and withdraw", async function () {
              const txFund = await fundMe.fund({ value: sendValue })
              console.log("txFund", txFund.nonce, txFund.hash)
              const txWithdraw = await fundMe.withdraw()
              console.log("txWithdraw", txWithdraw.nonce, txWithdraw.hash)
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })

/*
yarn hardhat deploy --tags fundMe --network goerli
yarn hardhat test --network goerli
*/
