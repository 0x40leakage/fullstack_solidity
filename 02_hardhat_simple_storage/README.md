
```bash
yarn add --dev hardhat
# yarn == npx

yarn hardhat
# yarn hardhat --verbose

yarn hardhat compile

yarn add --dev prettier prettier-plugin-solidity

yarn hardhat run scripts/deploy.js --network rinkeby

yarn add --dev dotenv

yarn hardhat run scripts/deploy.js --network rinkeby 

yarn hardhat console --network local

yarn hardhat clean

yarn add --dev hardhat-gas-reporter

yarn add --dev solidity-coverage
yarn hardhat coverage
```

https://rekt.news/leaderboard/

ts version: https://youtu.be/gyMwXuJrbJQ?t=35536

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
