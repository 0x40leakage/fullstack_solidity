
```bash
yarn add --dev hardhat
yarn add --dev prettier prettier-plugin-solidity
yarn add --dev dotenv
yarn add --dev hardhat-gas-reporter
yarn add --dev solidity-coverage


yarn hardhat
# yarn hardhat --verbose

yarn hardhat compile
yarn hardhat clean

# perform some task
yarn hardhat block-number --network goerli
yarn hardhat block-number

# run tests
GAS_REPORT=true yarn hardhat test
yarn hardhat test --grep store

# yarn hardhat coverage

# execute some script; compiled automatically
yarn hardhat run scripts/deploy.js
yarn hardhat run scripts/deploy.js --network goerli 

# starts a JSON-RPC server on top of Hardhat Network
yarn hardhat node
# opens a hardhat console
yarn hardhat console --network local
```

Attacked DeFi protocols: https://rekt.news/leaderboard/

[TypeScript version of this demo](https://youtu.be/gyMwXuJrbJQ?t=35536)
