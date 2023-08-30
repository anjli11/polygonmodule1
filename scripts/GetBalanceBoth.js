

const pk1g = require('@maticnetwork/maticjs');
const { use } = pk1g;
const pkg = require('@maticnetwork/maticjs-web3');
const { Web3ClientPlugin } = pkg;
const HDWalletProvider = require('@truffle/hdwallet-provider');
const pkg2 = require('@maticnetwork/maticjs');
const { POSClient } = pkg2;

use(Web3ClientPlugin);



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
    const erc721ParentToken = posClient.erc721("0x579012Ad7649061C66ae9dd291865e06E4F04d81",true);
    const balanceofG = await erc721ParentToken.getTokensCount("0xbeEf967A7a323002Ad2ceBE3369418867A8Ef3Ce")
    // console.log(`Balance of on Polygon Mumbai: }`);
    console.log('balance on Goerli ', balanceofG)
    
    
    // child provider and  mumbai token
    const erc721ChildToken = posClient.erc721("0x1Ccd04027e76A66993C2F1ca8991c4841B0DD557");
    const balanceofM = await erc721ChildToken.getTokensCount("0xBEEFD38465e3f4985BA179dD9dbDcEF37FDc8DFc")
    console.log('balance on Mumbai ', balanceofM)

}

CheckBalance()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
