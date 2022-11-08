const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.favouriteNumber()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })
    // it.only
    it("should update when we call store", async function () {
        const expectedValue = "4"
        const txResponse = await simpleStorage.store(expectedValue)
        await txResponse.wait(1)

        const currentValue = await simpleStorage.favouriteNumber()
        assert.equal(currentValue.toString(), expectedValue)
    })
    // yarn hardhat test --grep store
})
