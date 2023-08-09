require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');

const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

//const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
//const web3 = new Web3(rpcUrl);
//const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// const rpcUrl = "https://polygon-mumbai.g.alchemy.com/v2/s1Zn1G8EdoIxbb4I5-8KmgmNBFqu_7a3";
// const privateKey = "rhythm muscle film warrior rally document feature aerobic cabbage burst crane orphan";

module.exports = {
  networks: {
    polygonTestnet: {
      // provider: () => new Web3.providers.HttpProvider(rpcUrl),
      provider: () => new HDWalletProvider(privateKey, rpcUrl),
      network_id: 80001,
      gasPrice: 10000000000,
      // confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      //from: account.address,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};