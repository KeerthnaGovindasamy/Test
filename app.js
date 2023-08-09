const Web3 = require('web3');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const HDWalletProvider = require('@truffle/hdwallet-provider');
const contractAbi = require('./src/abis/DataStorage.json').abi;// Replace with the actual ABI file

const mnemonic = 'rhythm muscle film warrior rally document feature aerobic cabbage burst crane orphan'; // Replace with your testnet mnemonic
//const infuraKey = 'your Infura project ID'; // Replace with your Infura project ID
const contractAddress = '0x1B67C7B80e38db8A8F315cCD7bEBEd9577136028'; // Replace with the deployed contract address
let data;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonic,
  },
  providerOrUrl: `https://rpc-mumbai.maticvigil.com/`,
});

const web3 = new Web3(provider);

const contract = new web3.eth.Contract(contractAbi, contractAddress);

const deployingAddress = '0x9D817A273053CC71c28a75570bF35264630De9d7'; // Replace with the address that deployed the contract

async function storeData(data) {
  try {
    const options = {
      from: deployingAddress, // Use the address that deployed the contract
    };

    const tx = await contract.methods.storeData(data).send(options);
    console.log('Transaction Hash:', tx.transactionHash);
  } catch (error) {
    console.error('Error storing data:', error);
  }
}

// Replace 'YourDataToStore' with the actual data you want to store
storeData('SaiRam');



async function retrieveData() {
    try {
      // Replace 'yourEthereumAddress' with the Ethereum address whose data you want to retrieve
      const userAddress = '0x9D817A273053CC71c28a75570bF35264630De9d7';
      
      data = await contract.methods.userToData(userAddress).call();
      console.log('Stored Data:', data);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
  
  // Call the 'retrieveData' function to retrieve and log the stored data
  retrieveData();

  app.post('/show', (req, res) => {
    res.json(data);
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/test`);
  });
  