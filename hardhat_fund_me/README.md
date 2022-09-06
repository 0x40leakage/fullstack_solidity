
https://docs.soliditylang.org/en/latest/style-guide.html

https://ethereum.org/en/developers/docs/evm/opcodes/

https://github.com/othneildrew/Best-README-Template

```bash
yarn hardhat

yarn add --dev prettier prettier-plugin-solidity

yarn add --dev solhint
yarn solhint --init
yarn solhint contracts/*.sol

yarn add --dev @chainlink/contracts
yarn hardhat compile

yarn add --dev hardhat-deploy
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
yarn hardhat deploy

yarn add --dev aave-v3-core
```

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
