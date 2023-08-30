

import pk1g from '@maticnetwork/maticjs';
const { use } = pk1g;
import pkg from '@maticnetwork/maticjs-web3';
const { Web3ClientPlugin } = pkg;
import HDWalletProvider  from '@truffle/hdwallet-provider'
// import { POSClient } from "@maticnetwork/maticjs"
import pkg2 from '@maticnetwork/maticjs';
const { POSClient } = pkg2;
// install web3 plugin
use(Web3ClientPlugin)



async function CheckBalance() {

    const privateKey = "daacf807221af27adb38ecabd3fa2d2d38b73922a04287a316307cf9f9975909";
    const parentProvider = new HDWalletProvider(privateKey, 'https://eth-goerli.g.alchemy.com/v2/822oQpZ5OrMUvLi2iGTTHHCuL0yABhe_');
    const maticProvider = new HDWalletProvider(privateKey, 'https://polygon-mumbai.g.alchemy.com/v2/bMQR3QJ0GWX5gZQZpIaY_GnoUCj1pm7M');
    const posClient = new POSClient();
    await posClient.init({
        network: 'testnet',
        version: 'mumbai',
        parent: {
          provider: parentProvider,
          defaultConfig: {
            from : "0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce"
          }
    
        },
        child: {
          provider: maticProvider,
          defaultConfig: {
            from : "0xBEEFD38465e3f4985BA179dD9dbDcEF37FDc8DFc"
          }
        }
    });
    //Parent Provider and goerli token
    console.log("Checking balance...");
    const erc721ParentToken = posClient.erc721("0x2c5271e203b6DCfFF9728CbDcb2F235E236B02ec",true);
    const balanceofG = await erc721ParentToken.getTokensCount("0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce")
    
    console.log('balance on Goerli before transfer ', balanceofG)
    const result = await erc721ParentToken.deposit(4,"0x544e45b5D41Bd64B77CF6662A20e0B1940B59638");
    
    const txHash = await result.getTransactionHash();
    const txReceipt = await result.getReceipt();

    balanceofG = await erc721ParentToken.getTokensCount("0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce")
    console.log('balance on Goerli after transfer ', balanceofG)

    


}

CheckBalance()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
